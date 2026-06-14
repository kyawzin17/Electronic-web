
import { useMemo, useState } from "react";

import { motion } from "framer-motion";

function ElectronFlow() {
  return (
    <motion.circle
      r="5"
      fill="#3b82f6"
      animate={{
        cx: [90, 420],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
      cy="80"
    />
  );
}
export default function OhmsLawSimulator() {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(6);

  const [ theme, setTheme ] = useState<string>(localStorage.getItem("theme") || "auto") 
  const current = useMemo(() => {
    return resistance === 0 ? 0 : voltage / resistance;
  }, [voltage, resistance]);

  return (
    <div className="w-full rounded-2xl border border-border dark:border-zinc-700 bg-card dark:bg-zinc-900 p-6 text-text-main dark:text-white">
      <h2 className="mb-6 text-2xl font-bold">
        Ohm's Law Simulator
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <div className="mb-2 flex justify-between">
              <span>Voltage (V)</span>
              <span>{voltage.toFixed(1)} V</span>
            </div>

            <input
              type="range"
              min={1}
              max={120}
              value={voltage}
              onChange={(e) =>
                setVoltage(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span>Resistance (Ω)</span>
              <span>{resistance.toFixed(1)} Ω</span>
            </div>

            <input
              type="range"
              min={1}
              max={100}
              value={resistance}
              onChange={(e) =>
                setResistance(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          <div className="rounded-xl bg-soft dark:bg-zinc-800 p-4">
            <h3 className="mb-3 text-lg font-semibold">
              Formula
            </h3>

            <p className="text-2xl">
              V = I × R
            </p>

            <p className="mt-4 text-lg">
              I = V / R
            </p>

            <div className="mt-4 border-t border-border dark:border-zinc-700 pt-4">
              <p>
                I = {voltage.toFixed(1)} /{" "}
                {resistance.toFixed(1)}
              </p>

              <p className="mt-2 text-2xl font-bold text-green-400">
                {current.toFixed(2)} A
              </p>
            </div>
          </div>
        </div>

        {/* SVG Circuit */}
        <div className="flex items-center justify-center text-text-main">
          <svg
            viewBox="0 0 500 300"
            className="w-full"
          >
            <ElectronFlow />
            {/* Wires */}
            <line
              x1="80"
              y1="80"
              x2="200"
              y2="80"
              className="stroke-text-main"
              strokeWidth="4"
            />

            <line
              x1="320"
              y1="80"
              x2="420"
              y2="80"
              className="stroke-text-main"
              strokeWidth="4"
            />

            <line
              x1="420"
              y1="80"
              x2="420"
              y2="220"
              className="stroke-text-main"
              strokeWidth="4"
            />

            <line
              x1="420"
              y1="220"
              x2="80"
              y2="220"
              className="stroke-text-main"
              strokeWidth="4"
            />

            <line
              x1="80"
              y1="220"
              x2="80"
              y2="80"
              className="stroke-text-main"
              strokeWidth="4"
            />

            {/* Battery */}
            <rect
              x="50"
              y="110"
              width="50"
              height="80"
              rx="8"
              className="stroke-text-main"
              strokeWidth="3"
              fill="none"
            />

            <text
              x="70"
              y="140"
              className="fill-text-main"
              textAnchor="middle"
            >
              +
            </text>

            <text
              x="70"
              y="175"
              className="fill-text-main"
              textAnchor="middle"
            >
              -
            </text>

            {/* Resistor */}
            <rect
              x="200"
              y="55"
              width="120"
              height="50"
              rx="8"
              className="stroke-text-main"
              strokeWidth="3"
              fill="none"
            />

            <text
              x="260"
              y="140"
              className="fill-text-main"
              textAnchor="middle"
            >
              R = {resistance.toFixed(1)} Ω
            </text>

            {/* Current Arrow */}
            <line
              x1="220"
              y1="30"
              x2="290"
              y2="30"
              stroke="#3b82f6"
              strokeWidth="3"
            />

            <polygon
              points="290,30 280,24 280,36"
              className="stroke-text-main"
            />

            <text
              x="255"
              y="15"
              className="fill-text-main"
              textAnchor="middle"
            >
              I = {current.toFixed(2)} A
            </text>

            <text
              x="90"
              y="60"
              className="fill-text-main"
            >
              V = {voltage.toFixed(1)} V
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
