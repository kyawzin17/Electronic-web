import { ARDUINO_MEGA_PIN } from "./arduino-mega";
import { ARDUINO_NANO_PIN } from "./arduino-nano";
import { ARDUINO_UNO_PIN } from "./arduino-uno";
import { LED } from "./led";
import { PUSH_BUTTON_PIN } from "./push-button";
import { RESISTOR_PIN_CONFIG } from "./resistor";
import { POTENTIOMETER_PIN } from "./potentiometer";
import { SLIDE_SWITCH_PIN } from "./slide-switch";
import { HC_SR04_PIN } from "./hc-sr04";
import { LCD1602_PIN } from "./lcd1602";
import { LCD1602_I2C_PIN } from "./lcd1602-I2c";
import { BUZZER_PIN } from "./buzzer";
import { NEOPixel_PIN } from "./neopixel";

interface PinDefinition {
  x: number;
  y: number;
  name: string;
  dir: string;
  source?: any[];
  signals?: any[];
}

export const PIN_CONFIGS: Record<string, PinDefinition[]> = {
    "arduino-uno": ARDUINO_UNO_PIN,
    "arduino-mega": ARDUINO_MEGA_PIN,
    'arduino-nano': ARDUINO_NANO_PIN,
    'resistor': RESISTOR_PIN_CONFIG,
    'led': LED,
    'pushbutton': PUSH_BUTTON_PIN,
    'potentiometer': POTENTIOMETER_PIN,
    'slide-switch': SLIDE_SWITCH_PIN,
    'hc-sr04': HC_SR04_PIN,
    'lcd1602': LCD1602_PIN,
    'lcd1602-i2c': LCD1602_I2C_PIN,
    'buzzer': BUZZER_PIN,
    "neopixel": NEOPixel_PIN,
}