## Keypad (ခလုတ်နှိပ်၍ အချက်အလက်ထည့်သွင်းသည့် ကိရိယာ)

### 1. Overview (အကျဉ်းချုပ်)

A **keypad** is an input device that allows users to enter numerical or other data by pressing physical buttons. It is commonly used in embedded systems to provide user input without requiring a keyboard or touchscreen.

**Keypad** ဆိုသည်မှာ ခလုတ်များကို နှိပ်ခြင်းဖြင့် နံပါတ်များ၊ သင်္ကေတများ သို့မဟုတ် အခြားအချက်အလက်များကို ထည့်သွင်းနိုင်သည့် Input Device တစ်မျိုးဖြစ်သည်။ Embedded System များတွင် အသုံးပြုသူနှင့် Electronic Circuit ကြား အပြန်အလှန်ဆက်သွယ်မှု ပြုလုပ်ပေးသည်။

အသုံးများသော ဥပမာများမှာ 4×4 Matrix Keypad၊ Calculator၊ Digital Door Lock နှင့် ATM စက်များဖြစ်သည်။

### 2. Working Principle (အလုပ်လုပ်ပုံ)

#### 2.1 Matrix Keypad

A matrix keypad arranges its buttons into rows and columns. Instead of connecting every button to a separate microcontroller pin, the circuit shares row and column connections to reduce the number of required pins.

Matrix Keypad တစ်ခုတွင် ခလုတ်များကို **Row (အတန်း)** နှင့် **Column (ကော်လံ)** များအဖြစ် စီစဉ်ထားသည်။ ခလုတ်တစ်ခုကို နှိပ်လိုက်သည့်အခါ သက်ဆိုင်ရာ Row နှင့် Column လမ်းကြောင်းသည် လျှပ်စစ်ဆက်သွယ်မှု ရရှိသွားသည်။ Microcontroller က Row နှင့် Column များ၏ အခြေအနေကို စစ်ဆေးပြီး မည်သည့်ခလုတ်ကို နှိပ်ထားသည်ကို သတ်မှတ်နိုင်သည်။

ဥပမာအားဖြင့် 4×4 Matrix Keypad တွင်—

- Row လိုင်း ၄ လိုင်း
- Column လိုင်း ၄ လိုင်း
- စုစုပေါင်း GPIO လိုင်း ၈ လိုင်း

လိုအပ်သည်။ ခလုတ် ၁၆ ခုစီအတွက် GPIO pin တစ်ခုစီ သီးသန့်အသုံးပြုရန် မလိုအပ်ပါ။

#### 2.2 Key Scanning (ခလုတ်ရှာဖွေခြင်း)

Microcontroller သည် Row များကို အလှည့်ကျ စစ်ဆေးပြီး Column များ၏ အခြေအနေကို ဖတ်ရှုသည်။ Row နှင့် Column တို့မှ ရရှိသော အချက်အလက်ကို အသုံးပြု၍ နှိပ်ထားသော ခလုတ်ကို သတ်မှတ်သည်။

အမှန်တကယ် scan လုပ်ပုံသည် အသုံးပြုသော library၊ wiring နှင့် keypad အမျိုးအစားပေါ် မူတည်နိုင်သည်။ ခလုတ်များစွာကို တစ်ပြိုင်နက်နှိပ်သောအခါ ghosting ဖြစ်နိုင်ပြီး၊ လိုအပ်ပါက diode များ သို့မဟုတ် သင့်လျော်သော keypad design ကို အသုံးပြုရသည်။

### 3. Types of Keypads (Keypad အမျိုးအစားများ)

#### 3.1 Numeric Keypad

နံပါတ်များကို အဓိကထည့်သွင်းရန် ဒီဇိုင်းပြုလုပ်ထားသည်။ Calculator၊ Digital Lock နှင့် Access Control စနစ်များတွင် တွေ့ရသည်။

#### 3.2 Matrix Keypad

ခလုတ်များကို Row နှင့် Column ပုံစံဖြင့် ချိတ်ဆက်ထားသည်။ အသုံးများသော ပုံစံများမှာ—

- **3×4 Keypad:** ခလုတ် ၁၂ ခု၊ ပုံမှန်အားဖြင့် `0–9`, `*`, `#`
- **4×4 Keypad:** ခလုတ် ၁၆ ခု၊ နံပါတ်များနှင့် အပိုသင်္ကေတများ ပါဝင်နိုင်သည်။

#### 3.3 Membrane Keypad

ပါးလွှာသော အလွှာများဖြင့် ပြုလုပ်ထားပြီး ခလုတ်ကို နှိပ်သောအခါ အတွင်းရှိ conductive contact များ ထိတွေ့ကာ input signal ဖြစ်ပေါ်စေသည်။ အိမ်သုံးပစ္စည်းများနှင့် စက်မှုထိန်းချုပ်ရေး panel များတွင် အသုံးပြုသည်။

### 4. Applications (အသုံးပြုမှုများ)

- **Digital Door Lock:** PIN code ဖြင့် တံခါးဖွင့်ခြင်း။
- **Calculator:** သင်္ချာဆိုင်ရာ input များ ထည့်သွင်းခြင်း။
- **Security System:** Password သို့မဟုတ် access code ထည့်သွင်းခြင်း။
- **Embedded Systems:** Arduino သို့မဟုတ် အခြား Microcontroller များသို့ အသုံးပြုသူ၏ အမိန့်များ ပေးပို့ခြင်း။
- **Industrial Control:** စက်ပစ္စည်းများ၏ တန်ဖိုးများနှင့် လုပ်ဆောင်ချက်များ သတ်မှတ်ခြင်း။

### 5. Connecting a Keypad to Arduino (Arduino နှင့် ချိတ်ဆက်ခြင်း)

4×4 Matrix Keypad ကို Arduino Uno နှင့် ချိတ်ဆက်ရာတွင် Row လိုင်း ၄ လိုင်းနှင့် Column လိုင်း ၄ လိုင်းကို Digital GPIO pin များသို့ ချိတ်ဆက်နိုင်သည်။

ဥပမာ Pin Mapping—

| Keypad Pin | Arduino Uno Pin |
|---|---|
| R1 | D9 |
| R2 | D8 |
| R3 | D7 |
| R4 | D6 |
| C1 | D5 |
| C2 | D4 |
| C3 | D3 |
| C4 | D2 |

ဤ Pin Mapping သည် ဥပမာတစ်ခုသာ ဖြစ်သည်။ Keypad ၏ pin order သည် မော်ဒယ်အလိုက် ကွဲပြားနိုင်သောကြောင့် ထုတ်လုပ်သူ၏ pin diagram ကို စစ်ဆေးပြီးမှ ချိတ်ဆက်ပါ။

#### Basic Arduino Example

အောက်ပါဥပမာသည် Arduino တွင် `Keypad` library ကို အသုံးပြုပြီး နှိပ်လိုက်သော ခလုတ်ကို Serial Monitor တွင် ဖော်ပြပေးသည်။


## Example: Arduino C++ Code

```cpp
const int ledPin = 13;

void setup() {
    pinMode(ledPin, OUTPUT);
}

void loop() {
    digitalWrite(ledPin, HIGH);
    delay(1000);

    digitalWrite(ledPin, LOW);
    delay(1000);
}
```

**သတိပြုရန်:** ဤဥပမာကို အသုံးပြုရန် Arduino IDE ထဲတွင် သင့်လျော်သော `Keypad` library ကို ထည့်သွင်းထားရမည်။ Pin Mapping သည် အထက်ပါ wiring ဥပမာနှင့် ကိုက်ညီရမည်။

### 6. Important Concepts (အရေးကြီးသော အယူအဆများ)

- **GPIO:** Microcontroller နှင့် ပြင်ပပစ္စည်းများကြား digital signal များ ပေးပို့လက်ခံရန် အသုံးပြုသော pin များ။
- **Matrix Scanning:** Row နှင့် Column များကို စစ်ဆေးပြီး နှိပ်ထားသော ခလုတ်ကို ရှာဖွေခြင်း။
- **Debouncing:** ခလုတ်ကို နှိပ်ချိန်တွင် contact များ၏ ယာယီတုန်ခါမှုကြောင့် input တစ်ခုကို အကြိမ်များစွာ ဖတ်မိခြင်းအား ကာကွယ်ခြင်း။ Library အများစုတွင် debouncing အတွက် သင့်လျော်သော ကိုင်တွယ်မှု ပါဝင်သည်။
- **Input Validation:** အသုံးပြုသူထည့်သွင်းသော PIN သို့မဟုတ် အချက်အလက်များကို မှန်ကန်မှုရှိမရှိ စစ်ဆေးခြင်း။

### 7. Further Learning (ဆက်လက်လေ့လာရန်)

- [Arduino Documentation](https://docs.arduino.cc/)
- [Arduino Keypad Library](https://github.com/Chris--A/Keypad)

### 8. Learning Outcomes (သင်ယူပြီးနောက် ရရှိမည့် အရည်အချင်းများ)

ဤသင်ခန်းစာကို လေ့လာပြီးနောက် သင်သည်—

1. Keypad ၏ အလုပ်လုပ်ပုံကို ရှင်းပြနိုင်မည်။
2. Matrix Keypad ၏ Row နှင့် Column ဖွဲ့စည်းပုံကို နားလည်နိုင်မည်။
3. Keypad ကို Arduino နှင့် ချိတ်ဆက်နိုင်မည်။
4. Arduino code ဖြင့် နှိပ်ထားသော ခလုတ်ကို ဖတ်ရှုနိုင်မည်။
5. Keypad ကို အသုံးပြု၍ PIN Lock ကဲ့သို့သော Embedded System project များ စတင်တည်ဆောက်နိုင်မည်။
