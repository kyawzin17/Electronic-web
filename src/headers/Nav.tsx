
import { NavLink, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';

export default function Nav() {
  const { pathname } = useLocation();
  const docLocalStorage = localStorage.getItem("docComponents") || "/docs/doc/components";
  
  const navItems = [
    { name: 'Docs', path: docLocalStorage }, 
    { name: 'Project', path: '/project' },
    { name: 'About', path: '/about' },
  ];

  // လက်ရှိ URL က ဘယ် Nav အောက်မှာ ရှိနေလဲဆိုတာ စစ်ဆေးခြင်း
  // const getActiveTab = () => {
  //   const active = navItems.find(item => {
  //     if (item.path === '/') {
  //       return pathname === '/';
  //     }
      
  //     // 🎯 နည်းဗျူဟာအသစ်: အကယ်၍ Docs tab ဖြစ်နေရင် URL ထဲမှာ '/docs' ပါတာနဲ့ တန်းပြီး Active ပေးမည်
  //     if (item.name === 'Docs') {
  //       return pathname.startsWith('/docs');
  //     }

  //     return pathname.startsWith(item.path);
  //   });

  //   return active ? active.name : null;
  // };

  // const activeTab = getActiveTab();

  return (
    <nav className="gap-8 flex justify-center items-end font-medium font-serif relative">
      {navItems.map((item) => {
        // NavLink ရဲ့ Class တွက်ချက်ဖို့အတွက် logic ကို ရှင်းအောင် သီးသန့်ထုတ်လိုက်ခြင်း
        const isCurrentActive = 
          item.name === 'Docs' 
            ? pathname.startsWith('/docs') 
            : item.path === '/' 
              ? pathname === '/' 
              : pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={`
              relative text-md md:text-lg font-medium transition-colors duration-300
              ${isCurrentActive ? "text-primary" : "text-text-main hover:text-primary"} 
            `}
          >
            {item.name}

            {/* Animation ပါတဲ့ Underline Div
            {activeTab === item.name && (
              <motion.div
                layoutId="underline"
                className="absolute rounded-md left-0 right-0 bottom-0 h-0.75 bg-primary shadow-[0_0_10px_var(--primary-soft)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )} */}
          </NavLink>
        );
      })}
    </nav>
  );
}

