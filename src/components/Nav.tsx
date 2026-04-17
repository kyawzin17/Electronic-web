
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Nav() {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doc', path: '/doc' }, // /doc/components/passive ဆိုရင်လည်း ဒါက Active ဖြစ်နေမှာပါ
    { name: 'Project', path: '/project' },
    { name: 'Circuit', path: '/circuit' },
  ];

  // လက်ရှိ URL က ဘယ် Nav အောက်မှာ ရှိနေလဲဆိုတာ စစ်ဆေးခြင်း
  const getActiveTab = () => {
    const active = navItems.find(item => 
      item.path === '/' ? pathname === '/' : pathname.startsWith(item.path)
    );
    return active ? active.name : null;
  };

  const activeTab = getActiveTab();

  return (
    <nav className="gap-8 flex justify-center items-center text-lg font-medium font-serif tr relative">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => `
            relative px-1 py-1 text-base font-medium transition-colors duration-300
            ${isActive || (item.path !== '/' && pathname.startsWith(item.path))
              ? "text-[var(--primary)]" 
              : "text-[var(--text-secondary)] hover:text-[var(--text-main)]"}
          `}
        >
          {item.name}

          {/* Animation ပါတဲ့ Underline Div */}
          {activeTab === item.name && (
            <motion.div
              layoutId="underline" // ဒါက magic ပါ၊ တူညီတဲ့ ID ရှိတဲ့ div တွေကြား animation ပြေးပေးတာပါ
              className="absolute rounded-md left-0 right-0 bottom-0 h-[3px] bg-[var(--primary)] shadow-[0_0_10px_var(--primary-soft)]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </NavLink>
      ))}
    </nav>
  );
};

// export default function Nav() {
//      const [leftBar, setLeftBar]= useState(0);
//      const [width, setWidth]= useState(0);
//      const location= useLocation();

//       // Update active item based on URL path

//      const itemRef= useRef({});

//      const { active, setActive }= useAppContext();

//      const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Doc', path: '/doc/components'},
//     { name: 'Project', path: '/project' },
//   ];
//      // Get active item position
// const itemActive= () => {
//         const element= itemRef.current[active];
//         if(element) {
//             const leftE= element.offsetLeft;
//             const widthE= element.offsetWidth;
//              setWidth(widthE);
//             setLeftBar(leftE);
//         }
//     }

// // useEffect(() => {
// //     const path= location.pathname.split("/")[1]; // Get first segment of path
// //     const activeLink= navLinks.find(link => link.path.includes(path));
// //     if(activeLink) {
// //         setActive(activeLink.name.toLowerCase());
// //     }
// // }, []);

// // Update active item position on active change
// useEffect(() => {
//     itemActive();
// }, [active]);


// const activeClass= "text-text-main mx-2 hover:text-primary tr active";
// const normalClass= "text-text-main mx-2 hover:text-primary";
//     return (
//         <nav className="flex justify-center items-center gap-4 text-lg font-medium font-serif tr relative">
//             {navLinks.map((item) => {
//                 return (
//                 <NavLink 
//                     key={item.name}
//                     ref={(el) => itemRef.current[item.name.toLowerCase()] = el}
//                     to={item.path}
//                     onClick={() => setActive(item.name.toLowerCase())}
//                     className={({isActive}) => isActive ? activeClass : normalClass}
//                 >
//                     {item.name}
//                 </NavLink>
//             )})}
//           <div className="h-0.5 bg-(--text-main) rounded-md tr absolute bottom-0.5 tr" style={{width: `${width}px`, left: `${leftBar}px`}}>

//           </div>
//         </nav>
//     )
// }
