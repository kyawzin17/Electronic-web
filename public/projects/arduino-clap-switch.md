## Arduino Clap Switch System (Sound Activated Light)

လက်ခုပ်တီးသံကို အာရုံခံပြီး လျှပ်စစ်ပစ္စည်းများကို အဖွင့်အပိတ် ပြုလုပ်နိုင်သော Smart Home Project တစ်ခု ဖြစ်ပါသည်။

---

### ၁။ ပရောဂျက်၏ ရည်ရွယ်ချက် (Project Goal)
ဤ Project ၏ အဓိကရည်ရွယ်ချက်မှာ အသံဖမ်း Sensor (Sound Sensor) ကို အသုံးပြု၍ အသံလှိုင်းမှတစ်ဆင့် Relay Module ကို ထိန်းချုပ်ရန်နှင့် နေအိမ်သုံး လျှပ်စစ်မီးများကို ခလုတ်နှိပ်ရန်မလိုဘဲ လက်ခုပ်တီးရုံဖြင့် အဖွင့်အပိတ် လုပ်ဆောင်နိုင်ရန် ဖြစ်သည်။

---

### ၂။ အလုပ်လုပ်ပုံ အကျဉ်းချုပ် (Working Principle)
Sound Sensor Module သည် ပတ်ဝန်းကျင်ရှိ အသံများကို အမြဲနားထောင်နေပြီး လက်ခုပ်တီးသံကဲ့သို့ ကျယ်လောင်သော အသံတစ်ခု (Sound Threshold) ထွက်ပေါ်လာပါက Arduino ထံသို့ Digital Signal တစ်ခု ပေးပို့သည်။ Arduino သည် ထို Signal ကို လက်ခံရရှိတိုင်း Relay ၏ လက်ရှိအခြေအနေ (State) ကို ပြောင်းလဲပေးသည် (OFF ဖြစ်နေလျှင် ON ပေးပြီး ON ဖြစ်နေလျှင် OFF ပေးသည်)။

---

### ၃။ လိုအပ်သော ပစ္စည်းများ (Components List)
*   **Arduino Uno R3**
*   **Sound Sensor Module (KY-038 သို့မဟုတ် အလားတူ)**
*   **5V Relay Module** (220V AC load ကို ထိန်းချုပ်ရန်)
*   **LED** (စမ်းသပ်ရန်အတွက်)
*   **Breadboard & Jumper Wires**
*   **AC Bulb & Holder** (Optional - High Voltage ဖြစ်၍ သတိပြုရန်)

---

### ၄။ တစ်ခုချင်းစီ၏ အလုပ်လုပ်ပုံ (Component Functions)

http://googleusercontent.com/image_content/172



1.  **Sound Sensor:** ပတ်ဝန်းကျင်မှ အသံလှိုင်းကို ဖမ်းယူပြီး လျှပ်စစ် Signal အဖြစ် ပြောင်းလဲပေးသည်။ Module ပေါ်ရှိ Potentiometer ကို လှည့်၍ အသံမည်မျှ ကျယ်မှ အလုပ်လုပ်မည်ကို ညှိယူနိုင်သည်။
2.  **Arduino Uno:** Sensor မှ လာသော Pulse ကို ဖတ်ပြီး Relay ကို မည်သည့်အချိန်တွင် Switch လုပ်ရမည်ဆိုသော Logic ကို ကိုင်တွယ်သည်။
3.  **Relay Module:** Arduino မှ လာသော 5V signal သေးသေးလေးဖြင့် 220V AC မီးသီးကြီးများကို ဘေးကင်းစွာ ခလုတ်ဖွင့်/ပိတ် ပေးသည်။

http://googleusercontent.com/image_content/183



---

### ၅။ ပတ်လမ်းပုံစံ (Circuit Diagram Description)

http://googleusercontent.com/image_content/185



*   **Sound Sensor:** VCC -> 5V, GND -> GND, OUT -> Pin 7.
*   **Relay Module:** VCC -> 5V, GND -> GND, IN -> Pin 8.
*   **AC Connection:** Relay ၏ Common (COM) နှင့် Normally Open (NO) ငုတ်များကို မီးသီးနှင့် ခလုတ်တစ်ခုသဖွယ် ကြားကဖြတ်၍ ဆက်သွယ်ပါ။

---

### ၆။ Arduino Code

```cpp
// Project: Arduino Clap Switch
// Author: Red Dragon Electronic

const int soundSensor = 7; // Sensor Pin
const int relayPin = 8;    // Relay Pin

int clapCount = 0;
bool lightState = false;
unsigned long lastClapTime = 0;
int clapInterval = 200;    // Double clap ကာကွယ်ရန် interval

void setup() {
  pinMode(soundSensor, INPUT);
  pinMode(relayPin, OUTPUT);
  
  digitalWrite(relayPin, HIGH); // Relay အများစုက LOW မှာ ON တတ်လို့ အစမှာ HIGH ထားပါ
  Serial.begin(9600);
}

void loop() {
  int sensorValue = digitalRead(soundSensor);

  if (sensorValue == LOW) { // အသံဖမ်းမိရင် (Sensor ပေါ်မူတည်ပြီး HIGH/LOW ကွာနိုင်သည်)
    if (millis() - lastClapTime > clapInterval) {
      lightState = !lightState; // State ပြောင်းလဲခြင်း
      
      if (lightState) {
        digitalWrite(relayPin, LOW); // Relay ON
      } else {
        digitalWrite(relayPin, HIGH); // Relay OFF
      }
      
      lastClapTime = millis();
      delay(100); // Debouncing delay
    }
  }
}
```  
---

### ၇။ အားသာချက်နှင့် အားနည်းချက် (Pros & Cons)
#### အားသာချက်များ~

* ကိုယ်တိုင်သွားရောက် ပိတ်ရန် ခက်ခဲသော နေရာများအတွက် အဆင်ပြေခြင်း။

* Smart Home စနစ်များတွင် အခြေခံအကျဆုံးနှင့် စိတ်ဝင်စားစရာ အကောင်းဆုံးဖြစ်ခြင်း။

#### အားနည်းချက်များ~

* တခြားသော ကျယ်လောင်သည့် အသံများ (ဥပမာ- တံခါးပိတ်သံ၊ ပစ္စည်းပြုတ်ကျသံ) ကြောင့် မှားယွင်းစွာ အလုပ်လုပ်နိုင်ခြင်း။

* Sensor ၏ Sensitivity ကို သေချာညှိယူရန် လိုအပ်ခြင်း။

### ၈။ အသုံးပြုနိုင်သည့် နေရာများ (Use Cases)
* အိပ်ယာမှ မထဘဲ မီးအဖွင့်အပိတ် လုပ်လိုသည့် အိပ်ခန်းများ။

* မသန်စွမ်းသူများအတွက် လွယ်ကူသော Switch စနစ်။

* ပြပွဲများတွင် ပြသရန် အံ့ဩဖွယ်ရာ နည်းပညာပစ္စည်း။

### ၉။ အကျိုးကျေးဇူးများ (Benefits)
ဤ Project ကို လုပ်ဆောင်ခြင်းဖြင့် Digital Input များ၏ Debouncing ပြဿနာကို နားလည်လာမည်ဖြစ်ပြီး Relay ကို အသုံးပြု၍ High Voltage ပစ္စည်းများကို ဘေးကင်းစွာ မည်သို့ ထိန်းချုပ်ရမည်ကို လက်တွေ့ လေ့လာနိုင်မည် ဖြစ်သည်။


---

### သတိပြုရန် (Safety Note):
>  မီးသီးအစစ် (220V AC) နဲ့ စမ်းသပ်တဲ့အခါ လျှပ်စစ်အန္တရာယ်ရှိတာမို့ သေချာသတိထားပါ။ ပထမဆုံး စမ်းသပ်တဲ့အခါ Relay နေရာမှာ **LED** နဲ့ စမ်းသပ်ပြီး အလုပ်လုပ်မှ Relay ကို အစစ်အမှန် မီးသီးနဲ့ ချိတ်ဆက်ပါ။   

---