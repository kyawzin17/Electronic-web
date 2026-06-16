import { useEffect, useState } from "react";

export default function Capacitor() {
  const [charge, setCharge] = useState(0);
  const [mode, setMode] = useState<
    "idle" | "charging" | "discharging"
  >("idle");

  useEffect(() => {
    const interval = setInterval(() => {
      if (mode === "charging") {
        setCharge((prev) => {
          if (prev >= 100) return 100;
          return prev + 1;
        });
      }

      if (mode === "discharging") {
        setCharge((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [mode]);

  const voltage = ((charge / 100) * 12).toFixed(1);

  const ledBrightness =
    mode === "discharging"
      ? charge / 100
      : 0;

  return (
    <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-700 bg-zinc-900 p-6 text-white">

      <h4 className="mb-6 text-3xl font-bold">
        Capacitor + LED Simulator
      </h4>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Left Panel */}
        <div>
          <div className="mb-6">
            <p className="mb-2 text-zinc-400">
              Charge Level
            </p>

            <div className="h-7 overflow-hidden rounded-full bg-zinc-700">
              <div
                className="h-full bg-green-500 transition-all duration-100"
                style={{
                  width: `${charge}%`,
                }}
              />
            </div>

            <p className="mt-2 text-lg font-semibold">
              {charge}%
            </p>
          </div>

          <div className="rounded-xl bg-zinc-800 p-4">
            <p className="text-lg">
              Voltage:
              <span className="ml-2 font-bold text-green-400">
                {voltage}V
              </span>
            </p>

            <p className="mt-2">
              Status:
              <span className="ml-2 text-blue-400">
                {mode}
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() =>
                setMode("charging")
              }
              className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700"
            >
              Charge
            </button>

            <button
              onClick={() =>
                setMode("discharging")
              }
              className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              Discharge
            </button>

            <button
              onClick={() => {
                setMode("idle");
                setCharge(0);
              }}
              className="rounded-lg bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
            >
              Reset
            </button>
          </div>

          {/* LED Status */}
          <div className="mt-6 rounded-xl bg-zinc-800 p-4">

            <h5 className="mb-3 text-lg font-semibold">
              LED State
            </h5>

            {charge === 0 && (
              <p>⚫ LED OFF</p>
            )}

            {charge > 0 &&
              charge <= 25 &&
              mode === "discharging" && (
                <p>💡 Dim Light</p>
              )}

            {charge > 25 &&
              charge <= 70 &&
              mode === "discharging" && (
                <p>💡 Medium Brightness</p>
              )}

            {charge > 70 &&
              mode === "discharging" && (
                <p>💡 Very Bright</p>
              )}
          </div>
        </div>

        {/* SVG Circuit */}
        <div className="flex justify-center">

          <svg
            width="450"
            height="260"
            viewBox="0 0 450 260"
          >
            {/* Battery */}

            <line
              x1="40"
              y1="80"
              x2="40"
              y2="150"
              stroke="white"
              strokeWidth="4"
            />

            <line
              x1="60"
              y1="70"
              x2="60"
              y2="160"
              stroke="white"
              strokeWidth="8"
            />

            <text
              x="30"
              y="65"
              fill="white"
            >
              +
            </text>

            <text
              x="30"
              y="175"
              fill="white"
            >
              -
            </text>

            {/* Wire Top */}

            <line
              x1="60"
              y1="70"
              x2="190"
              y2="70"
              stroke="white"
              strokeWidth="4"
            />

            {/* Moving Charge */}

            {mode === "charging" && (
              <circle
                cx={
                  70 +
                  (charge / 100) * 110
                }
                cy="70"
                r="6"
                fill="#3b82f6"
              />
            )}

            {/* Capacitor */}

            <line
              x1="190"
              y1="40"
              x2="190"
              y2="120"
              stroke="white"
              strokeWidth="6"
            />

            <line
              x1="220"
              y1="40"
              x2="220"
              y2="120"
              stroke="white"
              strokeWidth="6"
            />

            {/* Capacitor Fill */}

            <rect
              x="192"
              y={120 - charge * 0.8}
              width="26"
              height={charge * 0.8}
              fill="#22c55e"
            />

            <text
              x="155"
              y="25"
              fill="white"
            >
              Capacitor
            </text>

            {/* Wire To LED */}

            <line
              x1="220"
              y1="70"
              x2="320"
              y2="70"
              stroke="white"
              strokeWidth="4"
            />

            {/* LED */}

            <circle
              cx="340"
              cy="70"
              r="12"
              fill={
                mode === "discharging"
                  ? `rgba(250,204,21,${ledBrightness})`
                  : "#374151"
              }
            />

            {mode === "discharging" &&
              charge > 0 && (
                <>
                  <circle
                    cx="340"
                    cy="70"
                    r="20"
                    fill="#facc15"
                    opacity={
                      ledBrightness * 0.3
                    }
                  />
                  <circle
                    cx="340"
                    cy="70"
                    r="30"
                    fill="#facc15"
                    opacity={
                      ledBrightness * 0.15
                    }
                  />
                  <text
                                x="325"
                                y="50"
                                fill="white"
                              >
                                LED
                              </text>
                </>
              )}

            {/* Bottom Wire */}

            <line
              x1="340"
              y1="70"
              x2="340"
              y2="190"
              stroke="white"
              strokeWidth="4"
            />

            <line
              x1="340"
              y1="190"
              x2="40"
              y2="190"
              stroke="white"
              strokeWidth="4"
            />

            <line
              x1="40"
              y1="190"
              x2="40"
              y2="150"
              stroke="white"
              strokeWidth="4"
            />

            {/* Discharge Particle */}

            {mode === "discharging" &&
              charge > 0 && (
                <circle
                  cx={
                    330 -
                    (charge / 100) * 100
                  }
                  cy="70"
                  r="6"
                  fill="#ef4444"
                />
              )}

            <text
              x="160"
              y="230"
              fill="white"
            >
              {charge}% Charged
            </text>
          </svg>
        </div>
      </div>

      {/* Explanation */}

      <div className="mt-8 rounded-xl bg-zinc-800 p-5">

        <h5 className="mb-3 text-xl font-bold">
          What's Happening?
        </h5>

        {mode === "idle" && (
          <p>
            Press Charge to store
            energy in the capacitor.
          </p>
        )}

        {mode === "charging" && (
          <p>
            🔋 Battery is charging the
            capacitor. Energy is being
            stored between the capacitor
            plates.
          </p>
        )}

        {mode === "discharging" &&
          charge > 0 && (
            <p>
              💡 Capacitor is releasing
              stored energy and powering
              the LED.
            </p>
          )}

        {mode === "discharging" &&
          charge === 0 && (
            <p>
              ⚫ Capacitor is empty. No
              energy remains to power
              the LED.
            </p>
          )}
      </div>
    </div>
  );
}