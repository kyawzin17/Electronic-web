import { createContext, useContext } from "react";

const Context= createContext();

export function useAppContext() {
    return useContext(Context);
};

export default Context;