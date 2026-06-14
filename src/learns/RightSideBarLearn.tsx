import { useEffect, useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';

// 🌟 Learn Component က ပို့ပေးမယ့် Nested Structre နဲ့ ကိုက်ညီအောင် ပြင်ဆင်ထားပါတယ်
interface Heading {
  id: string;
  title: string;
  level: number;
  children: Heading[];
}

const RightSidebarLearn = ({ headings }: { headings: Heading[] }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { headerHeight } = useAppContext(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Screen ပေါ်မှာ တွေ့ရတဲ့ ပထမဆုံး element ကို active ပေးမယ်
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -20% 0px' } 
    );

    // 🌟 h3 ရော h4 ပါကျန်ခဲ့ခြင်းမရှိအောင် ပတ်မယ့် Recursive Function လေးဖြစ်ပါတယ်
    const observeAllHeadings = (headingList: Heading[]) => {
      headingList.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.observe(element);
        
        // အကယ်၍ အထဲမှာ h4 children တွေရှိနေရင် ထပ်ပြီး ဝင်ကြည့်မယ်
        if (heading.children && heading.children.length > 0) {
          observeAllHeadings(heading.children);
        }
      });
    };

    observeAllHeadings(headings);

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="sticky overflow-y-auto bg-soft hidden xl:block py-12 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
           style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}>
      <p className="text-base font-semibold text-text-main tracking-widest mb-4">
        On this page
      </p>
      <nav>
        <ul className="space-y-3 text-[14px] border-l border-slate-200 dark:border-slate-800">
          {headings.map((heading) => (
            <li key={heading.id} className="flex flex-col">
              {/* 🟢 H3 Header Link */}
              <a
                href={`#${heading.id}`}
                onClick={() => setActiveId(heading.id)}
                className={`block pl-4 -ml-px border-l-2 transition-all duration-200 ${
                  activeId === heading.id
                    ? "border-purple-500 text-purple-600 dark:text-purple-400 font-bold"
                    : "border-transparent text-text-secondary hover:text-text-main"
                }`}
              >
                {heading.title}
              </a>

              {/* 🟣 H4 Sub-Headers Link (h3 အောက်မှာ h4 ရှိမှ ပေါ်လာမယ်) */}
              {heading.children && heading.children.length > 0 && (
                <ul className="mt-2 space-y-2 ml-4 border-l border-slate-100 dark:border-slate-800/60">
                  {heading.children.map((subHeading) => (
                    <li key={subHeading.id}>
                      <a
                        href={`#${subHeading.id}`}
                        onClick={() => setActiveId(subHeading.id)}
                        className={`block pl-4 -ml-px border-l-2 text-[13px] transition-all duration-200 ${
                          activeId === subHeading.id
                            ? "border-purple-400 text-purple-500 dark:text-purple-300 font-semibold"
                            : "border-transparent text-text-muted hover:text-text-secondary"
                        }`}
                      >
                        {subHeading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default RightSidebarLearn;