import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import Context from "./hooks/useAppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Docs from "./pages/Docs";
import About from "./pages/About";
import Project from "./pages/Project";

export default function ThemeApp() {

    const [ globalMessage, setGlobalMessage ]= useState(""); //Success or warn or error 
    const [menu, setMenu]= useState(false);                  //Menu open or close
    const [active, setActive]= useState("home");             //Navbar active
    const [login, setLogin]= useState(false);                //Login page
    const [error, setError]= useState(false);                //All error
    const [headerHeight, setHeaderHeight]= useState(0);      //Header height for main container


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
                    path: "/doc/:category/:fileName?",
                    element: <Docs />,
                },
                {
                    path: "/project",
                    element: <Project />,
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
        }
    ])
    return (
            <Context.Provider value={{globalMessage, setGlobalMessage, menu, setMenu, active, setActive, login, setLogin, error, setError, headerHeight, setHeaderHeight}}>
                <RouterProvider router={router} />
            </Context.Provider>
    )
}