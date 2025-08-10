import { axiosInstance } from "./axios";
import { authApiService } from "@/features/auth/api/authApi";
import { useAuthStore } from "@/features/auth/stores/auth.store";

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token!);
        }
    });

    failedQueue = []
};

export function setupInterceptors() {
    // interceptor to add token
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = useAuthStore.getState().getToken();
            console.log('token in req interceptor: ', token);
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor for 401 invalid token
    axiosInstance.interceptors.response.use(
        // if no errors, keep as-is
        (response) => response,

        // if encountered an error, intercept it asynchronously
        async (error) => {
            const originalRequest = error.config;
            console.error('error in response interceptor:; ', error)
            // error should be 401 and not yet retried, else just reject as usual
            if (error.response?.status == 401 && !originalRequest._retry) {
                console.log('first if called in interceptor!')
                if (isRefreshing) { // for other untried requests, they will be pushed onto the queue and accessed later with processQueue after the first triggering req
                    console.log('isRefreshing triggered in response intercecptor!')
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                // only the initial req will call this
                try {
                    // call refresh endpoint
                    console.log('refresh token endpoint called!')
                    const response = await authApiService.refreshToken();
                    const { accessToken } = response;

                    // update the access token in the auth store
                    useAuthStore.getState().setAuth(accessToken);

                    // call the other queued reqs
                    processQueue(null, accessToken);

                    // this is only for the first failed original request
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);

                } catch (refreshError) {
                    processQueue(refreshError, null);
                    // Clear auth state and redirect to login
                    useAuthStore.getState().logout();
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            return Promise.reject(error);
        }
    );
}