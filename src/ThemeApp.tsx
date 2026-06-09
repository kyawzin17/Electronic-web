
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import EditProfile from "./pages/EditProfile.tsx";
import OtpFill from "./registerAndLogin/OtpFill.tsx";
import PasswordFill from "./registerAndLogin/PasswordFill.tsx";

import { AppProvider } from "./hooks/useAppContext.tsx";


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
                }
            ]
        },
        {
            path: "/auth",
            element: <Auth />,
            children: [
                {
                    path: "/auth",
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
                }
            ]
        },
        {
            path: "/edit-profile",
            element: <EditProfile />
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