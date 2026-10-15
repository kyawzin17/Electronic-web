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
const Circuit = lazy( () => import("./circuits/Circuit.tsx"));
const CircuitProjects = lazy( () => import("./circuits/ProjectsPage.tsx"));
export default function ThemeApp() {

    const router= createBrowserRouter([
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
                    element: <Circuit />
                },
                {
                    path: '/docs/doc/components',
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
                {
                    path: "/circuit",
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Circuit />
                        </Suspense>
                    ),
                },
                {
                    path: "/circuit/project",
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <CircuitProjects />
                        </Suspense>
                    ),
                }
            ]
        },
        {
            path: "/auth",
            element: <Auth />,
            children: [
                {
                    path: "/auth/profile",
                    element: <UserProfile />
                },
                {
                    path: "/auth/login",
                    element: <Login />,
                },
                {
                    path: "/auth/register",
                    element: <Register />
                },
                {
                    path: "/auth/otp-fill",
                    element: <OtpFill />
                },
                {
                    path: "/auth/password-fill",
                    element: <PasswordFill />
                },
                {
                    path: "/auth/editprofile",
                    element: <EditProfile />
                }
            ]
        },
        { 
            path: "/contact",
            element: <ContactUs />
        },
        {
            path: "/request",
            element: <Request />
        },
        {
            path: "/report",
            element: <Report />
        },
        {
            path: "/privacy",
            element: <Privacy />
        }
    ])
    return (
            <AppProvider>
                 <RouterProvider router={router} />
            </AppProvider>
    )
}