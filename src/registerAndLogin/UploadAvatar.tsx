import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";



const UploadAvatar = () => {
  const { user } = useAppContext();
  
  const [isUploading, setIsUploading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [preview, setPreview]= useState<string>("");
  const [previewUpdate, setPreviewUpdate]= useState<boolean>(false);
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
        alert("ပုံဖော်ရတာ အဆင်မပြေပါဘူး");
        setIsUploading(false);
        return;
      }

      // ဖိုင်အသစ်ဆောက်တဲ့အခါ Extension ကို .webp နဲ့ Type ကို image/webp လို့ သတ်မှတ်ပါမယ်
      const processedFile = new File([blob], "avatar.webp", { type: "image/webp" });
      
      const formData = new FormData();
      formData.append("image", processedFile); // Backend ဆီကို .webp ဖိုင်ပဲ အသစ်ပို့တော့မှာပါ

      try {
        const response = await fetch(`http://localhost:3335/api/avatar/upload/${user!.id}`, {
          method: "PATCH",
          body: formData,
        });

        if (response.ok) {
          alert("Profile ပုံ ပြောင်းလဲပြီးပါပြီ။");
          const data= await response.json();
          setPreview(data.data);
          setPreviewUpdate(true);
          setUpdate(false);
          // 💡 မူလဖိုင်ဟောင်းတွေကို Memory ထဲကနေ လုံးဝဖျက်ထုတ်ပစ်လိုက်တဲ့ အပိုင်း (State Reset)
          setImageObj(null);
        } else {
          alert("Upload လုပ်ရတာ အဆင်မပြေပါဘူး။");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error တက်သွားပါတယ်။");
      } finally {
        setIsUploading(false);
      }
    }, "image/webp", 0.85); // 👈 အဓိကအချက်: "image/webp" ပြောင်းပြီး Quality ကို 85% (0.85) အဖြစ် Compress လုပ်လိုက်တာပါ
  };





  if (user) {
    user.createdAt = user.createdAt?.split("T")[0];
    user.updatedAt = user.updatedAt?.split("T")[0];
  }

  return (
    <div className="w-full h-auto rounded-b-xl relative bg-bg select-none">
      <div className="max-w-2xl h-full px-6 md:px-12 py-18 flex flex-col items-center mx-auto relative">
          {/* Profile Image View Area */}
          <div className="relative group mb-2">
            {!previewUpdate ?
            <div className="w-30 h-30 rounded-full bg-soft border-2 border-blue-500 overflow-hidden flex items-center justify-center text-3xl font-bold text-text-main/90">
              {user ? (
                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user!.name.charAt(0).toUpperCase()
              )}
            </div>
            :
            <div className="w-30 h-30 rounded-full bg-soft border-2 border-blue-500 overflow-hidden flex items-center justify-center text-3xl font-bold text-text-main/90">
                <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            }
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
    </div>
  );
};

export default UploadAvatar;