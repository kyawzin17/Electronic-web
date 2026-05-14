// Vite ရဲ့ magic function ဖြစ်ပါတယ်။ mdx file အားလုံးကို component အနေနဲ့ သိမ်းထားပေးမယ်။
const mdxModules = import.meta.glob('../docs/**/*.mdx');

export const getMdxComponent = async (category: string, fileName: string) => {
  const path = `../docs/${category}/${fileName}.mdx`;
  if (mdxModules[path]) {
    const module: any = await mdxModules[path]();
    return module.default; // ဒါက React Component ဖြစ်ပါတယ်
  }
  return null;
};