## Arduino LED Blink Project  

![Circuit Diagram](https://res.cloudinary.com/dn4jczzgu/image/upload/f_auto,q_auto/v1793084760/led-run-blink-dark_r3jdr5.webp) 

Arduino UNO R3၊ LED နှင့် Resistor ကို အသုံးပြု၍ LED ကို အချိန်အပိုင်းအခြားအလိုက် အဖွင့်အပိတ်
ပြုလုပ်ပေးသော အခြေခံ Electronics Project ဖြစ်ပါသည်။ Arduino ကို စတင်လေ့လာသူများအတွက်
Digital Output နှင့် Arduino Code ၏ အခြေခံကို လက်တွေ့နားလည်စေမည့် Project တစ်ခုဖြစ်သည်။  

---  

### ၁။ ပရောဂျက်၏ ရည်ရွယ်ချက် (Project Goal)  

ဤ Project ၏ အဓိကရည်ရွယ်ချက်မှာ Arduino UNO R3 ကို အသုံးပြု၍ LED ကို အလိုအလျောက် မှိတ်တုတ်စေရန်
ဖြစ်ပါသည်။

Arduino မှ Digital Signal ထုတ်ပေးခြင်းဖြင့် LED ကို ဖွင့်ခြင်း၊ ပိတ်ခြင်းတို့ ပြုလုပ်နိုင်ပုံနှင့်
pinMode(), digitalWrite()၊ delay() Functions များ၏ အသုံးဝင်ပုံကို
လေ့လာနိုင်မည်ဖြစ်သည်။   

---  

### ၂။ အလုပ်လုပ်ပုံ အကျဉ်းချုပ် (Working Principle)  

Arduino သည် LED ချိတ်ဆက်ထားသော Digital Pin ကို Output အဖြစ် သတ်မှတ်ပြီး အလှည့်ကျ
HIGH နှင့် LOW Signal များ ထုတ်ပေးပါသည်။
- **HIGH** ---> LED ကို ဖွင့်ပေးသည်။
- **LOW** ---> LED ကို ပိတ်ပေးသည်။
- **delay(1000)** ---> ၁၀၀၀ မီလီစက္ကန့်၊ တစ်နည်းအားဖြင့် ၁ စက္ကန့် စောင့်ဆိုင်းစေသည်။
ထို့ကြောင့် Code တွင် HIGH နှင့် LOW တစ်ခုစီပြီးနောက် ၁ စက္ကန့်စောင့်ထားပါက LED သည် ၁
စက္ကန့်လင်းပြီး ၁ စက္ကန့်ပိတ်သည့်ပုံစံဖြင့် အဆက်မပြတ် မှိတ်တုတ်နေမည်ဖြစ်သည်။  

---  

### ၃။ လိုအပ်သော ပစ္စည်းများ (Components List)  

- **Arduino UNO R3** ---> Project ကို ထိန်းချုပ်ရန်
- **LED** ---> အလင်းထုတ်ပေးရန်
- **Resistor (220Ω--330Ω)** ---> LED မှတစ်ဆင့် စီးဆင်းသော လျှပ်စီးကြောင်းကို ကန့်သတ်ရန်
- **Jumper Wires** ---> Components များကို ချိတ်ဆက်ရန်
- **Breadboard** ---> Circuit ကို လွယ်ကူစွာ တည်ဆောက်ရန် (လိုအပ်ပါက)
- **USB Cable** ---> Arduino ကို ကွန်ပျူတာနှင့် ချိတ်ဆက်ပြီး Code Upload လုပ်ရန်  

---  

### ၄။ Component တစ်ခုချင်းစီ၏ အလုပ်လုပ်ပုံ (Component Functions)  
####   ၄.၁။ Arduino UNO R3
ဤ Project ၏ အဓိက Controller ဖြစ်သည်။ Code အတိုင်း Digital Pin မှ Signal
ထုတ်ပေးပြီး LED ကို ဖွင့်ပိတ်ပေးသည်။  
####   ၄.၂။ LED (Light Emitting Diode)
လျှပ်စစ်စီးဆင်းသောအခါ အလင်းထုတ်ပေးသည့် Electronic Component ဖြစ်သည်။ LED တွင် Polarity
ရှိပြီး ပုံမှန်အားဖြင့် ရှည်သောခြေထောက်သည် Anode (+)၊ တိုသောခြေထောက်သည် Cathode (-)
ဖြစ်သည်။  
####   ၄.၃။ Resistor (220Ω--330Ω)
LED မှတစ်ဆင့် စီးဆင်းသော လျှပ်စီးကြောင်းကို ကန့်သတ်ပေးသည်။ LED ကို Arduino Pin နှင့်
တိုက်ရိုက်ချိတ်ဆက်ခြင်းကြောင့် LED သို့မဟုတ် Arduino Pin ပျက်စီးနိုင်သောကြောင့် Resistor ကို
Series အဖြစ် ချိတ်ဆက်အသုံးပြုရပါမည်။  

####   ၄.၄။ Jumper Wires
Arduino၊ Resistor နှင့် LED တို့အကြား လျှပ်စစ်ဆက်သွယ်မှု ပြုလုပ်ပေးသည်။  

---  

### ၅။ ပတ်လမ်းပုံစံ (Circuit Diagram Description)
ဤ Project တွင် Arduino UNO R3 ၏ Digital Pin 13 ကို အသုံးပြု၍ LED ကို ထိန်းချုပ်သည့်
ဥပမာကို ဖော်ပြထားပါသည်။

**ချိတ်ဆက်မှုများ**
- Arduino D13 → Resistor ၏ တစ်ဖက်
- Resistor ၏ ကျန်တစ်ဖက် → LED Anode (+)
- LED Cathode (-) → Arduino GND
Resistor ကို LED ၏ Anode ဘက်တွင်ဖြစ်စေ၊ Cathode ဘက်တွင်ဖြစ်စေ Series အဖြစ်
ချိတ်ဆက်နိုင်ပါသည်။

---  

### ၆။ Arduino Code
အောက်ပါ Code ကို Arduino IDE ထဲသို့ ကူးထည့်ပြီး Arduino UNO R3 သို့ Upload လုပ်နိုင်ပါသည်။

```cpp
const int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH); // LED ကို ဖွင့်မည်
  delay(1000);                // ၁ စက္ကန့် စောင့်မည်

  digitalWrite(ledPin, LOW);  // LED ကို ပိတ်မည်
  delay(1000);                // ၁ စက္ကန့် စောင့်မည်
}
```  

**Code ရှင်းလင်းချက်**
- **const int ledPin = 13;** ---> LED ချိတ်ဆက်ထားသော Pin နံပါတ်ကို သတ်မှတ်သည်။
- **setup()** ---> Arduino စတင်အလုပ်လုပ်ချိန်တွင် တစ်ကြိမ်သာ လုပ်ဆောင်သည်။
- **pinMode(ledPin, OUTPUT);** ---> Pin 13 ကို Output အဖြစ် သတ်မှတ်သည်။
- **loop()** ---> အတွင်းရှိ Code များကို အဆက်မပြတ် ပြန်လည်လုပ်ဆောင်သည်။
- **digitalWrite(ledPin, HIGH);** ---> LED ကို ဖွင့်သည်။
- **digitalWrite(ledPin, LOW);** ---> LED ကို ပိတ်သည်။
- **delay(1000);** ---> ၁ စက္ကန့် စောင့်ဆိုင်းစေသည်။  

---  

### ၇။ စမ်းသပ်ခြင်းနှင့် ပြဿနာဖြေရှင်းခြင်း (Testing & Troubleshooting)  

1. Arduino UNO R3 ကို USB Cable ဖြင့် ကွန်ပျူတာနှင့် ချိတ်ဆက်ပါ။
2. Arduino IDE ထဲတွင် Board ကို Arduino Uno အဖြစ် ရွေးချယ်ပါ။
3. မှန်ကန်သော Port ကို ရွေးချယ်ပါ။
4. အထက်ပါ Code ကို Upload လုပ်ပါ။
5. LED သည် ၁ စက္ကန့်လင်းပြီး ၁ စက္ကန့်ပိတ်နေကြောင်း စစ်ဆေးပါ။  

**LED မလင်းပါက**
- LED ၏ Anode နှင့် Cathode ကို မှန်ကန်စွာ ချိတ်ထားခြင်းရှိမရှိ စစ်ဆေးပါ။
- Resistor နှင့် Jumper Wires များကို ပြန်စစ်ဆေးပါ။
- Code ထဲရှိ Pin နံပါတ်နှင့် Circuit ထဲရှိ Pin နံပါတ် ကိုက်ညီမှုရှိမရှိ စစ်ဆေးပါ။
- Arduino IDE တွင် မှန်ကန်သော Board နှင့် Port ကို ရွေးထားခြင်းရှိမရှိ စစ်ဆေးပါ။  

---  

### ၈။ အားသာချက်နှင့် အားနည်းချက် (Pros & Cons)  

**အားသာချက်များ**
- Arduino စတင်လေ့လာသူများအတွက် လွယ်ကူသည်။
- Digital Output နှင့် အချိန်ထိန်းချုပ်မှုကို လက်တွေ့နားလည်စေသည်။
- Components အနည်းငယ်သာ လိုအပ်သည်။
- Traffic Light၊ Status Indicator နှင့် Warning Light Project များအတွက်
  အခြေခံဖြစ်သည်။  

**အားနည်းချက်များ**
- LED တစ်လုံးတည်းသာ အသုံးပြုထားသောကြောင့် လုပ်ဆောင်ချက် ရိုးရှင်းသည်။
- delay() အသုံးပြုနေချိန်တွင် Arduino သည် အခြားလုပ်ဆောင်ချက်များကို တစ်ပြိုင်နက်
  လုပ်ဆောင်ရန် အကန့်အသတ်ရှိသည်။
- ပိုမိုရှုပ်ထွေးသော Project များတွင် millis() ကဲ့သို့သော Non-blocking Timing
  နည်းလမ်းများကို လေ့လာရန် လိုအပ်နိုင်သည်။    

---    

### ၉။ အသုံးပြုနိုင်သည့် နေရာများ (Use Cases)

- Arduino အခြေခံသင်ခန်းစာများ
- စက်ပစ္စည်း အလုပ်လုပ်နေကြောင်း ပြသသည့် Status Indicator
- Traffic Light Simulation
- Warning Light များ
- Sensor Project များ၏ Output ကို စမ်းသပ်ခြင်း  

---  

### ၁၀။ လက်တွေ့လေ့ကျင့်ခန်း (Practice Exercises)  

1. LED ကို ၀.၅ စက္ကန့်လင်းပြီး ၀.၅ စက္ကန့်ပိတ်အောင် Code ပြောင်းပါ။
2. LED ကို ၂ စက္ကန့်လင်းပြီး ၁ စက္ကန့်ပိတ်အောင် ပြုလုပ်ပါ။
3. LED နှစ်လုံးကို အသုံးပြုပြီး တစ်လုံးလင်းနေချိန်တွင် အခြားတစ်လုံးပိတ်နေအောင် ပြုလုပ်ပါ။
4. delay() အစား millis() ကို အသုံးပြုပြီး LED Blink စနစ် တည်ဆောက်ကြည့်ပါ။  

---  

### ၁၁။ အကျိုးကျေးဇူးများ (Benefits)  

ဤ Project ကို တည်ဆောက်ခြင်းဖြင့် Microcontroller၊ Digital Output၊ LED Polarity၊
Resistor ၏ အခန်းကဏ္ဍနှင့် Arduino Code ၏ အခြေခံဖွဲ့စည်းပုံတို့ကို လက်တွေ့နားလည်လာမည်ဖြစ်သည်။
ထို့နောက် Sensor များ၊ Display များနှင့် Motor များကို ပေါင်းစပ်အသုံးပြုသည့် Project
များသို့ ဆက်လက်တိုးချဲ့နိုင်ပါသည်။
ထပ်မံဖြည့်စွက်ချက်
- ပြင်ပ LED ကို အသုံးပြုရာတွင် Current-Limiting Resistor ကို မဖြစ်မနေ ထည့်သွင်းပါ။
- Arduino UNO R3 ကို USB 5V ဖြင့် Power ပေးနိုင်ပါသည်။ External Power Jack
  အသုံးပြုပါက Board ၏ သတ်မှတ်ချက်များကို လိုက်နာပါ။
- ဤ Project သည် Low-Voltage Learning Circuit ဖြစ်ပြီး အိမ်သုံး AC လျှပ်စစ်နှင့်
  တိုက်ရိုက် မချိတ်ဆက်ရပါ။

  - [To View The Circuit Simulation](https://www.rde-mm.com/circuit/?project=project-1791991873555-258ice)