import { ARDUINO_MEGA_PIN } from "./arduino-mega";
import { ARDUINO_NANO_PIN } from "./arduino-nano";
import { LED } from "./led";
import { RESISTOR_PIN_CONFIG } from "./resistor";

interface PinDefinition {
  x: number;
  y: number;
  name: string;
  dir: string;
  source?: any[];
  signals?: any[];
}

export const PIN_CONFIGS: Record<string, PinDefinition[]> = {
    "wokwi-arduino-mega": ARDUINO_MEGA_PIN,
    'wokwi-arduino-nano': ARDUINO_NANO_PIN,
    'wokwi-resistor': RESISTOR_PIN_CONFIG,
    'wokwi-led': LED
}