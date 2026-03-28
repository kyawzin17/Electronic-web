## Compact Digital Thermometer (Arduino Nano + LM35 + I2C LCD)

Arduino Nano ကို အသုံးပြု၍ နေရာအနည်းငယ်သာယူသော ကျစ်လစ်သည့် အပူချိန်တိုင်း ကိရိယာ (Digital Thermometer) တည်ဆောက်ခြင်း Project ဖြစ်ပါသည်။

---

### ၁။ ပရောဂျက်၏ ရည်ရွယ်ချက် (Project Goal)
ဤ Project ၏ အဓိကရည်ရွယ်ချက်မှာ Arduino Nano ကို အသုံးပြု၍ ပတ်ဝန်းကျင် အပူချိန်ကို တိကျစွာ တိုင်းတာရန်နှင့် I2C LCD Display ပေါ်တွင် Celsius (°C) ဖြင့် အချိန်နှင့်တပြေးညီ ဖော်ပြပေးနိုင်သော Device တစ်ခု ဖန်တီးရန် ဖြစ်သည်။

---

### ၂။ အလုပ်လုပ်ပုံ အကျဉ်းချုပ် (Working Principle)
LM35 Temperature Sensor သည် ပတ်ဝန်းကျင် အပူချိန်ပြောင်းလဲမှုကို Analog Voltage အဖြစ် ပြောင်းလဲပေးသည်။ အပူချိန် 1°C တိုးတိုင်း Voltage 10mV ထွက်ရှိသည်။ Arduino Nano ၏ ADC (Analog to Digital Converter) မှတဆင့် ထို Voltage ကို ဖတ်ယူပြီး သင်္ချာဖော်မြူလာဖြင့် Celsius သို့ တွက်ချက်ပြောင်းလဲသည်။ ထို့နောက် I2C communication interface ကို အသုံးပြု၍ LCD Screen ပေါ်သို့ ပေးပို့ပြသခြင်း ဖြစ်သည်။

---

### ၃။ လိုအပ်သော ပစ္စည်းများ (Components List)
* **Arduino Nano** (Small & Breadboard friendly)
* **LM35 Precision Temperature Sensor**
* **I2C LCD Display (16x2)**
* **Breadboard & Mini Jumper Wires**
* **USB Mini/Micro Cable** (For Programming)

---

### ၄။ တစ်ခုချင်းစီ၏ အလုပ်လုပ်ပုံ (Component Functions)

1.  **Arduino Nano:** ဤ Project ၏ ဦးနှောက်ဖြစ်ပြီး Sensor data များကို တွက်ချက်ကာ LCD ထံသို့ အချက်အလက်များ ပေးပို့သည်။ Uno နှင့် စွမ်းဆောင်ရည် တူညီသော်လည်း နေရာစား သက်သာသည်။
2.  **LM35 Sensor:** အပူချိန်ကို အာရုံခံသော အဓိက အစိတ်အပိုင်း ဖြစ်သည်။ Linear Output ရှိသောကြောင့် တိကျမှု မြင့်မားသည်။
3.  **I2C LCD Display:** ရရှိလာသော အပူချိန်တန်ဖိုးကို ကြည့်ရှုသူ နားလည်စေရန် စာသားဖြင့် ပြသပေးသည်။ I2C Module ပါဝင်သဖြင့် Arduino နှင့် ချိတ်ဆက်ရာတွင် ကြိုး (၄) ပင်သာ လိုအပ်သည်။

---

### ၅။ ပတ်လမ်းပုံစံ (Circuit Diagram Description)



[Image of Arduino Nano pinout diagram]


* **LM35 Sensor:**
    * Left Pin (VCC) -> Nano +5V
    * Middle Pin (Vout) -> Nano A0
    * Right Pin (GND) -> Nano GND
* **I2C LCD Module:**
    * VCC -> Nano +5V
    * GND -> Nano GND
    * **SDA -> Nano A4**
    * **SCL -> Nano A5**

---

### ၆။ Arduino Code

```cpp
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

// Initialize LCD (Address 0x27)
LiquidCrystal_I2C lcd(0x27, 16, 2);

const int sensorPin = A0;

void setup() {
  lcd.init();
  lcd.backlight();
  
  lcd.setCursor(0, 0);
  lcd.print("Nano Thermometer");
  delay(1500);
  lcd.clear();
}

void loop() {
  // Read analog value from A0
  int rawValue = analogRead(sensorPin);
  
  // Calculate voltage and convert to Celsius
  // Formula: (Vout / 1024) * 5000 / 10
  float celsius = (rawValue * 5.0 * 100.0) / 1024.0;

  // Visual Output
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(celsius, 1); // Show 1 decimal place
  lcd.print((char)223); // Degree sign
  lcd.print("C");

  // Status Message
  lcd.setCursor(0, 1);
  if(celsius > 35) {
    lcd.print("Status: HOT    ");
  } else if(celsius < 20) {
    lcd.print("Status: COLD   ");
  } else {
    lcd.print("Status: NORMAL ");
  }
  
  delay(1000);
}
```  

---  

### ၇။ အားသာချက်နှင့် အားနည်းချက် (Pros & Cons)
#### အားသာချက်များ:

* Compact Size: Arduino Nano ဖြစ်၍ Project အရွယ်အစားကို အလွန်သေးငယ်အောင် ပြုလုပ်နိုင်ခြင်း။

* Breadboard Friendly: Breadboard ပေါ်တွင် တိုက်ရိုက်တပ်ဆင်နိုင်၍ စမ်းသပ်ရ လွယ်ကူခြင်း။

* Efficiency: I2C Display သုံးထားသဖြင့် ကြိုးသွယ်တန်းမှု အလွန်နည်းပါးခြင်း။

---

#### အားနည်းချက်များ:

* Power Limit: Uno ထက်စာလျှင် current ထုတ်ပေးနိုင်စွမ်း အနည်းငယ် လျော့နည်းသဖြင့် component အများကြီး ချိတ်ဆက်ရာတွင် သတိထားရန် လိုခြင်း။

* Heat Sensitivity: Sensor သည် Arduino နှင့် နီးကပ်လွန်းပါက Arduino မှ ထွက်သော အပူကြောင့် အပူချိန် တိုင်းတာမှု အနည်းငယ် လွဲမှားနိုင်ခြင်း။

---

#### ၈။ အသုံးပြုနိုင်သည့် နေရာများ (Use Cases)
* Portable Devices: သယ်ဆောင်သွား၍ရသော လက်ကိုင် အပူချိန်တိုင်း ကိရိယာများ။

* PC Case Monitoring: ကွန်ပျူတာ Case အတွင်းပိုင်း အပူချိန်ကို စောင့်ကြည့်ရန်။

* Incubator Systems: ဥဖောက်စက်ငယ်များ သို့မဟုတ် ငါးကန်များ၏ အပူချိန်ကို စစ်ဆေးရန်။
---

### ၉။ အကျိုးကျေးဇူးများ (Benefits)
ဤ Project ကို လုပ်ဆောင်ခြင်းဖြင့် Arduino Nano ၏ Pinout သဘောတရားများ၊ Analog Sensors များကို အသုံးပြုပုံနှင့် I2C Communication Protocol အလုပ်လုပ်ပုံတို့ကို လက်တွေ့ကျကျ နားလည်လာမည် ဖြစ်သည်။ ထို့ပြင် ပစ္စည်းများကို ကျစ်လစ်အောင် စနစ်တကျ တည်ဆောက်တတ်သည့် (Compact Circuit Design) အတွေ့အကြုံကို ရရှိစေပါသည်။  

---   

### 💡 Arduino Nano အတွက် သိထားရမယ့် အချက်များ:
1.  **Driver တပ်ဆင်ခြင်း:** Nano အများစုက **CH340 Driver** ကို သုံးတာမို့ ကွန်ပျူတာမှာ အရင်သွင်းထားဖို့ လိုပါမယ်။
2.  **Upload Error တက်ရင်:** Arduino IDE ရဲ့ `Tools > Processor` မှာ **"ATmega328P (Old Bootloader)"** ကို ပြောင်းရွေးပေးပါ။
3.  **Power:** USB ကနေ မီးမပေးဘဲ အပြင် Battery သုံးမယ်ဆိုရင် **VIN** pin (6V to 12V) ကို သုံးရပါမယ်။  

---

### အကြံပြုချက်:
> **Formula Note:** Code ထဲမှာပါတဲ့ `(rawValue / 1023.0) * 5000` ဆိုတာက Arduino ရဲ့ Reference voltage (5V) ကို အခြေခံထားတာပါ။ အကယ်၍ 3.3V သုံးရင် ဒီနေရာမှာ ပြောင်းလဲပေးရပါမယ်။  

> **Degree Symbol:** LCD မှာ ဒီဂရီသင်္ကေတ ပြဖို့ `(char)223` ကို သုံးထားပါတယ်။  

> **Status Logic:** အပူချိန်အခြေအနေကို သတ်မှတ်ထားတဲ့ Logic ကို သင့်လိုအပ်ချက်အရ ပြောင်းလဲနိုင်ပါတယ်။ (ဥပမာ- အပူချိန် 30°C ကျော်ကို HOT, 15°C အောက်ကို COLD စသဖြင့်)
  
  ---