import type { CircuitPin } from "../types/pin.types";

// =====================================================
// RESISTOR PIN DEFINITIONS
// =====================================================
//
// IMPORTANT
//
// CircuitPin.id is the canonical pin ID.
//
// React Flow Handle IDs must be exactly the same:
//
// Pin A → Handle A
// Pin B → Handle B
//
// A resistor is non-polarized, so A and B are
// electrically interchangeable.
//
// =====================================================

export const resistorPins: CircuitPin[] = [
  // =====================================================
  // TERMINAL A
  // =====================================================

  {
    id: "pin1",
    label: "Pin 1",
    alias: "Terminal 1",
    type: "terminal",
    direction: "passive",
    description:
      "First passive terminal of the resistor. Because a resistor is non-polarized, terminal A and terminal B are electrically interchangeable.",
  },

  // =====================================================
  // TERMINAL B
  // =====================================================

  {
    id: "pin2",
    label: "Pin 2",
    alias: "Terminal 2",
    type: "terminal",
    direction: "passive",
    description:
      "Second passive terminal of the resistor. Because a resistor is non-polarized, terminal B and terminal A are electrically interchangeable.",
  },
];

// =====================================================
// PIN LOOKUP
// =====================================================

export const resistorPinsById = Object.fromEntries(
  resistorPins.map((pin) => [pin.id, pin])
) as Record<string, CircuitPin>;