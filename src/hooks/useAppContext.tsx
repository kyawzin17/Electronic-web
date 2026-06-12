import React, { createContext, useContext, useState } from "react";

// ၁။ ပထမဦးဆုံး Object ထဲမှာပါမယ့် Data Type ကို သတ်မှတ်ပါမယ်
interface UserType {
    id: number;
  name: string;
  email: string;
  bio: string;
  hobby: string;
  gender: string;
  avatarUrl: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}


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
    language: string;
    setLanguage: (language: 'EN' | 'MM') => void;
    docComponents: string;
    setDocComponents: (docComponents: string) => void;
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>; // state ပြင်မယ့် function type
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

    const docLocalStorage= localStorage.getItem("docComponents") || "doc";
    const [login, setLogin]= useState<boolean>(false);
    const [ globalMessage, setGlobalMessage ]= useState<string>(""); //Success or warn or error 
    const [menu, setMenu]= useState<boolean>(false);                  //Menu open or close
    const [rightMenu, setRightMenu]= useState<boolean>(false);        //Right sidebar menu open or close 
    const [error, setError]= useState<boolean>(false);                //All error
    const [headerHeight, setHeaderHeight]= useState<number>(0);      //Header height for main container
    const [language, setLanguage]= useState<'EN' | 'MM'>('EN');
    const [docComponents, setDocComponents] = useState<string>(docLocalStorage);
    const [user, setUser]= useState<UserType | null>(null);


    return (
        <Context.Provider value={{ login, setLogin, globalMessage, setGlobalMessage, menu, setMenu, rightMenu, setRightMenu, error, setError, headerHeight, setHeaderHeight, language, setLanguage, docComponents, setDocComponents, user, setUser }}>
            {children}
        </Context.Provider>
    )
}

export default Context;