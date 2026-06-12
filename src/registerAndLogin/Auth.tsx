import { Outlet } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { useEffect } from "react";
import { autoLoginService } from "./services/auth";


export default function Auth() {
    const { setUser, setLogin } = useAppContext();

    useEffect(() => {
            const checkUserAuth = async () => {
              const authData = await autoLoginService();
              
              if (authData) {
                // Backend က User ရှိတယ်လို့ ပြောရင် State ထဲ ထည့်မယ်
                console.log("This user:", authData.noPassword);
                setUser(authData.noPassword as any);
                setLogin(true);
              } else {
                // Token မရှိရင် သို့မဟုတ် သက်တမ်းကုန်ရင် Login Page သို့ လွှတ်နိုင်သည်
                // ဥပမာ - window.location.href = "/login";
                setLogin(false);
              }
            };
        
            checkUserAuth();
          }, []);
    return (
        <div className="w-full h-auto bg-bg flex items-center justify-center">
           <Outlet />
        </div>
    )
}