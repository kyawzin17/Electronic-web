import { ARDUINO_MEGA_PIN } from "./arduino-mega";
import { ARDUINO_NANO_PIN } from "./arduino-nano";
import { ARDUINO_UNO_PIN } from "./arduino-uno";
import { LED } from "./led";
import { PUSH_BUTTON_PIN } from "./push-button";
import { RESISTOR_PIN_CONFIG } from "./resistor";
import { POTENTIOMETER_PIN } from "./potentiometer";
import { SLIDE_SWITCH_PIN } from "./slide-switch";
import { HC_SR04_PIN } from "./hc-sr04";

interface PinDefinition {
  x: number;
  y: number;
  name: string;
  dir: string;
  source?: any[];
  signals?: any[];
}

export const PIN_CONFIGS: Record<string, PinDefinition[]> = {
    "wokwi-arduino-uno": ARDUINO_UNO_PIN,
    "wokwi-arduino-mega": ARDUINO_MEGA_PIN,
    'wokwi-arduino-nano': ARDUINO_NANO_PIN,
    'wokwi-resistor': RESISTOR_PIN_CONFIG,
    'wokwi-led': LED,
    'wokwi-pushbutton': PUSH_BUTTON_PIN,
    'wokwi-potentiometer': POTENTIOMETER_PIN,
    'wokwi-slide-switch': SLIDE_SWITCH_PIN,
    'wokwi-hc-sr04': HC_SR04_PIN,
}