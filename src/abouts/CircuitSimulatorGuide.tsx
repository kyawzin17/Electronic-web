import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

type GuideSection = {
  id: string;
  number: string;
  title: string;
  description: string;
  steps: string[];
  screenshot: string;
};

const guideContent = {
  EN: {
    eyebrow: "RDE CIRCUIT SIMULATOR",
    title: "Circuit Simulator User Guide",
    subtitle: "A practical walkthrough to help you build, connect, code, and test your first electronic circuit.",
    start: "Start with the workspace",
    overview: "In this guide",
    noteTitle: "Before you begin",
    note: "The simulator interface and available components may change as RDE is updated. Follow the controls currently shown in your workspace.",
    previous: "Previous",
    next: "Next",
    finish: "You reached the end",
    sections: [
      { id: "workspace", number: "01", title: "Workspace Overview", description: "Get familiar with the simulator workspace before building a circuit.", steps: ["Open Circuit Simulator from the website navigation.", "Identify the canvas, component panel, properties panel, and code or simulation controls.", "Use the canvas as your main area to place and arrange components."], screenshot: "Add your workspace screenshot here" },
      { id: "components", number: "02", title: "Adding Components", description: "Choose the electronic parts required for your project.", steps: ["Open the Components panel.", "Find the component you need and add it to the canvas.", "Move components into a clear layout so their pins are easy to access."], screenshot: "Add your components panel screenshot here" },
      { id: "wiring", number: "03", title: "Connecting Wires", description: "Create connections between component pins to form a circuit.", steps: ["Locate the pin where the connection should begin.", "Start a wire from that pin and connect it to the target pin.", "Review each connection and make sure the circuit matches your intended design."], screenshot: "Add your wire connection screenshot here" },
      { id: "properties", number: "04", title: "Editing Properties", description: "Configure component values and options when they are available.", steps: ["Select a component on the canvas.", "Open or review its Properties panel.", "Change the available values and confirm that the displayed component updates as expected."], screenshot: "Add your properties panel screenshot here" },
      { id: "code", number: "05", title: "Writing Code", description: "Use the code editor for projects that require microcontroller code.", steps: ["Select the supported microcontroller in your circuit.", "Open the code editor and review the starter code.", "Write or update your program, then check the selected board and required libraries."], screenshot: "Add your code editor screenshot here" },
      { id: "simulation", number: "06", title: "Compile and Simulate", description: "Check your circuit and run the available simulation workflow.", steps: ["Review component wiring and power connections first.", "Use the Compile or Run controls available in the simulator.", "Read any compiler or simulation messages and fix reported issues before trying again."], screenshot: "Add your simulation controls screenshot here" },
      { id: "projects", number: "07", title: "Saving Projects", description: "Keep a copy of your circuit so you can continue working later.", steps: ["Use the simulator's Save Project action when you are ready.", "Give the project a clear name if prompted.", "Open the saved project from the projects area when you want to continue. Save manually after important changes."], screenshot: "Add your project save screenshot here" },
      { id: "troubleshooting", number: "08", title: "Tips and Troubleshooting", description: "A few checks can help you find common circuit and workflow mistakes.", steps: ["Check that wires connect to the intended pins.", "Confirm power, ground, and component orientation.", "Read compile errors carefully and check board or library settings.", "Save your work manually after making important changes."], screenshot: "Add a troubleshooting screenshot here" },
    ] as GuideSection[],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      ["Does the simulator save automatically?", "Do not rely on automatic saving. Use Save Project manually after important changes."],
      ["Why does my circuit not run?", "Check the wiring, power and ground connections, selected board, code, and any messages shown by the simulator."],
      ["Can I use every component in every project?", "Component behavior and supported features can differ. Check the component documentation and test your circuit."],
    ],
    footer: "Build carefully. Learn by experimenting. Share what you create.",
  },
  MM: {
    eyebrow: "RDE CIRCUIT SIMULATOR",
    title: "Circuit Simulator အသုံးပြုနည်း",
    subtitle: "ကိုယ်ပိုင် Electronic Circuit တစ်ခုကို တည်ဆောက်ခြင်း၊ ကြိုးချိတ်ဆက်ခြင်း၊ Code ရေးသားခြင်းနဲ့ စမ်းသပ်ခြင်းတို့ကို အဆင့်လိုက် လေ့လာနိုင်ပါတယ်။",
    start: "Workspace မှ စတင်လေ့လာရန်",
    overview: "ဒီလမ်းညွှန်မှာ ပါဝင်တာများ",
    noteTitle: "မစတင်မီ သိထားရန်",
    note: "RDE ကို update လုပ်သည့်အခါ Simulator ရဲ့ UI နဲ့ အသုံးပြုနိုင်တဲ့ Components တွေ ပြောင်းလဲနိုင်ပါတယ်။ လက်ရှိ Workspace မှာ ပြသထားတဲ့ Controls တွေကို အခြေခံပြီး လုပ်ဆောင်ပါ။",
    previous: "ရှေ့အဆင့်",
    next: "နောက်အဆင့်",
    finish: "လမ်းညွှန်ပြီးဆုံးပါပြီ",
    sections: [
      { id: "workspace", number: "01", title: "Workspace ကို သိကျွမ်းခြင်း", description: "Circuit မတည်ဆောက်ခင် Simulator ရဲ့ အဓိကနေရာတွေကို အရင်လေ့လာပါ။", steps: ["Website Navigation မှ Circuit Simulator ကို ဖွင့်ပါ။", "Canvas၊ Components Panel၊ Properties Panel နဲ့ Code/Simulation Controls တွေကို ရှာဖွေပါ။", "Canvas ကို Components တွေ ထည့်သွင်းပြီး နေရာချထားဖို့ အဓိကနေရာအဖြစ် အသုံးပြုပါ။"], screenshot: "Workspace Screenshot ထည့်ရန်" },
      { id: "components", number: "02", title: "Components ထည့်သွင်းခြင်း", description: "ကိုယ်တည်ဆောက်မယ့် Project အတွက် လိုအပ်တဲ့ Electronic Parts တွေကို ရွေးချယ်ပါ။", steps: ["Components Panel ကို ဖွင့်ပါ။", "လိုအပ်တဲ့ Component ကို ရှာပြီး Canvas ထဲ ထည့်ပါ။", "Pin တွေကို အလွယ်တကူ ချိတ်ဆက်နိုင်ဖို့ Components တွေကို စနစ်တကျ နေရာချပါ။"], screenshot: "Components Panel Screenshot ထည့်ရန်" },
      { id: "wiring", number: "03", title: "Wire ချိတ်ဆက်ခြင်း", description: "Circuit တစ်ခု ဖြစ်လာဖို့ Component Pin တွေကြား Connection ပြုလုပ်ပါ။", steps: ["စတင်ချိတ်ဆက်မယ့် Pin ကို ရှာပါ။", "အဲဒီ Pin ကနေ Wire စတင်ပြီး ချိတ်ဆက်လိုတဲ့ Pin ဆီ ဆက်ပါ။", "Connection တစ်ခုချင်းစီကို ပြန်စစ်ပြီး ကိုယ်လိုချင်တဲ့ Circuit Design နဲ့ ကိုက်ညီမှုရှိမရှိ စစ်ဆေးပါ။"], screenshot: "Wire Connection Screenshot ထည့်ရန်" },
      { id: "properties", number: "04", title: "Properties ပြင်ဆင်ခြင်း", description: "အသုံးပြုနိုင်တဲ့ Component Value နဲ့ Options တွေကို လိုအပ်သလို ပြင်ဆင်ပါ။", steps: ["Canvas ပေါ်က Component ကို ရွေးပါ။", "Properties Panel ကို ဖွင့်ပြီး ပြသထားတဲ့ Options တွေကို ကြည့်ပါ။", "ရရှိနိုင်တဲ့ Value တွေကို ပြင်ဆင်ပြီး Component မှာ ပြောင်းလဲမှုရှိမရှိ စစ်ဆေးပါ။"], screenshot: "Properties Panel Screenshot ထည့်ရန်" },
      { id: "code", number: "05", title: "Code ရေးသားခြင်း", description: "Microcontroller အသုံးပြုတဲ့ Project တွေအတွက် Code Editor ကို အသုံးပြုပါ။", steps: ["Circuit ထဲမှာ အသုံးပြုထားတဲ့ Supported Microcontroller ကို ရွေးချယ်ပါ။", "Code Editor ကို ဖွင့်ပြီး Starter Code ကို လေ့လာပါ။", "Program ကို ရေးသား/ပြင်ဆင်ပြီး ရွေးချယ်ထားတဲ့ Board နဲ့ လိုအပ်တဲ့ Libraries တွေကို စစ်ဆေးပါ။"], screenshot: "Code Editor Screenshot ထည့်ရန်" },
      { id: "simulation", number: "06", title: "Compile နှင့် Simulation", description: "Circuit ကို စစ်ဆေးပြီး ရရှိနိုင်တဲ့ Simulation Workflow နဲ့ စမ်းသပ်ပါ။", steps: ["အရင်ဆုံး Wiring၊ Power နဲ့ Ground Connection တွေကို စစ်ဆေးပါ။", "Simulator မှာ ရရှိနိုင်တဲ့ Compile သို့မဟုတ် Run Control ကို အသုံးပြုပါ။", "Compiler သို့မဟုတ် Simulation က ပြသတဲ့ Message တွေကို ဖတ်ပြီး Error ရှိရင် ပြင်ဆင်ကာ ပြန်စမ်းပါ။"], screenshot: "Simulation Controls Screenshot ထည့်ရန်" },
      { id: "projects", number: "07", title: "Project သိမ်းဆည်းခြင်း", description: "နောက်တစ်ကြိမ်မှာ ဆက်လက်လုပ်ဆောင်နိုင်ဖို့ ကိုယ့် Circuit ကို သိမ်းထားပါ။", steps: ["အဆင်သင့်ဖြစ်တဲ့အခါ Simulator ရဲ့ Save Project ကို အသုံးပြုပါ။", "အမည်တောင်းလာပါက မှတ်မိလွယ်တဲ့ Project Name ပေးပါ။", "ဆက်လက်လုပ်ဆောင်လိုတဲ့အခါ Projects နေရာမှ ပြန်ဖွင့်ပါ။ အရေးကြီးတဲ့ ပြောင်းလဲမှုတိုင်းပြီးနောက် ကိုယ်တိုင် Save လုပ်ပါ။"], screenshot: "Project Save Screenshot ထည့်ရန်" },
      { id: "troubleshooting", number: "08", title: "အမှားရှာဖွေခြင်းနှင့် အကြံပြုချက်များ", description: "Circuit နဲ့ Workflow မှာ ဖြစ်တတ်တဲ့ ပြဿနာတွေကို အခြေခံအချက်တွေကနေ စစ်ဆေးနိုင်ပါတယ်။", steps: ["Wire တွေက မှန်ကန်တဲ့ Pin တွေမှာ ချိတ်ထားခြင်းရှိမရှိ စစ်ပါ။", "Power၊ Ground နဲ့ Component Orientation ကို စစ်ဆေးပါ။", "Compile Error တွေကို သေချာဖတ်ပြီး Board သို့မဟုတ် Library Setting တွေကို စစ်ပါ။", "အရေးကြီးတဲ့ ပြောင်းလဲမှုတွေ ပြုလုပ်ပြီးတိုင်း ကိုယ်တိုင် Save လုပ်ပါ။"], screenshot: "Troubleshooting Screenshot ထည့်ရန်" },
    ] as GuideSection[],
    faqTitle: "မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ",
    faqs: [
      ["Simulator က အလိုအလျောက် Save လုပ်ပေးသလား။", "Auto Save ကို အားမကိုးပါနဲ့။ အရေးကြီးတဲ့ ပြောင်းလဲမှုတွေ ပြုလုပ်ပြီးတိုင်း Save Project ကို ကိုယ်တိုင် အသုံးပြုပါ။"],
      ["Circuit က ဘာကြောင့် Run မဖြစ်တာလဲ။", "Wiring၊ Power/Ground Connection၊ ရွေးချယ်ထားတဲ့ Board၊ Code နဲ့ Simulator က ပြသထားတဲ့ Message တွေကို စစ်ဆေးပါ။"],
      ["Component အားလုံးကို Project တိုင်းမှာ သုံးလို့ရသလား။", "Component တစ်ခုချင်းစီရဲ့ Behavior နဲ့ Supported Features တွေ ကွာခြားနိုင်ပါတယ်။ သက်ဆိုင်ရာ Documentation ကိုဖတ်ပြီး စမ်းသပ်ပါ။"],
    ],
    footer: "သေချာတည်ဆောက်ပါ။ လက်တွေ့စမ်းသပ်ရင်း လေ့လာပါ။ ကိုယ်ဖန်တီးထားတာတွေကို မျှဝေပါ။",
  },
} as const;

export default function CircuitSimulatorGuide() {
  const { language } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const content = language === "EN" ? guideContent.EN : guideContent.MM;
  const active = content.sections[activeIndex];
  const progress = Math.round((completed.length / content.sections.length) * 100);

  const toggleComplete = (id: string) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <section id="circuit-user-guide" className="relative isolate overflow-hidden border-y border-border bg-bg px-4 py-14 text-text-main sm:px-6 md:py-20">
      <div className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            {content.eyebrow}
          </span>
          <h2 className="mt-5 bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-4xl md:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
            {content.subtitle}
          </p>
          <a href="/circuit" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-(--primary) to-(--secondary) px-5 py-3 text-sm font-bold text-bg shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:shadow-primary/30">
            {content.start} <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold">{content.overview}</h3>
              <span className="text-xs tabular-nums text-primary">{progress}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-linear-to-r from-(--primary) to-(--secondary) transition-all" style={{ width: `${progress}%` }} />
            </div>
            <nav className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1" aria-label="Guide sections">
              {content.sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs transition sm:text-sm ${activeIndex === index ? "border-primary/60 bg-primary/10 text-primary" : "border-transparent text-text-muted hover:border-border hover:bg-soft"}`}
                >
                  <span className="shrink-0 font-mono text-[10px] opacity-70">{section.number}</span>
                  <span className="min-w-0 flex-1 truncate">{section.title}</span>
                  {completed.includes(section.id) && <span className="text-primary" aria-label="Completed">✓</span>}
                </button>
              ))}
            </nav>
            <div className="mt-5 rounded-xl border border-secondary/20 bg-secondary/5 p-3">
              <p className="text-xs font-bold text-secondary">{content.noteTitle}</p>
              <p className="mt-1 text-xs leading-6 text-text-muted">{content.note}</p>
            </div>
          </aside>

          <article className="min-w-0 rounded-2xl border border-border bg-card/80 p-4 shadow-xl shadow-black/5 sm:p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-primary">GUIDE / {active.number}</span>
              <span className="text-xs text-text-muted">{activeIndex + 1} / {content.sections.length}</span>
            </div>
            <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">{active.title}</h3>
            <p className="mt-2 text-sm leading-7 text-text-muted sm:text-base">{active.description}</p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-bg/70">
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 px-5 py-8 text-center sm:min-h-64">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-xl text-primary">▧</div>
                <p className="text-sm font-semibold text-text-main">{active.screenshot}</p>
                <p className="max-w-sm text-xs leading-5 text-text-muted">{language === "EN" ? "Replace this placeholder with the matching screenshot from your simulator UI." : "ဒီနေရာတွင် သက်ဆိုင်ရာ Simulator Screenshot ကို ထည့်သွင်းပါ။"}</p>
              </div>
            </div>

            <ol className="mt-7 space-y-4">
              {active.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                  <p className="pt-0.5 text-sm leading-7 text-text-secondary">{step}</p>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => toggleComplete(active.id)}
              className={`mt-7 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${completed.includes(active.id) ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-text-muted hover:border-primary/50 hover:text-primary"}`}
            >
              <span>{completed.includes(active.id) ? "✓" : "○"}</span>
              {completed.includes(active.id) ? (language === "EN" ? "Completed" : "ပြီးဆုံးပါပြီ") : (language === "EN" ? "Mark as complete" : "လေ့လာပြီးကြောင်း မှတ်သားရန်")}
            </button>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
              <button type="button" disabled={activeIndex === 0} onClick={() => setActiveIndex((i) => Math.max(0, i - 1))} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-text-muted transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30">
                ← {content.previous}
              </button>
              {activeIndex < content.sections.length - 1 ? (
                <button type="button" onClick={() => setActiveIndex((i) => Math.min(content.sections.length - 1, i + 1))} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-bg transition hover:brightness-110">
                  {content.next} →
                </button>
              ) : (
                <span className="text-xs font-semibold text-primary">{content.finish} ✓</span>
              )}
            </div>
          </article>
        </div>

        <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-card/70 p-5 sm:p-7">
          <h3 className="text-xl font-extrabold">{content.faqTitle}</h3>
          <div className="mt-4 divide-y divide-border">
            {content.faqs.map(([question, answer], index) => (
              <div key={question} className="py-3">
                <button type="button" onClick={() => setOpenFaq((current) => current === index ? null : index)} className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold">
                  <span>{question}</span>
                  <span className="text-lg text-primary">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && <p className="mt-2 pr-7 text-sm leading-7 text-text-muted">{answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-xs leading-6 text-text-muted">{content.footer}</p>
      </div>
    </section>
  );
}
