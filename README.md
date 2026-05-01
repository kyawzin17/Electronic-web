# Red Dargon Electronic

> This website is created as a documentation website for Myanmar Physics students. It is built using React and Vite, with Tailwind CSS for styling. The documentation content is written in Markdown format and stored in the `public/docs` directory.

---

## Purpose of the Website (ရည်ရွယ်ချက်)
The purpose of this website is to provide documentation for Myanmar Physics students on various electronic components. 

---  

## Project Structure

```electronic-client/
├── public/
│   ├── docs/
│       ├── diodes/
│       │   └── rectifier.md
│       ├── passives/
│       │   ├── ferriteBead.md
│       │   ├── integrated-circuit.md
│       │   ├── resistor.md
│       │   └── timmer.md
│       └── transistors/
│           └── bjt.md
│
├── src/
│   ├── components/
│   │   ├── HeroCircle.jsx
│   │   ├── MarkdownView.jsx
│   │   └── Nav.jsx
│   ├── hooks/
│   │   └── useAppContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Docs.jsx
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│__ index.html
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```


## ဒီ Project မှာ အဓိက အသုံးပြုထားတဲ့ နည်းပညာများမှာ -

* Frontend: React 19 & Vite

* Styling: Tailwind CSS v4

* Router: React Router DOM v6 ( page navigation )

* Icons: FontAwesome (Solid, Brands, Regular)

* Markdown: react-markdown with remark-gfm & rehype-katex (သင်္ချာပုံသေနည်းများအတွက်)

* Highlighting: react-syntax-highlighter (Code blocks များအတွက်)

* Imaging: react-medium-image-zoom (ပုံများကို ချဲ့ကြည့်ရန်)


## 🐉 Red Dragon Electronic Documentation
မြန်မာနိုင်ငံရှိ အီလက်ထရောနစ် ဝါသနာရှင်များနှင့် လေ့လာသူများအတွက် ခေတ်မီပြီး စနစ်ကျသော Documentation စနစ်တစ်ခု ဖြစ်ပါသည်။

### ✨ Features (အဓိက ပါဝင်သော လုပ်ဆောင်ချက်များ)
* 🌓 Smart Dark/Light Mode: User ရဲ့ မျက်စိအေးချမ်းစေမည့် Custom Theme Switcher။

* 📝 Advanced Markdown Support: react-markdown ကို အသုံးပြု၍ GFM (GitHub Flavored Markdown) နှင့် သင်္ချာပုံသေနည်းများ (KaTeX) ကို ကောင်းမွန်စွာ ပြသနိုင်ခြင်း။

* 🔍 Technical Search Bar: Project များနှင့် Components များကို လျင်မြန်စွာ ရှာဖွေနိုင်သည့် Floating Search System။

* 💻 Syntax Highlighting: Arduino နှင့် Web Code များကို ဖတ်ရလွယ်ကူစေရန် react-syntax-highlighter ဖြင့် အရောင်ခွဲခြားပြသခြင်း။

* 🧭 ScrollSpy Sidebar: Documentation များ ဖတ်ရှုရာတွင် လက်ရှိရောက်ရှိနေသော အပိုင်းကို အလိုအလျောက် Highlight ပြပေးခြင်း။

* 🖼️ Image Zooming: react-medium-image-zoom ကို သုံး၍ Circuit diagrams များကို အသေးစိတ် ချဲ့ကြည့်နိုင်ခြင်း။

* 📱 Responsive Design: Tailwind CSS v4 ဖြင့် ဖုန်း၊ Tablet နှင့် PC အားလုံးတွင် ကြည့်ကောင်းအောင် ဖန်တီးထားခြင်း။

* 🏗️ Project Architecture (နည်းပညာပိုင်းဆိုင်ရာ ဖွဲ့စည်းပုံ)
ဒီ Project ကို Vite နှင့် React 19 အသုံးပြု၍ Component-based architecture ဖြင့် တည်ဆောက်ထားပါသည် -

/src/components: Navbar, Sidebar, SearchBar နှင့် Reusable UI components များ။

/src/pages: Home, Docs, About, Projects နှင့် Landing page များ။

/src/styles: Tailwind CSS configuration နှင့် Custom CSS Variables များ။

/src/data: Markdown content (.md) ဖိုင်များ။

## 🛠️ Installation & Setup 

ဒီ Project ကို သင့်ရဲ့ Local Machine မှာ Run ဖို့အတွက် အောက်ပါအဆင့်တွေကို လုပ်ဆောင်ပေးပါ။

### ၁။ Prerequisites
စက်ထဲမှာ **Node.js** (LTS version) သွင်းထားဖို့ လိုအပ်ပါတယ်။

### ၂။ Clone the Project
အရင်ဆုံး Project ကို Clone ယူပါ သို့မဟုတ် Download ဆွဲပါ။
```bash
git clone [https://github.com/kyawzin17/electronic-client.git](https://github.com/kyawzin17/electronic-client.git)
cd electronic-client  

### ၃။ Install Dependencies  
Project ရဲ့ အတွက် လိုအပ်သော အချက်အလက်များကို Install လုပ်ပါ။
```bash
npm install
``` 
### ၄။ Run the Development Server
Development Server ကို Run ပါ။
```bash
npm run dev
```
### ၅။ View the Website
브라узеріမှာ `http://localhost:5173` ကို ဖွင့်ပါ။ သင့်ရဲ့ Local မှာ ဖွင့်သော Website ကို ကြည့်ရန်ဖြစ်ပါတယ်။

### ၆။ Build for Production
Production-ready ဖြစ်အောင် Project ကို Build လုပ်ပါ။
```bash
npm run build
```
### ၇။ Preview the Production Build
Built လုပ်ထားသော Website ကို ကြည့်ရန်အတွက် အောက်ပါ Command ကို Run ပါ။
```bash
npm run preview
```
### ၈။ Deploy to Production
Built လုပ်ထားသော Website ကို သင့်ရဲ့ Production Server မှာ Deploy လုပ်ပါ။ သင့်ရဲ့ Server မှာ အောက်ပါအဆင့်တွေကို လုပ်ဆောင်ပေးပါ။
1. သင့်ရဲ့ Server မှာ **Node.js** နှင့် **npm** ကို သွင်းထားပါ။
2. Built လုပ်ထားသော Website ကို သင့်ရဲ့ Server မှာ တည်ဆောက်ပါ။
3. သင့်ရဲ့ Server မှာ Website ကို Run ပါ။
```bash
npm run start
``` 


## 🤝 Contribution
အကယ်၍ သင်သည် ဤ Project တွင် ပါဝင်ကူညီလိုပါက သို့မဟုတ် Component သစ်များ ထည့်သွင်းလိုပါက Pull Request ပို့နိုင်ပါသည်။


## image .jpg, .png တွေကို .webp သို့ ပြောင်းပါ။  

```bash  
node convert.js
```