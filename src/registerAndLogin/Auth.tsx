import { Outlet } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { useState, useEffect } from "react";
import { autoLoginService } from "./services/auth";
import Profile from "./UserProfile";


export default function Auth() {
    const { setUser, user, setLogin } = useAppContext();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await autoLoginService();
      
      if (authData) {
        // Backend က User ရှိတယ်လို့ ပြောရင် State ထဲ ထည့်မယ်
        console.log("This user:", authData.user);
        setUser(authData.user as any);
        setLogin(true);
      } else {
        // Token မရှိရင် သို့မဟုတ် သက်တမ်းကုန်ရင် Login Page သို့ လွှတ်နိုင်သည်
        // ဥပမာ - window.location.href = "/login";
        setLogin(false);
      }
      
      setLoading(false); // စစ်ဆေးတာ ပြီးသွားပြီမို့ loading ပိတ်မယ်
    };

    checkUserAuth();
  }, []);

  // Backend က Token စစ်နေတုန်း ခဏပြမယ့် UI
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
    return (
        <div className="w-full h-auto bg-bg flex items-center justify-center">
            {user ? (
        <Profile user={user} />
      ) : (
        <div>
           <Outlet />
        </div>
      )}

        </div>
    )
}