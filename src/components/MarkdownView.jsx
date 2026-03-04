import ReactMarkdown from "react-markdown"; // d ကို အသေးပြောင်းထားတယ်
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css"; // CSS မပါရင် zoom effect အလုပ်မလုပ်ပါဘူး

export default function MarkdownView({ markdown }) {


    const renderH3 = ({ children }) => {
  // children ထဲက စာသားကို ယူပြီး id အဖြစ် ပြောင်းလဲခြင်း
  const title = Array.isArray(children) ? children[0] : children;
  const id = typeof title === 'string' 
    ? title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '') 
    : '';
    console.log("Rendering H3 with ID:", id); // Debugging အတွက် console log

  return (
    <h3 
      id={id} 
      className="scroll-mt-24 font-bold text-slate-900 dark:text-white"
    >
      {children}
    </h3>
  );
};
    return (
        /* စာသားအားလုံးအတွက် Typography Class များကို ဤနေရာတွင် ထားပါ */
        <div className="w-full h-auto px-4 py-6 
            prose lg:prose-lg max-w-none prose-slate
            /* Light Mode အရောင်များ */
            prose-headings:text-slate-900 
            prose-p:text-slate-800 
            prose-li:text-slate-800
            prose-strong:text-slate-900
            /* Dark Mode အရောင်များ */
            dark:prose-invert 
            dark:prose-headings:text-white 
            dark:prose-p:text-slate-200
            dark:prose-li:text-slate-200
            dark:prose-strong:text-slate-100
            transition-colors duration-300">

            <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkMath]} 
                rehypePlugins={[rehypeKatex]}
                components={{
                    h3: renderH3,
                    // Hydration Error အတွက် p tag logic
                    p: ({ children }) => {
                        const hasImage = Array.isArray(children) 
                            ? children.some(child => child.type && (child.type.name === 'img' || child.type === 'img'))
                            : children.type && (children.type.name === 'img' || children.type === 'img');
                        
                        if (hasImage) return <div className="my-8 flex justify-center">{children}</div>;
                        return <p className="mb-4">{children}</p>;
                    },

                    // ပုံများအတွက် Class သီးသန့်
                    img: ({ node, ...props }) => (
                        <Zoom>
                            <img 
                                {...props} 
                                className="rounded-xl border border-slate-300 dark:border-slate-700 
                                           my-4 mx-auto cursor-zoom-in transition-all duration-300
                                           dark:invert dark:brightness-90 hover:brightness-110" 
                                style={{ maxHeight: '500px', objectFit: 'contain' }}
                            />
                        </Zoom>
                    ),

                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-pink-500" {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}
// export default function MarkdownView({ markdown }) {
//     return (
//         // prose-invert ကို ထည့်ထားတယ် (Dark Mode အတွက်)
//         <div className="w-full h-auto px-4 py-6 prose lg:prose-lg 
//                         dark:prose-invert dark:prose-slate-900 max-w-none">
//             <ReactMarkdown 
//                 remarkPlugins={[remarkGfm, remarkMath]} 
//                 rehypePlugins={[rehypeKatex]}
//                 components={{
//                     // Paragraph tag ကို စစ်ဆေးပြီး div ပြောင်းပေးခြင်း
//                     p: ({ children }) => {
//                         const hasImage = Array.isArray(children) 
//                             ? children.some(child => child.type && child.type.name === 'img')
//                             : children.type && children.type.name === 'img';
                        
//                         if (hasImage) return <div className="my-8">{children}</div>;
//                         return <p>{children}</p>;
//                     },
//                     // ပုံတွေကို Zoom ဆွဲလို့ရအောင် ပြင်ဆင်ခြင်း
//                     img: ({ node, ...props }) => (
//                         <Zoom>
//                             <img 
//                                 {...props} 
//                                 className="prose lg:prose-lg max-w-none
//                                     /* Light Mode အတွက် စာသားကို ပိုနက်စေရန် */
//                                     prose-slate 
//                                     prose-headings:text-slate-900 
//                                     prose-p:text-slate-800 
//                                     prose-li:text-slate-800
//                                     prose-strong:text-slate-900
//                                     /* Dark Mode အတွက် စာသားကို ပိုလင်းစေရန် */
//                                     dark:prose-invert 
//                                     dark:prose-headings:text-white 
//                                     dark:prose-p:text-slate-200
//                                     transition-colors duration-300
//                                     rounded-xl border border-slate-700 
//                                     my-8 mx-auto cursor-zoom-in
//                                     dark:invert dark:brightness-90 transition-all duration-300 hover:brightness-110" 
//                                 style={{ maxHeight: '500px', objectFit: 'contain' }}
//                             />
//                         </Zoom>
//                     ),
//                     code({ node, inline, className, children, ...props }) {
//                         const match = /language-(\w+)/.exec(className || '');
//                         // inline မဟုတ်တဲ့ code block တွေအတွက် SyntaxHighlighter သုံးမယ်
//                         return !inline && match ? (
//                             <SyntaxHighlighter
//                                 style={dracula}
//                                 language={match[1]}
//                                 PreTag="div"
//                                 {...props}
//                             >
//                                 {String(children).replace(/\n$/, '')}
//                             </SyntaxHighlighter>
//                         ) : (
//                             // စာကြောင်းထဲက code (inline code) အတွက်
//                             <code className={className} {...props}>
//                                 {children}
//                             </code>
//                         );
//                     }
//                 }}
//             >
//                 {markdown}
//             </ReactMarkdown>
//         </div>
//     );
// }