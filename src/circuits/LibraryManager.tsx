import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Download,
  ExternalLink,
  Package,
  Plus,
  Search,
  X,
} from "lucide-react";

type Library = {
  id: string;
  name: string;
  description: string;
  author: string;
  category: "Display" | "Sensor" | "Input" | "LED" | "Time" | "Core";
  include: string;
  repository?: string;
  branch?: string;
  note: string;
};

const LIBRARIES: Library[] = [
  {
    id: "liquidcrystal-i2c",
    name: "LiquidCrystal I2C",
    description: "Control character LCDs such as 16×2 and 20×4 over I²C.",
    author: "Frank de Brabander",
    category: "Display",
    include: "#include <LiquidCrystal_I2C.h>",
    repository: "fdebrabander/Arduino-LiquidCrystal-I2C-library",
    branch: "master",
    note: "Useful for I²C LCD modules; check the library's address and constructor for your display.",
  },
  {
    id: "adafruit-ssd1306",
    name: "Adafruit SSD1306",
    description: "Driver for SSD1306 monochrome OLED displays.",
    author: "Adafruit",
    category: "Display",
    include: "#include <Adafruit_SSD1306.h>",
    repository: "adafruit/Adafruit_SSD1306",
    branch: "master",
    note: "Usually used together with Adafruit GFX Library.",
  },
  {
    id: "adafruit-gfx",
    name: "Adafruit GFX Library",
    description: "Shared drawing primitives for supported displays.",
    author: "Adafruit",
    category: "Display",
    include: "#include <Adafruit_GFX.h>",
    repository: "adafruit/Adafruit-GFX-Library",
    branch: "master",
    note: "A dependency for several Adafruit display libraries.",
  },
  {
    id: "dht-sensor",
    name: "DHT sensor library",
    description: "Read temperature and humidity from DHT11 and DHT22 sensors.",
    author: "Adafruit",
    category: "Sensor",
    include: "#include <DHT.h>",
    repository: "adafruit/DHT-sensor-library",
    branch: "master",
    note: "Requires Adafruit Unified Sensor in many setups.",
  },
  {
    id: "keypad",
    name: "Keypad",
    description: "Scan matrix keypads such as 4×4 and 4×3 keypads.",
    author: "Mark Stanley / Alexander Brevig",
    category: "Input",
    include: "#include <Keypad.h>",
    repository: "Chris--A/Keypad",
    branch: "master",
    note: "Configure the row and column pin arrays to match your wiring.",
  },
  {
    id: "fastled",
    name: "FastLED",
    description: "Animation and color control for addressable LED strips.",
    author: "FastLED community",
    category: "LED",
    include: "#include <FastLED.h>",
    repository: "FastLED/FastLED",
    branch: "master",
    note: "Hardware and chipset support depends on the target board.",
  },
  {
    id: "irremote",
    name: "Arduino-IRremote",
    description: "Receive and send common infrared remote-control protocols.",
    author: "Arduino-IRremote contributors",
    category: "Input",
    include: "#include <IRremote.hpp>",
    repository: "Arduino-IRremote/Arduino-IRremote",
    branch: "master",
    note: "Recent versions use IRremote.hpp; older tutorials may use a different API.",
  },
  {
    id: "rtclib",
    name: "RTClib",
    description: "Date and time helpers for RTC modules such as DS1307 and DS3231.",
    author: "Adafruit",
    category: "Time",
    include: "#include <RTClib.h>",
    repository: "adafruit/RTClib",
    branch: "master",
    note: "Often used with the Wire library and an RTC module.",
  },
  {
    id: "wire",
    name: "Wire (I²C)",
    description: "Arduino core I²C communication library.",
    author: "Arduino",
    category: "Core",
    include: "#include <Wire.h>",
    note: "Included with supported Arduino cores; no separate ZIP download is needed.",
  },
];

const CATEGORIES = ["All", "Display", "Sensor", "Input", "LED", "Time", "Core"] as const;

type Props = {
  onClose: () => void;
  code: string;
  onCodeChange: (code: string) => void;
};

export default function LibraryManager({ onClose, code, onCodeChange }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [added, setAdded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("liquidcrystal-i2c");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return LIBRARIES.filter((library) => {
      const matchesCategory = category === "All" || library.category === category;
      const matchesQuery =
        !normalized ||
        [library.name, library.description, library.author, library.category]
          .some((value) => value.toLowerCase().includes(normalized));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const activeLibrary =
    LIBRARIES.find((library) => library.id === selected) ?? filtered[0];

  const addInclude = (library: Library) => {
    const includeLine = library.include;
    const alreadyExists = code
      .split("\n")
      .some((line) => line.trim() === includeLine);
    if (!alreadyExists) {
      onCodeChange(code.trim() ? `${includeLine}\n${code}` : `${includeLine}\n`);
    }
    setAdded((current) => current.includes(library.id) ? current : [...current, library.id]);
  };

  const downloadUrl = (library: Library) =>
    library.repository
      ? `https://github.com/${library.repository}/archive/refs/heads/${library.branch ?? "master"}.zip`
      : undefined;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="library-manager-title">
      <section className="flex max-h-[min(760px,92vh)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#080E1D] text-slate-100 shadow-[0_0_60px_rgba(0,209,255,0.12)]">
        <header className="flex items-center justify-between gap-4 border-b border-slate-700/80 bg-gradient-to-r from-[#101B35] to-[#15102C] px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
              <Package size={22} />
            </div>
            <div className="min-w-0">
              <h2 id="library-manager-title" className="text-base font-semibold sm:text-lg">Arduino Library Manager</h2>
              <p className="mt-0.5 text-xs text-slate-400">Find libraries · add includes · download ZIP packages</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close library manager" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
            <X size={20} />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(250px,0.78fr)]">
          <div className="flex min-h-0 flex-col border-b border-slate-700/80 md:border-b-0 md:border-r">
            <div className="space-y-3 p-4 sm:p-5">
              <label className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-3 focus-within:border-cyan-400/70">
                <Search size={17} className="shrink-0 text-slate-500" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search libraries, sensors, displays..." className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
                {query && <button type="button" onClick={() => setQuery("")} className="text-slate-500 hover:text-white" aria-label="Clear search"><X size={15} /></button>}
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {CATEGORIES.map((item) => (
                  <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition ${category === item ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200" : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"}`}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{filtered.length} libraries</span>
                <span>{added.length} include{added.length === 1 ? "" : "s"} added to sketch</span>
              </div>
            </div>

            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-4 sm:px-5">
              {filtered.map((library) => (
                <button key={library.id} type="button" onClick={() => setSelected(library.id)} className={`w-full rounded-xl border p-3 text-left transition ${activeLibrary?.id === library.id ? "border-cyan-300/50 bg-cyan-300/[0.07] shadow-[inset_0_0_0_1px_rgba(34,211,238,0.05)]" : "border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activeLibrary?.id === library.id ? "bg-cyan-300/10 text-cyan-200" : "bg-slate-800 text-slate-400"}`}>
                      <BookOpen size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-slate-100">{library.name}</span>
                        {added.includes(library.id) && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300"><Check size={11} /> Added</span>}
                        {!library.repository && <span className="rounded-full bg-violet-400/10 px-2 py-0.5 text-[10px] text-violet-200">Built-in</span>}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{library.description}</p>
                      <div className="mt-2 text-[10px] text-slate-500">{library.category} · {library.author}</div>
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && <div className="rounded-xl border border-dashed border-slate-700 px-4 py-10 text-center text-sm text-slate-500">No libraries match your search.</div>}
            </div>
          </div>

          <aside className="flex min-h-0 flex-col overflow-y-auto p-4 sm:p-5">
            {activeLibrary ? (
              <>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-300/20 bg-violet-300/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-violet-200">
                      <Package size={12} /> {activeLibrary.category} library
                    </div>
                    <h3 className="text-lg font-semibold leading-snug">{activeLibrary.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">Maintainer: {activeLibrary.author}</p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-slate-300">{activeLibrary.description}</p>
                <div className="mt-5 rounded-xl border border-slate-700 bg-black/25 p-3">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Include directive</div>
                  <code className="break-all font-mono text-xs text-cyan-200">{activeLibrary.include}</code>
                  <button type="button" onClick={() => addInclude(activeLibrary)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500/15 to-violet-500/15 px-3 py-2.5 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-300/25 transition hover:from-cyan-500/25 hover:to-violet-500/25">
                    {added.includes(activeLibrary.id) ? <Check size={15} /> : <Plus size={15} />}
                    {added.includes(activeLibrary.id) ? "Include added to sketch" : "Add include to code"}
                  </button>
                </div>
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <div className="mb-1 text-xs font-semibold text-slate-200">Compatibility note</div>
                  <p className="text-xs leading-5 text-slate-400">{activeLibrary.note}</p>
                </div>
                <div className="mt-auto pt-5">
                  {downloadUrl(activeLibrary) ? (
                    <a href={downloadUrl(activeLibrary)} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:brightness-110">
                      <Download size={17} /> Download library ZIP <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-violet-300/20 bg-violet-300/10 px-4 py-3 text-sm font-medium text-violet-200">
                      <Check size={16} /> Included with Arduino core
                    </div>
                  )}
                  <p className="mt-3 text-[10px] leading-4 text-slate-500">
                    ZIP downloads open from the library's GitHub repository. Adding an include only edits this sketch; it does not install the library into the online simulator compiler.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-center text-sm text-slate-500">Choose a library to view details.</div>
            )}
          </aside>
        </div>
        <footer className="flex items-center justify-between gap-3 border-t border-slate-800 bg-black/20 px-4 py-3 sm:px-5">
          <p className="text-[10px] text-slate-500">Red Dragon Electronics · Library tools</p>
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white">Done</button>
        </footer>
      </section>
    </div>
  );
}
