import React, { createContext, useContext, useState } from "react";


interface AppContext {
    login: boolean;
    setLogin: (login: boolean) => void;
    globalMessage: string;
    setGlobalMessage: (message: string) => void;
    menu: boolean;
    setMenu: (menu: boolean) => void;
    rightMenu: boolean;
    setRightMenu: (rightMenu: boolean) => void;
    error: boolean;
    setError: (error: boolean) => void;
    headerHeight: number;
    setHeaderHeight: (headerHeight: number) => void;
}


const Context= createContext<AppContext | undefined>(undefined);


export function useAppContext() {
    const context= useContext(Context);

    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}

export function AppProvider({ children } : { children: React.ReactNode}) {
    const [login, setLogin]= useState<boolean>(false);
    const [ globalMessage, setGlobalMessage ]= useState<string>(""); //Success or warn or error 
    const [menu, setMenu]= useState<boolean>(false);                  //Menu open or close
    const [rightMenu, setRightMenu]= useState<boolean>(false);        //Right sidebar menu open or close 
    const [error, setError]= useState<boolean>(false);                //All error
    const [headerHeight, setHeaderHeight]= useState<number>(0);      //Header height for main container

    return (
        <Context.Provider value={{ login, setLogin, globalMessage, setGlobalMessage, menu, setMenu, rightMenu, setRightMenu, error, setError, headerHeight, setHeaderHeight }}>
            {children}
        </Context.Provider>
    )
}

export default Context;