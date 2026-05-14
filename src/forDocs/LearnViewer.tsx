import { useState, useEffect } from 'react';

// Folder ထဲက .mdx file အားလုံးကို dynamic ဆွဲယူထားမယ်
const allLessons = import.meta.glob('../learns/chapter-1/*.mdx');

export default function DocViewer({ category, fileName }: { category: string, fileName: string }) {
  const [ActiveComp, setActiveComp] = useState<React.FC | null>(null);

  useEffect(() => {
    const loadFile = async () => {
      // Path လမ်းကြောင်း တည်ဆောက်ခြင်း
      const path = `../learns/${category}/${fileName}.mdx`;
      
      if (allLessons[path]) {
        const mod: any = await allLessons[path]();
        setActiveComp(() => mod.default);
      } else {
        setActiveComp(null); // File ရှာမတွေ့ရင်
      }
    };
    
    loadFile();
  }, [category, fileName]);

  return (
    <div className="content-area">
      {ActiveComp ? <ActiveComp /> : <p>Loading or File Not Found...</p>}
    </div>
  );
}