import ReactMarkdown from "react-markdown"; // d ကို အသေးပြောင်းထားတယ်
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import { Link } from "react-router-dom";


import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css"; // CSS မပါရင် zoom effect အလုပ်မလုပ်ပါဘူး

export default function MarkdownView({ markdown }: { markdown: string }) {

    const renderH3 = ({ children }: { children: React.ReactNode }) => {
        const title = Array.isArray(children) ? children[0] : children;
        const id = typeof title === 'string'
            ? title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            : '';

        return (
            <h3
                id={id}
                className="scroll-mt-24 mb-4 font-bold text-text-main/90 font-padauk"
            >
                {children}
            </h3>
        );
    };

    return (
        <div className="w-full h-auto px-4 py-6 overflow-x-hidden
            prose lg:prose-lg max-w-none prose-slate
            prose-headings:text-slate-900
            prose-p:text-slate-800
            prose-li:text-slate-800
            prose-strong:text-slate-900
            dark:prose-invert
            dark:prose-headings:text-white
            dark:prose-p:text-slate-200
            dark:prose-li:text-slate-200
            dark:prose-strong:text-slate-100
            transition-colors duration-300">
            {!markdown
             ?
             <div className="text-center text-slate-500">No content available</div> 
             :
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    h3: renderH3 as any,
                    p: ({ children }: any) => {
                        const hasImage = Array.isArray(children)
                            ? children.some((child: any) => child?.type && (child.type.name === 'img' || child.type === 'img'))
                            : (children as any)?.type && ((children as any).type.name === 'img' || (children as any).type === 'img');

                        if (hasImage) return <div className="my-8 flex justify-center">{children}</div>;
                        return <p className="mb-4 text-base lg:text-lg text-text-main/80 font-medium font-padauk leading-mm-relaxed line-height-2">{children}</p>;
                    },
                    img: ({ node, ...props }: any) => (
                        <Zoom>
                            <img
                                {...props}
                                className="rounded-xl border border-slate-300 dark:border-slate-700 my-4 mx-auto cursor-zoom-in transition-all duration-300 hover:brightness-110"
                                style={{ maxHeight: '500px', objectFit: 'contain' }}
                            />
                        </Zoom>
                    ),
                    a: ({ href = "", children, ...props }) => {
                        const isInternal =
                            href.startsWith("/") &&
                            !href.startsWith("//");

                        if (isInternal) {
                            return (
                            <Link to={href} {...props}>
                                {children}
                            </Link>
                            );
                        }

                        return (
                            <a
                            href={href}
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            {children}
                            </a>
                        )},
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <div className="markdown-code-block w-full overflow-x-auto">
                                <SyntaxHighlighter
                                    style={dracula}
                                    language={match[1]}
                                    PreTag="pre"
                                    showLineNumbers
                                    wrapLongLines={false}
                                    customStyle={{
                                        display: 'block',
                                        margin: '0',
                                        overflowX: 'auto',
                                        whiteSpace: 'pre',
                                    }}
                                    codeTagProps={{
                                        style: {
                                            display: 'block',
                                            whiteSpace: 'pre',
                                        },
                                    }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
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
            }
        </div>
    );
}
