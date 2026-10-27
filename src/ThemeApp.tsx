import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Login from "./registerAndLogin/Login.tsx";
import Register from "./registerAndLogin/Register.tsx";
import DocLayar from "./pages/DocLayar.tsx";
import Docs from "./pages/Doc.tsx";
import About from "./pages/About.jsx";
import Project from "./pages/Project.tsx";
import ProjectDetail from "./pages/ProjectDetail";
import ContactUs from "./support/ContactUs.tsx";
import Request from "./support/Request.tsx";
import Report from "./support/Report.tsx";
import Privacy from "./support/Privacy";
import Learn from "./pages/Learn.tsx";
import Auth from "./registerAndLogin/Auth.tsx";
import EditProfile from "./registerAndLogin/EditProfile.tsx";
import OtpFill from "./registerAndLogin/OtpFill.tsx";
import PasswordFill from "./registerAndLogin/PasswordFill.tsx";
import UserProfile from "./registerAndLogin/UserProfile.tsx";

import { AppProvider } from "./hooks/useAppContext.tsx";

const Circuit = lazy(() => import("./circuits/Circuit.tsx"));
const CircuitProjects = lazy(() => import("./circuits/ProjectsPage.tsx"));

function RouteLoading({ label }: { label: string }) {
    return (
        <div
            className="flex min-h-[50vh] w-full items-center justify-center"
            role="status"
            aria-live="polite"
        >
            <div className="flex flex-col items-center gap-3 text-center">
                <span
                    className="h-9 w-9 animate-spin rounded-full border-4 border-current border-r-transparent"
                    aria-hidden="true"
                />
                <span className="text-sm text-current/70">{label}</span>
            </div>
        </div>
    );
}

export default function ThemeApp() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/about",
                    element: <About />,
                },
                {
                    path: "/docs",
                    element: <DocLayar />,
                },
                {
                    path: "/circuit",
                    element: (
                        <Suspense fallback={<RouteLoading label="Loading Circuit Simulator..." />}>
                            <Circuit />
                        </Suspense>
                    ),
                },
                {
                    path: "/circuit/project",
                    element: (
                        <Suspense fallback={<RouteLoading label="Loading Circuit Projects..." />}>
                            <CircuitProjects />
                        </Suspense>
                    ),
                },
                {
                    path: "/docs/doc/components",
                    element: <Docs />,
                },
                {
                    path: "/docs/doc/:category/:fileName?",
                    element: <Docs />,
                },
                {
                    path: "/docs/learning",
                    element: <Learn />,
                },
                {
                    path: "/docs/learning/:category/:fileName?",
                    element: <Learn />,
                },
                {
                    path: "/project",
                    element: <Project />,
                },
                {
                    path: "/project/:id",
                    element: <ProjectDetail />,
                },
            ],
        },
        {
            path: "/auth",
            element: <Auth />,
            children: [
                {
                    path: "/auth/profile",
                    element: <UserProfile />,
                },
                {
                    path: "/auth/login",
                    element: <Login />,
                },
                {
                    path: "/auth/register",
                    element: <Register />,
                },
                {
                    path: "/auth/otp-fill",
                    element: <OtpFill />,
                },
                {
                    path: "/auth/password-fill",
                    element: <PasswordFill />,
                },
                {
                    path: "/auth/editprofile",
                    element: <EditProfile />,
                },
            ],
        },
        {
            path: "/contact",
            element: <ContactUs />,
        },
        {
            path: "/request",
            element: <Request />,
        },
        {
            path: "/report",
            element: <Report />,
        },
        {
            path: "/privacy",
            element: <Privacy />,
        },
    ]);

    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    );
}
