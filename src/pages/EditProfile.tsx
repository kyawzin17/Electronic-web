import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const EditProfile: React.FC = () => {
    
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 bg-bg sm:px-6">
            <h1 className="text-3xl font-bold text-white mb-6">Edit Profile</h1>
            <div className="bg-[#0d1117] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-8">
                {/* Profile Form */}
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input type="text" id="name" name="name" className="w-full p-2 border border-slate-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input type="email" id="email" name="email" className="w-full p-2 border border-slate-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                        <textarea id="bio" name="bio" rows={4} className="w-full p-2 border border-slate-300 rounded-md"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300">
                            Update Profile
                        </button>
                    </div>
                    <div>
                        <button onClick={() => navigate("/user-profile")} className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition duration-300">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
