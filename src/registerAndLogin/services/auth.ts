// src/services/auth.ts

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  user: UserData;
  token: string;
}

export const autoLoginService = async () => {
  const oldToken = localStorage.getItem("token");
  console.log(oldToken);
  if (!oldToken) return null;

  try {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3335";
    const response = await fetch(`${apiUrl}/api/auto_login`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${oldToken}`,
      },
    });

    if (response.ok) {
      const data: AuthResponse = await response.json();
      // Token သစ်ကို ထပ်မံသိမ်းဆည်းခြင်း
      console.log(data);

      localStorage.setItem("token", data.token);
      return data; // User data ရော Token ပါဝင်တဲ့ Object ကို ပြန်ပေးမယ်
    }
    //  else {
    //   // Token သက်တမ်းကုန်ရင် ပယ်ဖျက်မယ်
    //   localStorage.removeItem("token");
    //   return null;
    // }
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  }
};