import { useAppContext } from "../hooks/useAppContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MobileRightSidebar() {
    const { rightMenu, setRightMenu, login, setLogin, user, setUser } = useAppContext();

    const navigate = useNavigate();
    // Lock body scroll when right menu is open
    const [ isLogout, setIsLogout ] = useState<boolean>(false);
    useEffect(() => {
        if (rightMenu) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [rightMenu]);

    // Lock body scroll when right menu is open
    useEffect(() => {
        if (rightMenu) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [rightMenu]);

  const docLocalStorage = localStorage.getItem("docComponents") || "/docs/doc/components";

    const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doc', path: docLocalStorage }, // /doc/components/passive ဆိုရင်လည်း ဒါက Active ဖြစ်နေမှာပါ
    { name: 'Project', path: '/project' },
  ];
  const activeClass= "px-3 py-2 rounded-md transition-all bg-slate-100 dark:bg-slate-800 text-purple-500";
  const normalClass= "px-3 py-2 rounded-md transition-all text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"
    return (
            <div className={`fixed inset-0 z-101 lg:hidden ${rightMenu ? 'block' : 'hidden'}`}>
                {/* Backdrop that prevents all background interaction */}
                <div 
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${rightMenu ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setRightMenu(false)}
                ></div>
                
                {/* Menu panel */}
                <div className={`absolute right-0 top-0 h-full w-full md:w-80 bg-soft shadow-lg transform transition-transform duration-300 ${rightMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4 border-b border-border">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-text-main">Menu & TOC</h3>
                            <button 
                                onClick={() => setRightMenu(false)}
                                className="p-2 rounded-md hover:bg-border transition-colors"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-text-main" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
                        {/* Navigation Menu */}
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-text-main uppercase tracking-widest mb-3">Navigation</h4>
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <NavLink 
                                    key={item.path} 
                                    to={item.path} 
                                    onClick={() => {
                                        setRightMenu(false);
                                    }}
                                    className={({isActive}) => isActive || (item.path !== '/' && window.location.pathname.startsWith(item.path)) ? activeClass : normalClass}
                                >{item.name}</NavLink>
                                 ))}
                            </nav>
                        </div>

                        {/* Login/Profile Section */}
                        <div className="mt-6 pt-4 border-t border-border">
                            {!login ? (
                                <Link 
                                    to="/auth/login" 
                                    onClick={() => setRightMenu(false)}
                                    className="w-full bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/80 transition duration-100 font-serif font-semibold text-center block"
                                >
                                    Login
                                </Link>
                            ) : (
                                <div className="text-center text-text-secondary">
                                    <p className="text-base font-medium mb-2">Welcome back!</p>
                                    <button 
                                        onClick={() => {
                                            setIsLogout(true);
                                        }}
                                        className="text-base font-semibold border border-red-500 w-full py-2 rounded-md transition-colors duration-300 bg-transparent hover:bg-card text-red-500 hover:text-red-600 mt-1"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`w-screen h-screen fixed top-0 left-0 bg-text-main opacity-30 ${isLogout ? 'block' : 'hidden'}`}></div>
                    <div className={`max-w-3xl h-auto flex flex-col gap-4 bg-card z-500 border-2 border-red-700 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md ${isLogout ? 'block' : 'hidden'}`}>
                                <div className='w-full h-auto px-4 py-6'>
                                    <h2 className="text-lg md:text-xl font-bold border-b border-text-secondary pb-2 text-text-main text-center mb-4">Logout Account!</h2>
                                    <div className="w-full h-auto py-4 flex flex-col gap-4">
                                        <div className="w-26 h-26 rounded-full bg-soft border-2 border-blue-500 overflow-hidden flex items-center justify-center text-3xl font-bold text-text-main/90 mx-auto mb-4">
                                        {user && (
                                            user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            user!.name.charAt(0).toUpperCase()
                                        ))
                                    }
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
                                        setLogin(false);
                                        setRightMenu(false);
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
    )
}