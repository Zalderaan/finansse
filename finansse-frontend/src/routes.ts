import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { Test } from "@/pages/Test";

export const router = createBrowserRouter([
    { path: "/", Component: LandingPage },
    { path: "/test", Component: Test}
]);