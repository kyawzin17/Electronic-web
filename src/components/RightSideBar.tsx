import { useEffect, useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';

interface Heading {
  id: string;
  title: string;
}
const RightSidebar = ({ headings }: { headings: Heading[] }) => {
    const [activeId, setActiveId] = useState<string | null>(null);
  const { headerHeight } = useAppContext(); // Header height ကို context ကနေ ယူမယ်
  useEffect(() => {
    // မျက်နှာပြင်ပေါ် ရောက်/မရောက် စောင့်ကြည့်မည့် logic
    const observer = new IntersectionObserver(
  (entries) => {
    // Screen ထဲကို ဝင်လာတဲ့ (Intersecting ဖြစ်တဲ့) အရာတွေကိုပဲ စစ်မယ်
    const visibleEntries = entries.filter(entry => entry.isIntersecting);
    
    if (visibleEntries.length > 0) {
      // Screen ပေါ်မှာ တစ်ခုထက်မက ရှိနေရင် အပေါ်ဆုံးက တစ်ခုကိုပဲ active ယူမယ်
      setActiveId(visibleEntries[0].target.id);
    }
  },
  { rootMargin: '-100px 0px -70% 0px' } 
);
    // Heading တစ်ခုချင်းစီကို လိုက်ကြည့်ခိုင်းခြင်း
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="sticky overflow-y-auto bg-soft hidden xl:block py-12 px-4"
                 style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}>
      <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-4">
        On this page
      </h3>
      <nav>
        <ul className="space-y-3 text-[13px] border-l border-slate-200 dark:border-slate-800">
          {headings.map((heading) => (
            <li key={heading.id} onClick={() => setActiveId(heading.id)}>
              <a
                href={`#${heading.id}`}
                className={`block pl-4 -ml-px border-l-2 transition-all duration-200 ${
                  activeId === heading.id
                    ? "border-purple-500 text-purple-600 dark:text-purple-400 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                }`}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default RightSidebar;