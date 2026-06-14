// src/services/auth.ts

interface UserData {
  id: string;
  name: string;
  email: string;
  hobby: string;
  gender: string;
  bio: string;
  avatarUrl: string;
  updatedAt: string;
  createdAt: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  noPassword: UserData;
  token: string;
}

export const autoLoginService = async () => {
  const oldToken = localStorage.getItem("token");
  const api=import.meta.env.VITE_API_URL_PRODUCTION;
  if (!oldToken) return null;

  try {
    const response = await fetch(`${api}/auto_login`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${oldToken}`,
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(response.statusText);
      
    }
      const data: AuthResponse = await response.json();
      // Token သစ်ကို ထပ်မံသိမ်းဆည်းခြင်း
      localStorage.setItem("token", data.token);
      return data; // User data ရော Token ပါဝင်တဲ့ Object ကို ပြန်ပေးမယ်
    //  else {
    //   // Token သက်တမ်းကုန်ရင် ပယ်ဖျက်မယ်
    //   localStorage.removeItem("token");
    //   return null;
    // }
  } catch (error: any) {
    console.error("Network Error:", error.message);
    return null;
  }
};