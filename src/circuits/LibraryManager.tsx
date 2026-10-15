import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSimulationStore } from "../stores/simulationStore";
import {
  BookOpen, Check, Code2, Cpu, Moon, Package, Plus, Search, Sun, Trash2, X,
} from "lucide-react";

type Library = {
  id: string;
  name: string;
  description: string;
  author: string;
  category: "Display" | "Sensor" | "Input" | "LED" | "Time" | "Core";
  include: string;
  note?: string;
  sourceAvailable: boolean;
  runtimeStatus?: "implemented" | "not-verified";
};

const LIBRARIES: Library[] = [
  { id: "liquidcrystal-i2c", name: "LiquidCrystal I2C", description: "Control character LCDs such as 16×2 and 20×4 over I²C.", author: "Frank de Brabander", category: "Display", include: "#include <LiquidCrystal_I2C.h>", note: "Library integration is not yet confirmed in the online compiler. Adding this include alone does not enable the LCD API.", sourceAvailable: false },
  { id: "adafruit-ssd1306", name: "Adafruit SSD1306", description: "Driver for SSD1306 monochrome OLED displays.", author: "Adafruit", category: "Display", include: "#include <Adafruit_SSD1306.h>", note: "Requires the SSD1306 library and usually Adafruit GFX. Compiler/runtime support must be added separately.", sourceAvailable: false },
  { id: "adafruit-gfx", name: "Adafruit GFX Library", description: "Drawing primitives shared by many display libraries.", author: "Adafruit", category: "Display", include: "#include <Adafruit_GFX.h>", note: "This include will not work until the library is available to the simulator compiler.", sourceAvailable: false },
  { id: "dht-sensor", name: "DHT sensor library", description: "Read temperature and humidity from DHT11 and DHT22 sensors.", author: "Adafruit", category: "Sensor", include: "#include <DHT.h>", note: "Needs the library source and compatible simulated sensor/runtime support.", sourceAvailable: false },
  { id: "keypad", name: "Keypad", description: "Scan matrix keypads such as 4×4 and 4×3 keypads.", author: "Mark Stanley / Alexander Brevig", category: "Input", include: "#include <Keypad.h>", note: "Pin mapping and library API support need to be implemented in the simulator.", sourceAvailable: false },
  { id: "fastled", name: "FastLED", description: "Animation and color control for addressable LED strips.", author: "FastLED community", category: "LED", include: "#include <FastLED.h>", note: "Chipset-specific behavior and timing are not currently confirmed in this simulator.", sourceAvailable: false },
  { id: "irremote", name: "Arduino-IRremote", description: "Receive and send common infrared remote-control protocols.", author: "Arduino-IRremote contributors", category: "Input", include: "#include <IRremote.hpp>", note: "IR protocol and hardware runtime support must be implemented before this can run.", sourceAvailable: false },
  { id: "rtclib", name: "RTClib", description: "Date and time helpers for RTC modules such as DS1307 and DS3231.", author: "Adafruit", category: "Time", include: "#include <RTClib.h>", note: "The RTC module and the library API need compiler/runtime integration.", sourceAvailable: false },
  { id: "wire", name: "Wire (I²C)", description: "Arduino core I²C communication library.", author: "Arduino", category: "Core", include: "#include <Wire.h>", note: "Wire is part of the Arduino ecosystem, but actual support depends on the simulator's current compiler and I²C implementation.", sourceAvailable: false },
];

const CATEGORIES = ["All", "Display", "Sensor", "Input", "LED", "Time", "Core"] as const;
const API_BASE_URL = import.meta.env.VITE_API_URL_PRODUCTION ?? "http://localhost:3335/api";
type LibraryCatalogResponse = { success: boolean; libraries?: Array<Library & { sourceKind?: string }> };
type Props = { onClose: () => void; code: string; onCodeChange: (code: string) => void };

function readTheme() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.theme === "dark";
}

export default function LibraryManager({ onClose, code, onCodeChange }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [libraries, setLibraries] = useState<Library[]>(LIBRARIES);
  const [catalogError, setCatalogError] = useState("");
  const selectedLibraries = useSimulationStore((state) => state.selectedLibraries);
  const setSelectedLibraries = useSimulationStore((state) => state.setSelectedLibraries);
  const [isDark, setIsDark] = useState(readTheme);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE_URL}/arduino/libraries`, { signal: controller.signal })
      .then(async (response) => {
        const data = (await response.json()) as LibraryCatalogResponse;
        if (!response.ok || !data.success || !Array.isArray(data.libraries)) {
          throw new Error("Compiler library catalog is unavailable.");
        }
        setLibraries(data.libraries);
        setCatalogError("");
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setCatalogError("Unable to load live compiler library status. Check the backend connection.");
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const previousTheme = document.documentElement.dataset.theme;
    const storedTheme = window.localStorage.getItem("theme");
    const dark = storedTheme ? storedTheme === "dark" : previousTheme === "dark";
    setIsDark(dark);
    if (dark) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    window.localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return libraries.filter((library) => {
      const matchesCategory = category === "All" || library.category === category;
      const matchesQuery = !normalized || [library.name, library.description, library.author, library.category]
        .some((value) => value.toLowerCase().includes(normalized));
      return matchesCategory && matchesQuery;
    });
  }, [libraries, query, category]);

  const addLibraryToProject = (library: Library) => {
    if (!library.sourceAvailable) return;
    setSelectedLibraries(selectedLibraries.includes(library.id) ? selectedLibraries : [...selectedLibraries, library.id]);
    const alreadyExists = code.split("\n").some((line) => line.trim() === library.include);
    if (!alreadyExists) onCodeChange(code.trim() ? `${library.include}\n${code}` : `${library.include}\n`);
  };
  const removeLibraryFromProject = (library: Library) => {
    setSelectedLibraries(selectedLibraries.filter((id) => id !== library.id));
  };
  const addInclude = (library: Library) => {
    const alreadyExists = code.split("\n").some((line) => line.trim() === library.include);
    if (!alreadyExists) onCodeChange(code.trim() ? `${library.include}\n${code}` : `${library.include}\n`);
  };

  const surface = isDark ? "bg-[#080E1D] text-slate-100" : "bg-white text-slate-900";
  const panel = isDark ? "border-slate-700/80 bg-slate-950/45" : "border-slate-200 bg-slate-50";
  const muted = isDark ? "text-slate-400" : "text-slate-600";
  const subtle = isDark ? "text-slate-500" : "text-slate-500";
  const card = isDark ? "border-slate-800 bg-slate-900/60 hover:border-slate-600" : "border-slate-200 bg-white hover:border-cyan-400";
  const activeCard = isDark ? "border-cyan-300/50 bg-cyan-300/[0.08]" : "border-cyan-500 bg-cyan-50";
  const field = isDark ? "border-slate-700 bg-slate-950 text-white placeholder:text-slate-500" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400";

  return createPortal(
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 backdrop-blur-sm sm:p-6 ${isDark ? "bg-slate-950/75" : "bg-slate-900/35"}`} role="dialog" aria-modal="true" aria-labelledby="library-manager-title">
      <section className={`flex max-h-[min(780px,94vh)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border shadow-2xl ${surface} ${isDark ? "border-cyan-400/25 shadow-cyan-950/30" : "border-slate-200 shadow-slate-900/15"}`}>
        <header className={`flex items-center justify-between gap-3 border-b px-4 py-4 sm:px-6 ${panel} ${isDark ? "bg-gradient-to-r from-[#101B35] to-[#15102C]" : "bg-gradient-to-r from-cyan-50 to-violet-50"}`}>
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-600"><Package size={22} /></div>
            <div className="min-w-0">
              <h2 id="library-manager-title" className="text-base font-bold sm:text-lg">Library Manager</h2>
              <p className={`mt-0.5 text-xs ${muted}`}>Red Dragon Electronics · Arduino libraries</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={toggleTheme} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${isDark ? "border-slate-600 text-slate-200 hover:bg-white/10" : "border-slate-200 text-slate-700 hover:bg-white"}`} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              {isDark ? <Sun size={15} /> : <Moon size={15} />}<span className="hidden sm:inline">{isDark ? "Light mode" : "Dark mode"}</span>
            </button>
            <button type="button" onClick={onClose} aria-label="Close library manager" className={`rounded-lg p-2 transition ${muted} hover:bg-black/5`}><X size={20} /></button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.78fr)]">
          <div className={`flex min-h-0 flex-col border-b md:border-b-0 md:border-r ${isDark ? "border-slate-700/80" : "border-slate-200"}`}>
            <div className="space-y-3 p-4 sm:p-5">
              <label className={`flex items-center gap-2 rounded-xl border px-3 focus-within:border-cyan-500 ${field}`}>
                <Search size={17} className={subtle} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search libraries, sensors, displays..." className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none" />
                {query && <button type="button" onClick={() => setQuery("")} className={muted} aria-label="Clear search"><X size={15} /></button>}
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {CATEGORIES.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition ${category === item ? "border-cyan-500 bg-cyan-500/10 font-semibold text-cyan-600" : `${isDark ? "border-slate-700 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-600 hover:bg-white"}`}`}>{item}</button>)}
              </div>
              <div className={`flex items-center justify-between text-[11px] ${subtle}`}><span>{filtered.length} libraries</span><span>{selectedLibraries.length} includes added</span></div>
            </div>
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-4 sm:px-5">
              {filtered.map((library) => {
                const inProject = selectedLibraries.includes(library.id);
                return <div key={library.id} className={`flex items-center gap-2 rounded-xl border p-3 transition ${inProject ? activeCard : card}`}>
                  <div className="flex min-w-0 flex-1 items-start gap-3 text-left">
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${inProject ? "bg-cyan-500/10 text-cyan-600" : isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}><BookOpen size={17} /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-semibold">{library.name}</span>{inProject && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-600"><Check size={11} /> In project</span>}</div>
                      <p className={`mt-1 text-xs leading-5 ${muted}`}>{library.description}</p>
                      <div className={`mt-2 flex items-center gap-1.5 text-[10px] ${subtle}`}><span>{library.category}</span><span>·</span><span>{library.author}</span><span>·</span><span className={library.sourceAvailable ? "text-emerald-500" : "text-amber-500"}>{library.sourceAvailable ? "Compiler source available" : "Not installed"}</span></div>
                    </div>
                  </div>
                  <button type="button" onClick={() => inProject ? removeLibraryFromProject(library) : addLibraryToProject(library)} disabled={!inProject && !library.sourceAvailable} aria-label={inProject ? `Remove ${library.name} from project` : `Add ${library.name} to project`} title={inProject ? "Remove from project" : library.sourceAvailable ? "Add to project" : "Library source is not installed on the compiler"} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${inProject ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-500" : "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 hover:border-cyan-500 hover:bg-cyan-500/20"}`}>
                    {inProject ? <Check size={17} /> : <Plus size={18} />}
                  </button>
                </div>;
              })}
              {filtered.length === 0 && <div className={`rounded-xl border border-dashed px-4 py-10 text-center text-sm ${subtle}`}>No libraries match your search.</div>}
            </div>
          </div>

          <aside className={`flex min-h-0 flex-col overflow-y-auto p-4 sm:p-5 ${isDark ? "bg-black/10" : "bg-slate-50/70"}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-violet-500">Current sketch</div>
                <h3 className="text-lg font-bold">Project Libraries</h3>
                <p className={`mt-1 text-xs leading-5 ${muted}`}>Press + on the left to add a library to this project.</p>
              </div>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-600">{selectedLibraries.length}</span>
            </div>
            {catalogError && <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-5 text-amber-600">{catalogError}</div>}
            <div className="mt-4 space-y-2">
              {selectedLibraries.length ? selectedLibraries.map((id) => {
                const library = libraries.find((item) => item.id === id);
                if (!library) return null;
                return <div key={library.id} className={`rounded-xl border p-3 ${card}`}>
                  <div className="flex items-start gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600"><Package size={16} /></div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{library.name}</div>
                      <div className={`mt-1 text-[10px] ${subtle}`}>{library.category} · {library.sourceAvailable ? "source available" : "not installed"} · {library.runtimeStatus === "implemented" ? "runtime adapter implemented" : "runtime not verified"}</div>
                    </div>
                    <button type="button" onClick={() => removeLibraryFromProject(library)} aria-label={`Remove ${library.name}`} title="Remove library" className={`rounded-md p-1.5 ${muted} transition hover:bg-red-500/10 hover:text-red-500`}><Trash2 size={15} /></button>
                  </div>
                  <code className={`mt-3 block break-all rounded-lg px-2 py-2 font-mono text-[11px] ${isDark ? "bg-black/30 text-cyan-300" : "bg-slate-100 text-cyan-700"}`}>{library.include}</code>
                  <button type="button" onClick={() => addInclude(library)} disabled={!library.sourceAvailable} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500/15 to-violet-500/15 px-3 py-2 text-xs font-bold text-cyan-700 ring-1 ring-cyan-500/30 transition hover:from-cyan-500/25 hover:to-violet-500/25 disabled:cursor-not-allowed disabled:opacity-40"><Code2 size={14} /> Add include to code</button>
                </div>;
              }) : <div className={`flex flex-col items-center rounded-xl border border-dashed px-4 py-10 text-center ${isDark ? "border-slate-700" : "border-slate-300"}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500"><Package size={21} /></div>
                <p className="mt-3 text-sm font-semibold">No libraries added yet</p>
                <p className={`mt-1 max-w-[220px] text-xs leading-5 ${muted}`}>Choose a library on the left and press + to add it to this project.</p>
              </div>}
            </div>
            <div className="mt-auto pt-4">
              <div className={`flex items-start gap-2 rounded-xl border p-3 ${isDark ? "border-amber-500/25 bg-amber-500/5" : "border-amber-300 bg-amber-50"}`}>
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <p className="text-[11px] leading-5 text-amber-700">Selected libraries are sent to the backend compiler. A source-available label means the compiler has the header; runtime adapters are shown separately and still need real compile/run checks.</p>
              </div>
            </div>
          </aside>
        </div>
        <footer className={`flex items-center justify-between gap-3 border-t px-4 py-3 sm:px-5 ${panel}`}>
          <p className={`text-[10px] ${subtle}`}>RDE · Circuit Simulator tools</p>
          <button type="button" onClick={onClose} className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${isDark ? "border-slate-700 text-slate-300 hover:border-slate-500" : "border-slate-200 text-slate-700 hover:bg-white"}`}>Done</button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
