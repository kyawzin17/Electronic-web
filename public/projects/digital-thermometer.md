# Digital Thermometer

## Overview
ESP8266 ကို အသုံးပြုထားတဲ့ IoT project ဖြစ်ပါတယ်။

## Bill of Materials (BOM)
| Component | Specification | Qty |
| :--- | :--- | :--- |
| NodeMCU | ESP8266 | 1 |
| Relay | 4-Channel | 1 |

## Circuit Diagram
![Circuit](https://images.unsplash.com/photo-1518770660439-4636190af475)

## Connection Steps
1. **Relay VCC** ကို **NodeMCU VV** သို့ ချိတ်ပါ။
2. **GND** ကို **GND** သို့ ချိတ်ပါ။

## Arduino Code
```cpp
void setup() {
  pinMode(D1, INPUT);
}
void loop() {
  digitalWrite(D1, digitalRead(D1));
}