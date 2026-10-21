import Editor from "@monaco-editor/react";
import { Maximize, ArrowDown, Package } from "lucide-react";
import { useState, useEffect } from "react";
import LibraryManager from "./LibraryManager.tsx";
import { useSimulationStore } from "../stores/simulationStore";

type CodeSectionProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  onRun: () => void | Promise<void>;
  onStop: () => void;
};

const CodeSection = ({
  show,
  setShow,
  onRun,
  onStop,
}: CodeSectionProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [showLibraryManager, setShowLibraryManager] = useState(false);

  const code = useSimulationStore((state) => state.code);
  const setCode = useSimulationStore((state) => state.setCode);
  const status = useSimulationStore((state) => state.status);
  const error = useSimulationStore((state) => state.error);
  const logs = useSimulationStore((state) => state.logs);
  const serialOutput = useSimulationStore((state) => state.serialOutput);

  const isCompiling = status === "compiling";
  const isRunning = status === "running";
  
  const [editorTheme, setEditorTheme] = useState<
  "light" | "vs-dark"
>(() =>
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "vs-dark"
);

useEffect(() => {
  const root = document.documentElement;

  const syncTheme = () => {
    setEditorTheme(
      root.getAttribute("data-theme") === "light"
        ? "light"
        : "vs-dark"
    );
  };

  syncTheme();

  const observer = new MutationObserver(syncTheme);

  observer.observe(root, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => observer.disconnect();
}, []);

  return (
    <div
      className={`flex w-full ${
        fullScreen ? "h-full" : "h-125"
      } flex-col overflow-hidden z-51 rounded-lg absolute left-0 border border-slate-700 dark:bg-slate-900 bg-card/80 transition-all duration-300 ease-in-out ${
        show ? "bottom-0" : "-bottom-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-700 dark:bg-gray-800 bg-soft px-4 py-2">
        <span className="text-sm font-semibold text-text-main">
          ကုဒ်ရေးရန်နေရာ (Sketch.ino)
        </span>

        <button
          onClick={() => setShow(!show)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-main transition hover:dark:bg-slate-500 hover:bg-bg/80 hover:text-text-secondary"
          title="Close code editor"
        >
          <ArrowDown />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLibraryManager(true)}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-2 text-xs font-medium text-secondary transition hover:border-secondary hover:bg-secondary/2s0"
            title="Browse Arduino libraries supported by the simulator"
          >
            <Package size={15} />
            <span className="hidden sm:inline">Libraries</span>
          </button>
          <button
            type="button"
            onClick={() => setFullScreen((value) => !value)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition hover:dark:bg-slate-500 hover:bg-bg/80 hover:text-text-main"
            title="Fullscreen"
          >
            <Maximize size={17} />
          </button>

          <button
            type="button"
            onClick={() => void onRun()}
            disabled={isCompiling}
            className={`rounded px-3 py-2 text-xs font-medium transition ${
              isCompiling
                ? "cursor-not-allowed bg-yellow-600 text-white"
                : isRunning
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isCompiling ? "Compiling..." : isRunning ? "Running" : "Run"}
          </button>

          {isRunning && (
            <button
              type="button"
              onClick={onStop}
              className="rounded bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <Editor
          height="100%"
          language="cpp"
          value={code}
          onChange={(value) => setCode(value ?? "")}
          theme={
            editorTheme === "vs-dark"
              ? "vs-dark"
              : "vs-light"
          }
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {showLibraryManager && (
        <LibraryManager
          code={code}
          onCodeChange={setCode}
          onClose={() => setShowLibraryManager(false)}
        />
      )}

      <div className="border-t border-slate-700 dark:bg-slate-950 bg-soft px-4 py-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-text-secondary">Status:</span>
          <span
            className={
              status === "error"
                ? "text-red-400"
                : status === "compiled" || status === "running"
                  ? "text-green-400"
                  : status === "compiling"
                    ? "text-yellow-400"
                    : "text-text-main"
            }
          >
            {status}
          </span>
        </div>

        {error && (
          <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap text-xs text-red-400">
            {error}
          </pre>
        )}

        {!error && logs && (
          <pre className="mt-2 max-h-24 overflow-auto whitespace-pre-wrap text-xs text-text-secondary">
            {logs}
          </pre>
        )}

        <div className="mt-2 rounded border dark:border-slate-800 border-text-secondary/40 dark:bg-black/40 bg-card/80 p-2">
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-text-main">
            Serial Monitor
          </div>
          <pre className="max-h-28 min-h-8 overflow-auto whitespace-pre-wrap font-mono text-xs text-success">
            {serialOutput || "No serial output yet."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeSection;
