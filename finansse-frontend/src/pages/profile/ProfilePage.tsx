import { Button } from "@/components/ui/button";
import { authApiService } from "@/features/auth/api/authApi";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useLogout } from '@/features/auth/hooks/useLogout'

export function ProfilePage() {
    // TODO: call /me endpoint
    const { user } = useCurrentUser();
    const { logout } = useLogout();
    const testRefreshDirectly = async () => {
        try {
            console.log('🧪 Testing refresh endpoint directly...');
            const result = await authApiService.refreshToken();
            console.log('✅ Direct refresh succeeded:', result);
        } catch (error) {
            console.error('❌ Direct refresh failed:', error);
            if (typeof error === "object" && error !== null && "response" in error) {
                // @ts-expect-error: error.response is likely from axios or similar
                console.error('Response:', error.response?.data);
                // @ts-expect-error: error.response is likely from axios or similar
                console.error('Status:', error.response?.status);
            }
        }
    };


    return (
        <>
            <p>username: {user?.username}</p>
            <p>createdAt: {user?.createdAt}</p>
            {/* <Button onClick={testRefreshDirectly}>Test Refresh Directly</Button> */}
        </>
    );
}