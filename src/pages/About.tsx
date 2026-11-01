import AboutInformation from "../abouts/AboutInformation";
import profile from "../../public/assets/profile.webp";
import { useAppContext } from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "../homes/LanguageToogle";
import CircuitSimulatorGuide from "../abouts/CircuitSimulatorGuide";

const pageContent = {
  EN: {
    badge: "Red Dragon Electronic ⚡",
    title: "Empowering Myanmar’s Makers, One Circuit at a Time!",
    subtitle: "Master electronics with high-quality Burmese documentation, hands-on DIY projects, and interactive circuit simulations you can run right in your browser.",
    startLearning: "Start Learning",
    browseProjects: "Browse Projects",
    aboutTitle: "About Red Dragon Electronics",
    aboutDescription: "We bring practical and easy-to-follow electronics learning resources together in one place for everyone taking their first steps into the world of electronics.",
    founded: "Founded",
    components: "Components Documented",
    free: "Free & Open Source",
    makerTitle: "Meet the Maker",
    makerQuote: "“Technology is best when it brings people together and helps them create.”",
    makerDescription: "I'm Kyaw Zin Win, a junior web developer and electronics enthusiast. I enjoy turning complex technical topics into simple, accessible documentation so more people can learn and build.",
  },
  MM: {
    badge: "Red Dragon အီလက်ထရောနစ် ⚡",
    title: "မြန်မာ့နည်းပညာရှင်သစ်များအတွက် အီလက်ထရောနစ် သင်ယူမှု ပလက်ဖောင်း!",
    subtitle: "မြန်မာဘာသာဖြင့် ရေးသားထားသော သင်ခန်းစာများ၊ လက်တွေ့ DIY Project များနှင့် Browser ထဲမှာတင် စမ်းသပ်နိုင်သော Circuit Simulator တို့ဖြင့် အီလက်ထရောနစ်ပညာကို လေ့လာလိုက်ပါ။",
    startLearning: "စတင်လေ့လာရန်",
    browseProjects: "ပရောဂျက်များကြည့်ရန်",
    aboutTitle: "Red Dragon Electronics အကြောင်း",
    aboutDescription: "အီလက်ထရောနစ်လောကထဲသို့ စတင်ဝင်ရောက်လေ့လာသူတိုင်းအတွက် စနစ်ကျပြီး လက်တွေ့အသုံးချနိုင်သော သင်ခန်းစာများနှင့် လမ်းညွှန်ချက်များကို တစ်နေရာတည်းတွင် စုစည်းပေးထားပါသည်။",
    founded: "စတင်တည်ထောင်သည့်နှစ်",
    components: "မှတ်တမ်းပြုစုထားသော Components",
    free: "အခမဲ့နှင့် Open Source",
    makerTitle: "ဖန်တီးသူနှင့် မိတ်ဆက်ခြင်း",
    makerQuote: "“နည်းပညာဆိုတာ လူတွေကို ပေါင်းစည်းပေးပြီး ဖန်တီးနိုင်စွမ်းကို မြှင့်တင်ပေးတဲ့အခါ အကောင်းဆုံးဖြစ်ပါတယ်။”",
    makerDescription: "ကျွန်တော် ကျော်ဇင်ဝင်းပါ။ Junior Web Developer တစ်ယောက်ဖြစ်သလို Electronics ဝါသနာရှင်တစ်ယောက်လည်း ဖြစ်ပါတယ်။ ရှုပ်ထွေးတဲ့ နည်းပညာအကြောင်းအရာတွေကို လူတိုင်းနားလည်လွယ်တဲ့ Documentation တွေအဖြစ် ပြောင်းလဲပေးရတာကို နှစ်သက်ပါတယ်။",
  },
} as const;

export default function About() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const content = language === "EN" ? pageContent.EN : pageContent.MM;

  return (
    <main className="min-h-screen w-full overflow-hidden bg-bg text-text-main">
      <div className="relative z-30 h-12">
        <LanguageToggle />
      </div>

      <CircuitSimulatorGuide />

      <section className="relative flex w-full flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="pointer-events-none absolute left-[20%] top-16 hidden h-4 w-4 rotate-45 border border-cyan-500/50 sm:block" />
        <div className="pointer-events-none absolute right-[12%] top-1/2 hidden h-3 w-3 rounded-full bg-purple-500/50 sm:block" />
        <div className="pointer-events-none absolute bottom-16 left-1/4 hidden h-1 w-5 -rotate-12 bg-cyan-400/50 sm:block" />
        <wokwi-led className="pointer-events-none absolute bottom-16 right-[12%] -rotate-12" color="red" value={true} />
        <wokwi-resistor className="pointer-events-none absolute left-[20%] top-16 -rotate-12" />

        <div className="mx-auto flex w-full max-w-5xl justify-center">
          <div className="flex w-full flex-col items-center gap-3 rounded-lg px-3 py-5 text-center">
            <span className="mb-1 w-fit rounded-lg border-2 border-primary px-3 py-1 text-xs text-text-main sm:text-sm">{content.badge}</span>
            <h1 className={`bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text font-serif text-3xl font-bold leading-tight text-transparent drop-shadow-sm sm:text-4xl md:text-5xl ${language === "MM" ? "leading-mm-relaxed" : ""}`}>
              {content.title}
            </h1>
            <p className={`mb-2 max-w-3xl text-sm text-text-muted sm:text-base ${language === "MM" ? "leading-mm-relaxed" : "leading-7"}`}>
              {content.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3 p-2 sm:gap-5">
              <button
                type="button"
                onClick={() => navigate("/docs/learning")}
                className="cursor-pointer rounded-lg bg-linear-to-r from-(--primary) to-(--secondary) px-4 py-2 text-sm text-bg shadow transition hover:shadow-[0_0_10px_var(--primary)] sm:text-base"
              >
                {content.startLearning}
              </button>
              <button
                type="button"
                onClick={() => navigate("/project")}
                className="cursor-pointer rounded-lg border border-(--secondary) px-4 py-2 text-sm text-(--secondary) shadow transition hover:shadow-[0_0_8px_var(--secondary)] sm:text-base"
              >
                {content.browseProjects}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-16 py-10 md:space-y-24 md:py-12">
        <div className="space-y-12 px-4 sm:px-6">
          <section className="mx-auto max-w-3xl space-y-4 text-center sm:text-left">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary">OUR STORY</p>
            <h2 className="text-2xl font-bold text-text-main sm:text-3xl">
              {content.aboutTitle}
            </h2>
            <p className={`mx-auto max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg ${language === "MM" ? "leading-mm-relaxed" : ""}`}>
              {content.aboutDescription}
            </p>
          </section>

          <section className="grid gap-5 text-center sm:grid-cols-3" aria-label="Project statistics">
            <div className="rounded-2xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary">
              <h3 className="text-3xl font-bold text-primary">2026</h3>
              <p className="mt-2 text-sm text-text-secondary">{content.founded}</p>
            </div>
            <div className="rounded-2xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-secondary">
              <h3 className="text-3xl font-bold text-secondary">100+</h3>
              <p className="mt-2 text-sm text-text-secondary">{content.components}</p>
            </div>
            <div className="rounded-2xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent">
              <h3 className="text-3xl font-bold text-accent">100%</h3>
              <p className="mt-2 text-sm text-text-secondary">{content.free}</p>
            </div>
          </section>
        </div>

        <AboutInformation />

        <CircuitSimulatorGuide />

        <section className="mx-4 flex flex-col items-center gap-8 rounded-3xl border-2 border-border bg-linear-to-br from-soft to-card p-6 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/20 sm:mx-6 sm:flex-row sm:p-8">
          <div className="h-40 w-40 shrink-0 overflow-hidden rounded-full shadow-xl sm:h-48 sm:w-48 sm:rounded-2xl">
            <img src={profile} alt="Project creator portrait" className="h-full w-full rounded-full bg-transparent object-cover sm:rounded-2xl" />
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{content.makerTitle}</h2>
            <p className="text-text-secondary italic">{content.makerQuote}</p>
            <p className={`text-text-muted ${language === "MM" ? "leading-mm-relaxed" : "leading-7"}`}>
              {content.makerDescription}
            </p>
          </div>
        </section>

        <div className="flex w-full justify-end px-6 pb-6">
          <div className="flex items-end gap-px">
            <h2 className="border-2 border-dotted border-border bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-3xl font-bold text-transparent md:text-4xl">RD</h2>
            <p className="font-serif text-base text-text-main">electronic!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
