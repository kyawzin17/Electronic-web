import { useState, useEffect } from 'react';
// Folder ထဲက .mdx file အားလုံးကို dynamic ဆွဲယူထားမယ်
const allLessons = import.meta.glob('../Introduction/*.mdx');
import "../../docs/forDocs.css";
export default function LearnViewer() {
  const [ActiveComp, setActiveComp] = useState<React.FC | null>(null);

  useEffect(() => {
    const loadFile = async () => {
      // Path လမ်းကြောင်း တည်ဆောက်ခြင်း
      const path = `../Introduction/introduction.mdx`;
      
      if (allLessons[path]) {
        const mod: any = await allLessons[path]();
        setActiveComp(() => mod.default);
      } else {
        setActiveComp(null); // File ရှာမတွေ့ရင်
      }
    };
    
    loadFile();
  }, []);

  return (
    <article className="content-area text-text-main learning prose prose-slate max-w-none text-base md:text-lg leading-mm-relaxed">
      {ActiveComp ? <ActiveComp /> : <p>Loading or File Not Found...</p>}
    </article>
  );
}

