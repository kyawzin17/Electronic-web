import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// လမ်းကြောင်း (၂) ခု သတ်မှတ်ခြင်း
const PUBLIC_DIR = path.join(__dirname, '../public');
const LEARNING_DIR = path.join(__dirname, '../src/learning');
const OUTPUT_FILE = path.join(__dirname, '../src/searchData.json');

// Folder အခွဲတွေထဲထိ ဝင်ဖတ်ပေးမယ့် Recursive Function
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function generateSearchIndex() {
  let searchIndex = [];

  // ၁။ public folder ထဲက .md / .mdx ဖိုင်များ စုဆောင်းခြင်း
  const publicFiles = getAllFiles(PUBLIC_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  publicFiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    const relativePath = path.relative(PUBLIC_DIR, filePath);
    
    // Link structure: /docs/analogIc/pwmc
    const link = '/' + relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');
    const category = relativePath.split(path.sep)[0];
    searchIndex.push({
      id: searchIndex.length + 1,
      title: data.title || path.basename(filePath, path.extname(filePath)),
      tags: data.tags || '',
      category: category,
      link: link
    });
  });

  // ၂။ src/learning folder ထဲက Chapter ဖိုင်များ စုဆောင်းခြင်း
  const learningFiles = getAllFiles(LEARNING_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  learningFiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    const relativePath = path.relative(LEARNING_DIR, filePath);
    
    // Link structure: /learning/Chapter-1/capacitor
    const link = '/learning/' + relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');

    searchIndex.push({
      id: searchIndex.length + 1,
      title: data.title || path.basename(filePath, path.extname(filePath)),
      tags: data.tags || '',
      category: 'learning',
      link: link
    });
  });

  // JSON ဖိုင်အဖြစ် ထုတ်ပေးခြင်း
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2));
  console.log('✅ Search Index Generated successfully for both Public & Learning folders!');
}

generateSearchIndex();