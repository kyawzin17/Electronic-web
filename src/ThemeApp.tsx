
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Docs from "./pages/Docs.tsx";
import About from "./pages/About.jsx";
import Project from "./pages/Project.tsx";
import ProjectDetail from "./pages/ProjectDetail";
import ContactUs from "./support/ContactUs";
import Faq from "./support/Faq";
import ShippingReturn from "./support/ShippingReturn.tsx";
import Privacy from "./support/Privacy";
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
                    path: "/doc",
                    element: <Docs />,
                },
                {
                    path: '/doc/components',
                    element: <Docs />,
                },
                {
                    path: "/doc/:category/:fileName?",
                    element: <Docs />,
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
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />
        },
        { 
            path: "/contact",
            element: <ContactUs />
        },
        {
            path: "/faq",
            element: <Faq />
        },
        {
            path: "/shipping",
            element: <ShippingReturn />
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