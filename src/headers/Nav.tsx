
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Nav() {
  const { pathname } = useLocation();
  const docLocalStorage = localStorage.getItem("docComponents") || "/docs/doc/components";
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Docs', path: docLocalStorage }, 
    { name: 'Project', path: '/project' },
  ];

  // လက်ရှိ URL က ဘယ် Nav အောက်မှာ ရှိနေလဲဆိုတာ စစ်ဆေးခြင်း
  const getActiveTab = () => {
    const active = navItems.find(item => {
      if (item.path === '/') {
        return pathname === '/';
      }
      
      // 🎯 နည်းဗျူဟာအသစ်: အကယ်၍ Docs tab ဖြစ်နေရင် URL ထဲမှာ '/docs' ပါတာနဲ့ တန်းပြီး Active ပေးမည်
      if (item.name === 'Docs') {
        return pathname.startsWith('/docs');
      }

      return pathname.startsWith(item.path);
    });

    return active ? active.name : null;
  };

  const activeTab = getActiveTab();

  return (
    <nav className="gap-8 flex justify-center items-center text-lg font-medium font-serif relative">
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
              relative px-1 py-1 text-base font-medium transition-colors duration-300
              ${isCurrentActive ? "text-primary" : "text-text-secondary hover:text-text-main"} 
            `}
          >
            {item.name}

            {/* Animation ပါတဲ့ Underline Div */}
            {activeTab === item.name && (
              <motion.div
                layoutId="underline"
                className="absolute rounded-md left-0 right-0 bottom-0 h-0.75 bg-primary shadow-[0_0_10px_var(--primary-soft)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

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
