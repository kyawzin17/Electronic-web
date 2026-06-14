import React, { useState, } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
   Edit2, Trash2, ChevronDown, Check 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import UploadAvatar from './UploadAvatar';
import { toast } from "react-hot-toast";


export default function EditProfile() {

    const navigate= useNavigate();

  const { user, setUser }= useAppContext();
  const [isHobbyOpen, setIsHobbyOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [bioText, setBioText] = useState(user!.bio || "");
  const CHARACTER_LIMIT = 101;
  const hobbies = ['Electronics', 'Coding', 'Robotics', 'Physics'];
  const genders = ['Male', 'Female', 'Rather not say'];
    const api=import.meta.env.VITE_API_URL_PRODUCTION;
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  // Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBioText(e.target.value.slice(0, CHARACTER_LIMIT));
    setUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field: any, value: string) => {
    setUser((prev: any) => ({ ...prev, [field]: value }));
    setIsHobbyOpen(false);
    setIsGenderOpen(false);
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch(`${api}/edit_user/${user!.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: user!.name, email: user!.email, hobby: user!.hobby, gender: user!.gender, bio: user!.bio}),
        })
        if (!response.ok) {
            throw new Error("Failed to update user profile");
        }
        const data= await response.json();
        console.log("edit user", data);
        setUser(data);
        toast.success("Changes saved successfully", {
            duration: 4000, 
            style: {
              fontFamily: 'sans-serif',
              borderRadius: '12px',
              background: '#333',
              color: '#fff',
            },
          });
        navigate("/auth/profile");
    } catch (error) {
        console.error('Error saving changes:', error);
        alert('Failed to save changes. Please try again.');
        toast.error("Failed to save changes. Please try again.", {
            duration: 4000, 
            style: {
              fontFamily: 'sans-serif',
              borderRadius: '12px',
              background: '#333',
              color: '#fff',
            },
          });
        return;
    }
  };

  // * Handler for deactivating account
  const handlerDeactiveAccount= async () => {

    try {
        const response= await fetch(`${api}/user_delete/${user!.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!response.ok) {
        throw new Error("Failed to delete user profile");
    }
    setUser(null);
    toast.success("Account deleted successfully", {
        duration: 4000, 
        style: {
          fontFamily: 'sans-serif',
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
        },
      });
    navigate("/auth/login");
    } catch (error: any) {
        console.error("This is profile delete:", error);
        toast.error(error.message || "This is error!", {
            duration: 4000, 
        style: {
          fontFamily: 'sans-serif',
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
        },
        })
    }
  }
  return (
    <div className={`w-full min-h-screen bg-bg ${isDeleteAccountOpen ? 'overflow-hidden' : ''}`}>
        <div className="h-auto max-w-3xl bg-card mx-auto flex items-center justify-center p-4 sm:p-6 font-sans antialiased text-text-main">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-transparent rounded-2xl shadow-xl border border-border overflow-hidden"
            >
                {/* Header Actions */}
                <div className="p-6 flex items-center justify-end border-b border-border">
                {/* <button 
                    type="button"
                    className="p-2 hover:bg-text-muted/40 rounded-full transition-colors duration-200"
                    onClick={() => navigate("/auth/profile")}
                >
                    <ArrowLeft className="w-6 h-6 text-text-secondary" />
                </button> */}
                
                    <div className="flex items-center gap-3">
                        <button 
                        type="button" 
                        onClick={() => navigate("/auth/profile")}
                        className="px-5 py-2 rounded-xl text-sm font-semibold bg-text-muted/40 text-text-main cursor-pointer hover:bg-text-muted transition-all active:scale-95"
                        >
                        Cancel
                        </button>
                        <button 
                        onClick={handleSubmit}
                        type="submit" 
                        className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#8e44ad] text-white hover:bg-[#7d3c98] cursor-pointer transition-all active:scale-95"
                        >
                        Save Changes
                        </button>
                    </div>
                </div>
                <UploadAvatar />
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                
                {/* Avatar & Basic Info Section */}
                <div className="flex flex-col items-center space-y-4">
                    

                    {/* Editable Name & Email Text fields */}
                    <div className="w-full max-w-md text-center space-y-2">
                    <div className="relative flex items-center justify-center group">
                        <input 
                        type="text"
                        name="name"
                        value={user!.name}
                        onChange={handleInputChange}
                        className="text-2xl font-bold text-center border-b border-transparent hover:border-gray-300 focus:border-[#3498db] focus:outline-none px-2 py-1 w-auto max-w-xs transition-colors"
                        />
                        <Edit2 className="w-4 h-4 text-gray-400 absolute right-12 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                <p className="text-sm text-text-muted font-medium">{user!.email}</p>
                    </div>
                </div>

                <div className="w-[70%] bg-text-muted h-px mt-4 mb-16 mx-auto"></div>
                {/* User Account Information Grid */}
                <div className="space-y-5">
                    <h2 className="text-xl font-bold pb-2 text-text-main/90">User Account Information</h2>
                    
                    {/* Bio Field */}
                    <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-600">Bio / Profile Summary</label>
                    <div className="relative">
                        <div className={`w-full text-right text-xs text-text-secondary mt-1 flex justify-end ${CHARACTER_LIMIT - bioText.length <= 0 ? 'text-red-500' : ''}`}>
                            <p>
                                ကျန်ရှိစာလုံးရေ: {CHARACTER_LIMIT - bioText.length} လုံး
                            </p>
                        </div>
                        <textarea 
                        name="bio"
                        value={bioText}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-[#3498db]/20 focus:border-[#3498db] focus:outline-none resize-none transition-all duration-200 text-sm`}
                        />
                        { !user!.bio &&
                            <p className="text-sm text-text-muted italic">သင့် အကြောင်း ကို ရိုက်ထည့်ပါ . . .</p>
                        }
                    </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Hobby Custom Dropdown */}
                    <div className="space-y-1.5 relative">
                        <label className="text-sm font-semibold text-text-main/80">Hobby</label>
                        <button
                        type="button"
                        onClick={() => setIsHobbyOpen(!isHobbyOpen)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg flex items-center justify-between focus:ring-2 focus:ring-[#3498db]/20 focus:border-[#3498db] focus:outline-none text-sm transition-all text-left"
                        >
                        <span>{user!.hobby}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isHobbyOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                        {isHobbyOpen && (
                            <motion.ul 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-bg border border-border rounded-xl shadow-lg max-h-48 overflow-y-auto"
                            >
                            {hobbies.map((hobby) => (
                                <li 
                                key={hobby}
                                onClick={() => handleSelect('hobby', hobby)}
                                className="px-4 py-2 hover:bg-soft text-sm cursor-pointer flex items-center justify-between"
                                >
                                {hobby}
                                {user!.hobby === hobby && <Check className="w-4 h-4 text-[#3498db]" />}
                                </li>
                            ))}
                            </motion.ul>
                        )}
                        </AnimatePresence>
                    </div>

                    {/* Gender Custom Dropdown */}
                    <div className="space-y-1.5 relative">
                        <label className="text-sm font-semibold text-text-main/80">Gender</label>
                        <button
                        type="button"
                        onClick={() => setIsGenderOpen(!isGenderOpen)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg flex items-center justify-between focus:ring-2 focus:ring-[#3498db]/20 focus:border-[#3498db] focus:outline-none text-sm transition-all text-left"
                        >
                        <span>{user!.gender}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isGenderOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                        {isGenderOpen && (
                            <motion.ul 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-bg border border-border rounded-xl shadow-lg"
                            >
                            {genders.map((gender) => (
                                <li 
                                key={gender}
                                onClick={() => handleSelect('gender', gender)}
                                className="px-4 py-2 hover:bg-soft text-sm cursor-pointer flex items-center justify-between"
                                >
                                {gender}
                                {user!.gender === gender && <Check className="w-4 h-4 text-[#3498db]" />}
                                </li>
                            ))}
                            </motion.ul>
                        )}
                        </AnimatePresence>
                    </div>
                    </div>
                </div>

                {/* Social Links & Contact Section */}
                {/* <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2 text-gray-700">Social Links & Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                    <div className="flex items-center space-x-2 border border-gray-200 rounded-xl p-2 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3498db]/20 focus-within:border-[#3498db] transition-all">
                        <div className="p-2 bg-blue-500 text-white rounded-lg">
                        <Globe className="w-4 h-4" />
                        </div>
                        <input 
                        type="text" 
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="website.com"
                        className="w-full bg-transparent text-xs focus:outline-none text-gray-700"
                        />
                    </div>

                    </div>
                </div> */}

                {/* Security & Danger Zone Section */}
                {/* <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-bold border-b pb-2 text-gray-700">Security Settings</h3>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                    <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                        <p className="text-sm font-semibold text-gray-700">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-gray-500">Secure your account with an extra layer of security.</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none ${formData.twoFactor ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                        <motion.div 
                        layout
                        className="bg-white w-4 h-4 rounded-full shadow-md"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        style={{ marginLeft: formData.twoFactor ? '24px' : '0px' }}
                        />
                    </button>
                    </div>

                </div> */}
                <div className='w-full bg-text-muted h-px my-16'></div>
                <div className="pt-2">
                    <button 
                        type="button"
                        onClick={() => setIsDeleteAccountOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border border-text-main/60 rounded-xl hover:bg-soft cursor-pointer active:scale-95 transition-all text-red-600 hover:border-red-500"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                    </button>
                    </div>

                </form>
            </motion.div>
        </div>
        <div className={`w-screen h-screen fixed top-0 left-0 bg-text-main opacity-30 ${isDeleteAccountOpen ? 'block' : 'hidden'}`}></div>
        <div className={`max-w-3xl h-auto flex flex-col gap-4 bg-card z-500 border-2 border-red-700 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md ${isDeleteAccountOpen ? 'block' : 'hidden'}`}>
                    <div className='w-full h-auto px-4 py-6'>
                        <h2 className="text-lg md:text-xl font-bold border-b border-text-secondary pb-2 text-text-main text-center mb-4">DELETE Account!</h2>
                        <div className="w-full h-auto py-4 flex flex-col gap-4">
                            <div className="w-26 h-26 rounded-full bg-soft border-2 border-blue-500 overflow-hidden flex items-center justify-center text-3xl font-bold text-text-main/90 mx-auto mb-4">
                            {user ? (
                                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user!.name.charAt(0).toUpperCase()
                            )}
                            </div>
                        <p className="text-base text-text-secondary">Are you sure you want to delete your account?</p>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 bg-text-main/90 gap-px rounded-b-md pt-px">
                        <button 
                            type="button"
                            onClick={() => setIsDeleteAccountOpen(false)}
                            className="bg-card font-semibold hover:bg-sky-300 rounded-bl-md text-text-main/90 text-center py-2 cursor-pointer border-t-0.5 border-text-main/90"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            onClick={handlerDeactiveAccount}
                            className="bg-card font-semibold hover:bg-error rounded-br-md text-text-main text-center py-2 cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
        </div>
    </div>
  );
}