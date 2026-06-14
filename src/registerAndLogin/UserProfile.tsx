import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../hooks/useAppContext";
import { FaPencilAlt } from "react-icons/fa";
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';


const Profile = () => {
  const { user } = useAppContext();
   const api=import.meta.env.VITE_API_URL_PRODUCTION;
  const navigate= useNavigate();

  const [isUploading, setIsUploading] = useState(false);
  const [update, setUpdate] = useState(false);
  const { setUser, setLogin }= useAppContext()
 const [isLogout, setIsLogout] = useState(false);
  // 🛠️ Manual Crop & Zoom အတွက် လိုအပ်သော States များ
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editCanvasRef = useRef<HTMLCanvasElement>(null);

  // ၁။ ပုံရွေးလိုက်သည့်အခါ Image Object ဆောက်ပြီး မိုဒယ်ဖွင့်မည့် Handler
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageObj(img);
        setUpdate(true);
        setZoom(1); // Zoom ကို မူလအတိုင်း reset လုပ်မယ်
        setOffset({ x: 0, y: 0 }); // နေရာကို အလယ်ဗဟို reset လုပ်မယ်
      };
    }
  };

  // ၂။ Zoom သို့မဟုတ် ပုံရွှေ့လိုက်တိုင်း Canvas ပေါ်မှာ Real-time ဆွဲပေးမည့် အပိုင်း
  useEffect(() => {
    if (!imageObj || !editCanvasRef.current) return;
    const canvas = editCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas အကြည်လုပ်မယ်
    ctx.clearRect(0, 0, 400, 400);

    ctx.save();
    // Canvas ရဲ့ အလယ်ဗဟို (200, 200) သို့ တည်နေရာရွှေ့မယ်
    ctx.translate(200 + offset.x, 200 + offset.y);
    ctx.scale(zoom, zoom);

    // ပုံရဲ့ Aspect Ratio အလိုက် အံဝင်ခွင်ကျဖြစ်အောင် တွက်ချက်ခြင်း
    const imgRatio = imageObj.width / imageObj.height;
    let drawW = 400;
    let drawH = 400;

    if (imgRatio > 1) {
      drawW = 400 * imgRatio;
    } else {
      drawH = 400 / imgRatio;
    }

    // ဗဟိုချက်တည့်တည့်မှာ ပုံဆွဲမယ်
    ctx.drawImage(imageObj, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  }, [imageObj, zoom, offset]);

  // ၃။ Mouse ဖြင့် ဖိဆွဲပြီး ပုံရွှေ့ခြင်း (Drag and Pan Logic)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // ၄။ Save နှိပ်လျှင် Canvas ရှိ လက်ရှိအနေအထားအတိုင်း ဖြတ်ယူပြီး Backend ပို့မည့်စနစ်
  // ၄။ Save နှိပ်လျှင် Canvas ရှိ လက်ရှိအနေအထားအတိုင်း .webp ပြောင်းပြီး Backend ပို့မည့်စနစ်
  const handleUpload = async () => {
    if (!editCanvasRef.current) return;

    setIsUploading(true);

    // 💡 HTML5 Canvas ရဲ့ toBlob မှာ "image/webp" လို့ ပြောင်းလဲသတ်မှတ်လိုက်တာပါ
    editCanvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        // ၁။ ၃ စက္ကန့်ကြာမယ့် Success Toast ကို ပြမယ်
        toast.error('ပုံဖော်ရတာ အဆင်မပြေပါဘူး', {
          duration: 4000, 
          style: {
            fontFamily: 'sans-serif',
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        });

        setIsUploading(false);
        return;
      }

      // ဖိုင်အသစ်ဆောက်တဲ့အခါ Extension ကို .webp နဲ့ Type ကို image/webp လို့ သတ်မှတ်ပါမယ်
      const processedFile = new File([blob], "avatar.webp", { type: "image/webp" });
      
      const formData = new FormData();
      formData.append("image", processedFile); // Backend ဆီကို .webp ဖိုင်ပဲ အသစ်ပို့တော့မှာပါ

      try {
        const response = await fetch(`${api}/avatar/upload/${user!.id}`, {
          method: "PATCH",
          body: formData,
        });

        if (response.ok) {
          toast.success('Profile ပုံ ပြောင်းလဲပြီးပါပြီ။', {
          duration: 4000, 
          style: {
            fontFamily: 'sans-serif',
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        });
          setUpdate(false);
          
          // 💡 မူလဖိုင်ဟောင်းတွေကို Memory ထဲကနေ လုံးဝဖျက်ထုတ်ပစ်လိုက်တဲ့ အပိုင်း (State Reset)
          setImageObj(null);
        } else {
            toast.error('Upload လုပ်ရတာ အဆင်မပြေပါဘူး။', {
          duration: 4000, 
          style: {
            fontFamily: 'sans-serif',
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        });
        }
      } catch (error: any) {
         toast.error(error.message || 'Error တက်သွားပါတယ်။', {
          duration: 4000, 
          style: {
            fontFamily: 'sans-serif',
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        });
        
      } finally {
        setIsUploading(false);
      }
    }, "image/webp", 0.85); // 👈 အဓိကအချက်: "image/webp" ပြောင်းပြီး Quality ကို 85% (0.85) အဖြစ် Compress လုပ်လိုက်တာပါ
  };

  // ၅။ Facebook Bio အတွက် လုပ်ဆောင်ချက်များ
  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(user!.bio || "");
  const [savedBio, setSavedBio] = useState(user!.bio || "");
  const CHARACTER_LIMIT = 101;

  const handleSaveBio = async () => {
    setSavedBio(bioText);
    setIsEditing(false);
    try {
      const response = await fetch(`${api}/profile_bio/${user!.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio: bioText }),
      });
      const data = await response.json();
      if (data.success) {
         toast.success(data.message || 'Bio updated successfully!', {
          duration: 4000, 
          style: {
            fontFamily: 'sans-serif',
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
         toast.error(data.message || "Bio update failed", {
          duration: 4000, 
          style: {
            fontFamily: 'sans-serif',
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelBio = () => {
    setBioText(savedBio);
    setIsEditing(false);
  };

  if (user) {
    user.createdAt = user.createdAt?.split("T")[0];
    user.updatedAt = user.updatedAt?.split("T")[0];
  }

  return (
    <div className="w-full h-auto relative bg-bg select-none">
      <div className="max-w-2xl border-x-2 border-border h-full px-6 md:px-12 py-18 flex flex-col items-center mx-auto relative">
          <div className="w-full h-auto flex justify-between items-center px-4 absolute left-0 top-6">
            <button 
            type="button"
            className="p-2 hover:bg-text-muted/40 rounded-full transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-6 h-6 text-text-secondary" />
          </button>
            <button onClick={() => navigate("/auth/editprofile")} className="flex cursor-pointer px-2 py-1 bg-soft/80 hover:bg-soft rounded-lg border-2 border-border">
                  <FaPencilAlt className="text-lg text-text-main/90 hover:-translate-y-1 hover:text-text-main cursor-pointer duration-75" />
                  <span className="text-md ml-1 font-medium text-text-main/90">Edit Profile</span>
            </button>
          </div>
          {/* Profile Image View Area */}
          <div className="relative group mb-2">
            <div className="w-26 h-26 rounded-full bg-soft border-2 border-blue-500 overflow-hidden flex items-center justify-center text-3xl font-bold text-text-main/90">
              {user ? (
                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user!.name.charAt(0).toUpperCase()
              )}
            </div>

            {/* Camera Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-soft/90 hover:bg-soft text-text-main border border-border hover:border-text-muted rounded-full shadow-md shadow-card transition z-10"
              title="Change Profile Picture"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </button>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>

          <div className="mb-4">
            <div className="w-full h-auto flex justify-center items-center mt-4 mb-2">
              <h2 className="text-2xl md:text-3xl text-text-main font-extrabold font-serif">{user!.name}</h2>
            </div>
            <div className="w-full h-auto flex justify-center items-center mb-4">
              <p className="text-base md:text-md font-medium font-serif text-text-secondary">{user!.email}</p>
            </div>
          </div>

          {/* Facebook Style Bio Section */}
          <div className="w-full bg-card p-4 rounded-xl border border-border mb-4">
            {isEditing ? (
              <div className="flex flex-col items-center w-full">
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value.slice(0, CHARACTER_LIMIT))}
                  placeholder="သင့်အကြောင်း အကျဉ်းချုပ် ရေးပေးပါ..."
                  className="w-full p-3 text-sm text-center bg-transparent text-text-main rounded-lg border border-border focus:outline-none focus:border-blue-500 resize-none h-20"
                />
                <div className={`w-full text-right text-xs text-text-secondary mt-1 ${CHARACTER_LIMIT - bioText.length <= 0 ? 'text-red-500' : ''}`}>
                  ကျန်ရှိစာလုံးရေ: {CHARACTER_LIMIT - bioText.length} လုံး
                </div>
                <div className="flex gap-2 mt-3 justify-end w-full text-xs">
                  <button onClick={handleCancelBio} className="px-4 py-2 bg-transparent border border-border hover:bg-secondary text-text-secondary hover:text-bg rounded-md transition">
                    Cancel
                  </button>
                  <button onClick={handleSaveBio} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition">
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center relative py-2">
                {savedBio ? (
                  <p className="text-sm text-text-main italic">{savedBio}</p>
                ) : (
                  <p className="text-sm text-zinc-500 italic">Bio မရှိသေးပါ!</p>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute -bottom-4 -right-4 hover:bg-text-secondary px-2 py-2 rounded-md transition text-text-main text-xl hover:text-bg font-medium"
                >
                  {/* {savedBio ? "Edit Bio" : "Add Bio"} */}
                  <FaPencilAlt />
                </button>
              </div>
            )}
          </div>

          {/* User Details Info */}
          <div className="w-full h-auto mt-6 md:mt-8">
            <h2 className="text-text-main font-serif font-semibold mb-6 text-2xl">User Account Information!</h2>
            <div className="w-full h-auto flex justify-between items-center mt-4">
              <span className="text-md text-text-main font-serif">Role: </span>
              <p className="text-base font-serif text-text-main/90 lowercase first-letter:uppercase">{user!.role}</p>
            </div>
            <div className="w-full h-auto flex justify-between items-center mt-4">
              <span className="text-md text-text-main font-serif">Hobby: </span>
              <p className="text-base font-serif text-text-main/90 lowercase first-letter:uppercase">{user!.hobby}</p>
            </div>
            <div className="w-full h-auto flex justify-between items-center mt-4">
              <span className="text-md text-text-main font-serif">Gender: </span>
              <p className="text-base font-serif text-text-main/90 lowercase first-letter:uppercase">{user!.gender}</p>
            </div>
            <div className="w-full h-auto flex justify-between items-center mt-4">
              <span className="text-md text-text-main font-serif">Create Time: </span>
              <p className="text-base font-serif text-warning">{user!.createdAt}</p>
            </div>
            <div className="w-full h-auto flex justify-between items-center mt-4">
              <span className="text-md text-text-main font-serif">Update Time: </span>
              <p className="text-base font-serif text-success">{user!.updatedAt}</p>
            </div>
            <div className="w-full h-px bg-text-secondary my-6"></div>
            <div className="w-full h-auto flex justify-end">
                <button onClick={() => {
                  setIsLogout(true);
                }} className="px-3 py-1.5 mt-4 cursor-pointer bg-error rounded-lg border-2 border-border text-text-main hover:text-bg font-bold font-serif text-md">
                  Logout!
                </button>
            </div>
          </div>
      </div>

      {/* ==================== 🛠️ MANUAL IMAGE CROP/ZOOM MODAL OVERLAY ==================== */}
      {update && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-85 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm">
            <h3 className="text-lg font-bold text-zinc-200 mb-1">Adjust Profile Picture</h3>
            <p className="text-xs text-zinc-400 mb-6 text-center">ပုံကို ဖိဆွဲပြီး ရွှေ့နိုင်သလို၊ အောက်က Slider ဖြင့် ချဲ/ချုံ လုပ်နိုင်ပါတယ်</p>
            
            {/* Round Interactive Photo Canvas Container */}
            <div className="w-44 h-44 rounded-full border-4 border-blue-500 overflow-hidden shadow-2xl bg-zinc-950 flex items-center justify-center relative group active:scale-[0.99] transition-transform duration-150">
              <canvas
                ref={editCanvasRef}
                width={400}
                height={400}
                className="w-full h-full cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            </div>

            {/* Manual Slider for Zoom Adjustment */}
            <div className="w-full mt-6 px-2">
              <div className="flex justify-between text-xs text-zinc-400 mb-2">
                <span className="font-medium">Zoom Level</span>
                <span className="text-blue-400 font-bold">{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.02"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3 w-full text-sm">
              <button
                onClick={() => {
                  setUpdate(false);
                  setImageObj(null);
                }}
                className="flex-1 py-2.5 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 font-medium rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 disabled:bg-blue-800 transition flex items-center justify-center"
              >
                {isUploading ? "Saving..." : "Apply & Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`w-screen h-screen fixed top-0 left-0 bg-text-main opacity-30 ${isLogout ? 'block' : 'hidden'}`}></div>
        <div className={`max-w-3xl h-auto flex flex-col gap-4 bg-card z-500 border-2 border-red-700 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md ${isLogout ? 'block' : 'hidden'}`}>
                    <div className='w-full h-auto px-4 py-6'>
                        <h2 className="text-lg md:text-xl font-bold border-b border-text-secondary pb-2 text-text-main text-center mb-4">Logout Account!</h2>
                        <div className="w-full h-auto py-4 flex flex-col gap-4">
                            <div className="w-26 h-26 rounded-full bg-soft border-2 border-blue-500 overflow-hidden flex items-center justify-center text-3xl font-bold text-text-main/90 mx-auto mb-4">
                            {user ? (
                                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user!.name.charAt(0).toUpperCase()
                            )}
                            </div>
                        <p className="text-base text-text-secondary">Are you sure you want to logout your account?</p>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 bg-text-main/90 gap-px rounded-b-md pt-px">
                        <button 
                            type="button"
                            onClick={() => setIsLogout(false)}
                            className="bg-card font-semibold hover:bg-sky-300 rounded-bl-md text-text-main/90 text-center py-2 cursor-pointer border-t-0.5 border-text-main/90"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            onClick={() => {
                              localStorage.removeItem("token");
                              setUser(null);
                              navigate("/")
                              setLogin(false);
                              setIsLogout(false);
                            }}
                            className="bg-card font-semibold hover:bg-error rounded-br-md text-text-main text-center py-2 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
        </div>
    </div>
  );
};

export default Profile;