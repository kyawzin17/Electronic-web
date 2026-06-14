import { useMemo, useState } from "react";

const DIGIT_COLORS = [
  { name: "Black (0)", value: 0, color: "#000000" },
  { name: "Brown (1)", value: 1, color: "#8B4513" },
  { name: "Red (2)", value: 2, color: "#FF0000" },
  { name: "Orange (3)", value: 3, color: "#FFA500" },
  { name: "Yellow (4)", value: 4, color: "#FFFF00" },
  { name: "Green (5)", value: 5, color: "#008000" },
  { name: "Blue (6)", value: 6, color: "#0000FF" },
  { name: "Violet (7)", value: 7, color: "#8A2BE2" },
  { name: "Gray (8)", value: 8, color: "#808080" },
  { name: "White (9)", value: 9, color: "#FFFFFF" },
];

const MULTIPLIERS = [
  { name: "Black (1)", value: 1, color: "#000000" },
  { name: "Brown (2)", value: 10, color: "#8B4513" },
  { name: "Red (3)", value: 100, color: "#FF0000" },
  { name: "Orange (4)", value: 1000, color: "#FFA500" },
  { name: "Yellow (5)", value: 10000, color: "#FFFF00" },
  { name: "Green (6)", value: 100000, color: "#008000" },
  { name: "Blue (7)", value: 1000000, color: "#0000FF" },
];

const TOLERANCES = [
  { name: "Brown", value: "±1%", color: "#8B4513" },
  { name: "Red", value: "±2%", color: "#FF0000" },
  { name: "Gold", value: "±5%", color: "#FFD700" },
  { name: "Silver", value: "±10%", color: "#C0C0C0" },
];

function formatResistance(value: number) {
  if (value >= 1_000_000) {
    return `${value / 1_000_000} MΩ`;
  }

  if (value >= 1000) {
    return `${value / 1000} kΩ`;
  }

  return `${value} Ω`;
}

export default function ColorCodeCalculator() {
  const [band1, setBand1] = useState(1);
  const [band2, setBand2] = useState(0);
  const [multiplier, setMultiplier] = useState(100);
  const [tolerance, setTolerance] = useState("±5%");

  const resistance = useMemo(() => {
    return (band1 * 10 + band2) * multiplier;
  }, [band1, band2, multiplier]);

  return (
    <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-6 text-text-main">

      <h2 className="mb-6 text-3xl font-bold">
        Color Code Calculator
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Controls */}
        <div className="space-y-5">

          <div>
            <label>Band 1</label>
            <select
              className="mt-1 w-full rounded bg-soft p-2"
              value={band1}
              onChange={(e) =>
                setBand1(Number(e.target.value))
              }
            >
              {DIGIT_COLORS.map((c) => (
                <option
                  key={c.name}
                  value={c.value}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Band 2</label>
            <select
              className="mt-1 w-full rounded bg-soft p-2"
              value={band2}
              onChange={(e) =>
                setBand2(Number(e.target.value))
              }
            >
              {DIGIT_COLORS.map((c) => (
                <option
                  key={c.name}
                  value={c.value}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Multiplier</label>
            <select
              className="mt-1 w-full rounded bg-soft p-2"
              value={multiplier}
              onChange={(e) =>
                setMultiplier(Number(e.target.value))
              }
            >
              {MULTIPLIERS.map((c) => (
                <option
                  key={c.name}
                  value={c.value}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tolerance</label>
            <select
              className="mt-1 w-full rounded bg-soft p-2"
              value={tolerance}
              onChange={(e) =>
                setTolerance(e.target.value)
              }
            >
              {TOLERANCES.map((c) => (
                <option
                  key={c.name}
                  value={c.value}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preview */}
        <div>

          <div className="mb-6 flex justify-center">

            <svg
              width="350"
              height="120"
              viewBox="0 0 350 120"
            >
              <line
                x1="0"
                y1="60"
                x2="90"
                y2="60"
                className="stroke-text-main"
                strokeWidth="4"
              />

              <line
                x1="260"
                y1="60"
                x2="350"
                y2="60"
                className="stroke-text-main"
                strokeWidth="4"
              />

              <rect
                x="90"
                y="30"
                width="170"
                height="60"
                rx="20"
                fill="#D2B48C"
              />

              <rect
                x="120"
                y="30"
                width="12"
                height="60"
                fill={
                  DIGIT_COLORS.find(
                    (c) => c.value === band1
                  )?.color
                }
              />

              <rect
                x="150"
                y="30"
                width="12"
                height="60"
                fill={
                  DIGIT_COLORS.find(
                    (c) => c.value === band2
                  )?.color
                }
              />

              <rect
                x="180"
                y="30"
                width="12"
                height="60"
                fill={
                  MULTIPLIERS.find(
                    (c) =>
                      c.value === multiplier
                  )?.color
                }
              />

              <rect
                x="225"
                y="30"
                width="12"
                height="60"
                fill={
                  TOLERANCES.find(
                    (c) =>
                      c.value === tolerance
                  )?.color
                }
              />
            </svg>
          </div>

          <div className="rounded-xl bg-soft p-6 text-center">

            <p className="text-sm text-zinc-400">
              Resistance Value
            </p>

            <h4 className="mt-2 text-5xl font-bold text-green-400">
              {formatResistance(resistance)}
            </h4>

            <p className="mt-3 text-lg">
              Tolerance: {tolerance}
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-soft p-4">

            <h4 className="mb-2 font-semibold">
              Calculation
            </h4>

            <p>
                R = (AB) × 10<sup>C</sup>
            </p>
            <p>
              R = ({band1}{band2}) × {multiplier}
            </p>

            <p className="mt-2">
              R = {resistance} Ω
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}