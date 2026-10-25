import React from "react";
import type { SimulationDiagnostics } from "./simulator/types/simulator.types";

type Props = {
  diagnostics: SimulationDiagnostics;
  running: boolean;
  onRun: () => void;
  onPause: () => void;
  onStep: () => void;
  onStop: () => void;
  onReset: () => void;
  onTraceNet: (netId: string) => void;
  onTraceComponent: (componentId: string) => void;
  onClearTrace: () => void;
};

const fmt = (value: number | undefined, digits = 2) =>
  typeof value === "number" && Number.isFinite(value)
    ? value.toFixed(digits)
    : "—";

const SimulationDebugger: React.FC<Props> = ({
  diagnostics,
  running,
  onRun,
  onPause,
  onStep,
  onStop,
  onReset,
  onTraceNet,
  onTraceComponent,
  onClearTrace,
}) => {
  return (
    <div className="absolute bottom-20 right-4 z-50 w-90 max-h-[70vh] overflow-hidden rounded-2xl border border-text-secondary/80 bg-soft/60 text-text-main shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-text-secondary/60 px-4 py-3">
        <div>
          <div className="text-sm font-semibold">Simulation Debugger</div>
          <div className="text-[10px] text-text-secondary">
            {fmt(diagnostics.simulatedMs, 1)} ms · {diagnostics.frameCount} frames
          </div>
        </div>
        <div className={running ? "h-2 w-2 rounded-full bg-success" : "h-2 w-2 rounded-full bg-error"} />
      </div>

      <div className="flex gap-1 border-b border-text-secondary/60 p-2">
        {!running ? (
          <button onClick={onRun} className="rounded-lg bg-success/80 px-2 py-1 text-xs hover:cursor-pointer">Run</button>
        ) : (
          <button onClick={onPause} className="rounded-lg bg-warning/80 px-2 py-1 text-xs hover:cursor-pointer">Pause</button>
        )}
        <button onClick={onStep} disabled={running} className="rounded-lg bg-text-secondary/30 px-2 py-1 text-xs disabled:opacity-40 hover:cursor-pointer">Step</button>
        <button onClick={onStop} className="rounded-lg bg-error/80 px-2 py-1 text-xs hover:cursor-pointer">Stop</button>
        <button onClick={onReset} className="rounded-lg bg-text-secondary/30 px-2 py-1 text-xs hover:cursor-pointer">Reset</button>
      </div>

      <div className="max-h-[calc(70vh-108px)] overflow-y-auto p-3 space-y-3">
        {diagnostics.faults.length > 0 && (
          <section>
            <div className="mb-1 text-xs font-semibold text-red-400">Faults</div>
            <div className="space-y-1">
              {diagnostics.faults.map((fault) => (
                <div key={fault} className="rounded-lg border border-red-900/60 bg-red-950/40 px-2 py-1 text-[10px] text-red-300">
                  {fault}
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="mb-1 text-xs font-semibold text-text-secondary">Pins</div>
          <div className="grid grid-cols-2 gap-1">
            {diagnostics.pins.slice(0, 24).map((pin) => (
              <div key={pin.pin} className="rounded-lg bg-bg border border-text-secondary/20 px-2 py-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-text-main/80">{pin.pin}</span>
                  <span className="text-text-secondary/80">{pin.mode ?? ""}</span>
                </div>
                <div className="text-xs">
                  {pin.voltage !== undefined ? `${fmt(pin.voltage)} V` : pin.digitalLevel !== undefined ? `D${pin.digitalLevel}` : "floating"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-1 text-xs font-semibold text-text-main/80">Nets</div>
          <div className="space-y-1">
            {diagnostics.nets.map((net) => (
              <button
                key={net.netId}
                onClick={() => onTraceNet(net.netId)}
                className={`block w-full rounded-lg px-2 py-1.5 text-left transition bg-bg border border-text-secondary/20 ${diagnostics.trace?.netIds.includes(net.netId) ? "ring-1 ring-cyan-400/70" : ""}`}
                title="Trace this net"
              >
                <div className="flex justify-between text-[10px]">
                  <span>{net.netId}</span>
                  <span className={net.active ? "text-emerald-400" : "text-slate-500"}>{net.active ? "ACTIVE" : "idle"}</span>
                </div>
                <div className="text-xs">{fmt(net.voltage)} V · {fmt(net.currentMa)} mA</div>
              </button>
            ))}
          </div>
        </section>

        {diagnostics.trace && (
          <section>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-cyan-300">
              <span>Trace · {diagnostics.trace.target}</span>
              <button onClick={onClearTrace} className="text-[10px] text-text-main/60 hover:text-text-main">Clear</button>
            </div>
            <div className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 p-2">
              <div className="text-[10px] text-text-main/80">{diagnostics.trace.summary}</div>
              <div className="mt-2 space-y-1">
                {diagnostics.trace.steps.slice(0, 24).map((step, index) => (
                  <div key={step.kind + ":" + step.id + ":" + index} className="flex items-center gap-2 text-[10px]">
                    <span className="w-16 shrink-0 uppercase text-text-secondary">{step.kind}</span>
                    <span className="truncate text-text-main/90">{step.label}</span>
                    {step.currentMa !== undefined && <span className="ml-auto text-text-main/60">{fmt(step.currentMa)}mA</span>}
                  </div>
                ))}
              </div>
              {diagnostics.trace.faults.length > 0 && (
                <div className="mt-2 space-y-1">
                  {diagnostics.trace.faults.map((fault) => (
                    <div key={fault} className="text-[10px] text-error/90">{fault}</div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section>
          <div className="mb-1 text-xs font-semibold text-text-main/80">Components</div>
          <div className="space-y-1">
            {diagnostics.components.map((component) => (
              <button
                key={component.id}
                onClick={() => onTraceComponent(component.id)}
                className={`block w-full rounded-lg px-2 py-1.5 text-left transition bg-bg border border-text-secondary/20 ${diagnostics.trace?.componentIds.includes(component.id) ? "ring-1 ring-cyan-400/70" : ""}`}
                title="Trace this component"
              >
                <div className="flex justify-between text-[10px]">
                  <span className="truncate pr-2">{component.type}</span>
                  <span className={component.active ? "text-success" : "text-text-secondary"}>{component.active ? "ON" : "OFF"}</span>
                </div>
                <div className="text-xs">{fmt(component.currentMa)} mA{component.powerMw !== undefined ? ` · ${fmt(component.powerMw)} mW` : ""}</div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SimulationDebugger;
