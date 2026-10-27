## Arduino Keypad Password Door Lock System

Arduino ကို အသုံးပြုပြီး Keypad မှတစ်ဆင့် Password ရိုက်ထည့်ကာ တံခါးကို အလိုအလျောက် ဖွင့်ပိတ်နိုင်သော Electronic Door Lock Project ဖြစ်ပါသည်။ LCD Display မှတစ်ဆင့် စနစ်၏အခြေအနေကို ပြသပေးပြီး Password မှန်၊ မမှန်အပေါ် မူတည်၍ Servo Motor၊ Buzzer နှင့် LED များကို ထိန်းချုပ်ပေးနိုင်ပါသည်။

---

### ၁။ ပရောဂျက်၏ ရည်ရွယ်ချက် (Project Goal)

ဤ Project ၏ အဓိကရည်ရွယ်ချက်မှာ Arduino နှင့် Electronic Components များကို အသုံးပြု၍ Password အခြေပြု လုံခြုံရေးစနစ်တစ်ခု တည်ဆောက်ရန် ဖြစ်ပါသည်။

အသုံးပြုသူသည် Keypad မှတစ်ဆင့် Password ကို ရိုက်ထည့်နိုင်ပြီး Password မှန်ကန်ပါက Servo Motor သည် တံခါးဖွင့်သည့် လုပ်ဆောင်ချက်ကို ပြုလုပ်ပေးမည်ဖြစ်သည်။ Password မှားယွင်းပါက Buzzer နှင့် LED များမှတစ်ဆင့် သတိပေးနိုင်ပါသည်။

---

### ၂။ အလုပ်လုပ်ပုံ အကျဉ်းချုပ် (Working Principle)

Arduino သည် ဤစနစ်၏ အဓိကထိန်းချုပ်ရေးယူနစ်ဖြစ်သည်။ အသုံးပြုသူက 4×4 Keypad မှတစ်ဆင့် Password ရိုက်ထည့်သည့်အခါ Arduino သည် ထည့်သွင်းလိုက်သော Password ကို သတ်မှတ်ထားသော Password နှင့် နှိုင်းယှဉ်စစ်ဆေးပါသည်။

- **Password မှန်ကန်ပါက** LCD တွင် `Access Granted` ဟု ပြသပြီး Servo Motor ကို လှည့်ပေးကာ တံခါးဖွင့်သည့် လုပ်ဆောင်ချက်ကို ပြုလုပ်ပေးပါသည်။
- **Password မှားယွင်းပါက** LCD တွင် `Wrong Password` ဟု ပြသပြီး Buzzer မှ အသံပေးကာ အနီရောင် LED ကို ဖွင့်ပေးနိုင်ပါသည်။
- **အောင်မြင်စွာ ဝင်ရောက်နိုင်ပါက** အစိမ်းရောင် LED ကို ဖွင့်ပေး၍ ဝင်ရောက်ခွင့်ရရှိကြောင်း ပြသနိုင်ပါသည်။

ဤလုပ်ဆောင်ချက်များကို Arduino Code မှတစ်ဆင့် ထိန်းချုပ်ထားခြင်းဖြစ်ပါသည်။

---

### ၃။ လိုအပ်သော ပစ္စည်းများ (Components List)

- **Arduino Uno** — စနစ်တစ်ခုလုံးကို ထိန်းချုပ်ရန်
- **4×4 Matrix Keypad** — Password ရိုက်ထည့်ရန်
- **LCD1602 Display** — စနစ်၏ အခြေအနေနှင့် အမှာစာများကို ပြသရန်
- **Servo Motor** — တံခါးဖွင့်ပိတ်သည့် လှုပ်ရှားမှုကို ပြုလုပ်ရန်
- **Buzzer** — သတိပေးအသံ ထုတ်ပေးရန်
- **Red LED** — Password မှားယွင်းမှုကို ပြသရန်
- **Green LED** — Password မှန်ကန်မှုကို ပြသရန်
- **Resistors** — LED များမှတစ်ဆင့် စီးဆင်းသော လျှပ်စီးကြောင်းကို ကန့်သတ်ရန်
- **Breadboard** — Circuit တည်ဆောက်ရန်
- **Jumper Wires** — Components များကို ချိတ်ဆက်ရန်
- **သင့်လျော်သော Power Supply** — Arduino နှင့် Components များကို လျှပ်စစ်စွမ်းအင် ပေးရန်

---

### ၄။ Component တစ်ခုချင်းစီ၏ အလုပ်လုပ်ပုံ (Component Functions)

**1. Arduino Uno**

ဤ Project ၏ အဓိက Controller ဖြစ်သည်။ Keypad မှ ရရှိလာသော Input များကို ဖတ်ရှုပြီး Password စစ်ဆေးခြင်း၊ LCD ကို ထိန်းချုပ်ခြင်း၊ Servo Motor လှည့်ခြင်းနှင့် Buzzer၊ LED များကို ဖွင့်ပိတ်ခြင်းတို့ကို လုပ်ဆောင်ပေးပါသည်။

**2. 4×4 Keypad**

အသုံးပြုသူက Password ရိုက်ထည့်ရန် အသုံးပြုသည်။ နံပါတ်များအပြင် `*` နှင့် `#` ကဲ့သို့သော ခလုတ်များကိုလည်း Password ဖျက်ခြင်း သို့မဟုတ် အတည်ပြုခြင်းအတွက် သတ်မှတ်အသုံးပြုနိုင်ပါသည်။

**3. LCD1602 Display**

အသုံးပြုသူအား `Enter Password`, `Access Granted` နှင့် `Wrong Password` ကဲ့သို့သော စာသားများ ပြသပေးပါသည်။

**4. Servo Motor**

Arduino မှ ပေးပို့သော Control Signal အပေါ် မူတည်၍ သတ်မှတ်ထားသော ထောင့်အတိုင်း လှည့်ပေးပါသည်။ ဤ Project တွင် တံခါးသော့ဖွင့်ခြင်းနှင့် ပြန်ပိတ်ခြင်းကို သရုပ်ပြရန် အသုံးပြုနိုင်ပါသည်။

**5. Buzzer**

Password မှားယွင်းသည့်အခါ သို့မဟုတ် သတ်မှတ်ထားသော အခြေအနေတစ်ခု ဖြစ်ပေါ်သည့်အခါ အသံဖြင့် သတိပေးရန် အသုံးပြုပါသည်။

**6. Red LED နှင့် Green LED**

Red LED သည် Password မှားယွင်းမှုကိုလည်းကောင်း၊ Green LED သည် Password မှန်ကန်ပြီး ဝင်ရောက်ခွင့်ရရှိမှုကိုလည်းကောင်း ဖော်ပြပေးနိုင်ပါသည်။

**7. Breadboard နှင့် Jumper Wires**

Electronic Components များကို Soldering မလုပ်ဘဲ ချိတ်ဆက်တည်ဆောက်ရန် အသုံးပြုပါသည်။

---

### ၅။ ပတ်လမ်းပုံစံ (Circuit Diagram Description)

![Circuit Diagram](https://res.cloudinary.com/dn4jczzgu/image/upload/f_auto,q_auto/v1793082504/keypad-d-run_hvfe0r.webp) 

ဤ Circuit တွင် Arduino Uno ကို အဓိက Controller အဖြစ် အသုံးပြုထားပြီး Keypad၊ LCD1602၊ Servo Motor၊ Buzzer နှင့် LED များကို ချိတ်ဆက်ထားပါသည်။

**Keypad နှင့် Arduino ချိတ်ဆက်မှု**

Keypad ၏ Row နှင့် Column Pins များကို Arduino ၏ Digital Pins များသို့ ချိတ်ဆက်ပေးရပါမည်။ သတ်မှတ်ထားသော Pin များသည် Arduino Code ထဲရှိ Keypad Configuration နှင့် ကိုက်ညီရပါမည်။

**LCD1602 နှင့် Arduino ချိတ်ဆက်မှု**

LCD ကို အသုံးပြုသည့် Interface အမျိုးအစားပေါ်မူတည်၍ ချိတ်ဆက်ရမည့် Pin များ ကွာခြားနိုင်ပါသည်။ ဥပမာ 4-bit Parallel Mode တွင် RS၊ E နှင့် Data Pins များကို အသုံးပြုရပြီး I2C Module ပါဝင်ပါက SDA နှင့် SCL ကို အသုံးပြုနိုင်ပါသည်။

**Servo Motor နှင့် Arduino ချိတ်ဆက်မှု**

- Signal — Arduino ၏ သတ်မှတ်ထားသော Digital Pin
- VCC — Servo သတ်မှတ်ချက်နှင့် ကိုက်ညီသော Power Supply
- GND — Ground

**Buzzer နှင့် LED များ ချိတ်ဆက်မှု**

Buzzer နှင့် LED များကို Arduino ၏ သတ်မှတ်ထားသော Output Pins များသို့ ချိတ်ဆက်ပေးရပါမည်။ LED တစ်ခုစီအတွက် သင့်လျော်သော Current-Limiting Resistor ကို အသုံးပြုသင့်ပါသည်။

**မှတ်ချက်:** ဤစာပိုဒ်တွင် Circuit ၏ အလုပ်လုပ်ပုံကို ရှင်းပြထားခြင်းဖြစ်ပြီး အတိအကျ Pin နံပါတ်များသည် လက်ရှိ Circuit နှင့် Arduino Code အပေါ် မူတည်ပါသည်။

---

### ၆။ Arduino Code

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Keypad.h>
#include <Servo.h>

// I2C LCD (Address 0x27 သို့မဟုတ် 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo myServo;

const byte ROWS = 4; 
const byte COLS = 4; 

char hexaKeys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte rowPins[ROWS] = {9, 8, 7, 6};    // Keypad Row Pins
byte colPins[COLS] = {5, 4, 3, 2};    // Keypad Column Pins

Keypad customKeypad = Keypad(makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS);

String masterPassword = "1234"; // သတ်မှတ်ထားသော Password
String inputPassword = "";

const int buzzerPin = 10;
const int greenLed = 13;
const int redLed = 12;

void setup() {
  lcd.init();
  lcd.backlight();
  myServo.attach(11);
  myServo.write(0); // တံခါးပိတ်ထားသည့် အနေအထား ($0^\circ$)

  pinMode(buzzerPin, OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);

  showEnterPrompt();
}

void loop() {
  char customKey = customKeypad.getKey();

  if (customKey) {
    // ခလုတ်နှိပ်တိုင်း အသံမြည်ရန်
    tone(buzzerPin, 1000);
    delay(50);
    noTone(buzzerPin);

    // '#' ခလုတ်နှိပ်ပါက Enter လုပ်မည်
    if (customKey == '#') {
      if (inputPassword == masterPassword) {
        // Password မှန်လျှင်
        lcd.clear();
        lcd.print("Access Granted!");
        digitalWrite(greenLed, HIGH);
        myServo.write(90); // တံခါးဖွင့်ရန် Servo $90^\circ$ လှည့်မည်
        delay(3000);
        
        myServo.write(0);  // တံခါးပြန်ပိတ်မည်
        digitalWrite(greenLed, LOW);
      } else {
        // Password မှားလျှင်
        lcd.clear();
        lcd.print("Access Denied!");
        digitalWrite(redLed, HIGH);
        digitalWrite(buzzerPin, HIGH);
        delay(1500);
        digitalWrite(redLed, LOW);
        digitalWrite(buzzerPin, LOW);
      }
      inputPassword = ""; // Password ပြန်ရှင်းမည်
      showEnterPrompt();
    } 
    // '*' ခလုတ်နှိပ်ပါက ရိုက်ထားသည်များကို Clear ပြန်လုပ်မည်
    else if (customKey == '*') {
      inputPassword = "";
      showEnterPrompt();
    } 
    // စာလုံး ရိုက်ထည့်ခြင်း
    else {
      inputPassword += customKey;
      lcd.setCursor(inputPassword.length() - 1, 1);
      lcd.print(customKey); // စကားဝှက်ကို မမြင်ရအောင် * ဖြင့်ပြမည်
    }
  }
}

void showEnterPrompt() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Enter Password:");
  lcd.setCursor(0, 1);
}
```  

ဤ Project အတွက် Arduino Code သည် Keypad မှ Password ဖတ်ခြင်း၊ Password စစ်ဆေးခြင်း၊ LCD ပေါ်တွင် စာသားပြသခြင်းနှင့် Servo Motor၊ Buzzer၊ LED များကို ထိန်းချုပ်ခြင်းတို့ ပါဝင်ရပါမည်။

Code ရေးသားရာတွင် အောက်ပါ Logic ကို အခြေခံနိုင်ပါသည်။

1. Arduino Pins များနှင့် LCD၊ Keypad၊ Servo တို့ကို Initialize ပြုလုပ်ပါ။
2. LCD တွင် `Enter Password` ဟု ပြသပါ။
3. Keypad မှ ရိုက်ထည့်သော နံပါတ်များကို ဖတ်ယူပါ။
4. `#` ကို နှိပ်သည့်အခါ Password ကို စစ်ဆေးပါ။
5. Password မှန်ပါက Servo ကို ဖွင့်သည့်ထောင့်သို့ လှည့်ပြီး Green LED ကို ဖွင့်ပါ။
6. Password မှားပါက Buzzer အသံပေးပြီး Red LED ကို ဖွင့်ပါ။
7. လုပ်ဆောင်ချက်ပြီးဆုံးသည့်အခါ နောက်တစ်ကြိမ် Password ထည့်သွင်းနိုင်ရန် ပြန်လည်စောင့်ဆိုင်းပါ။

**မှတ်ချက်:** အထက်ပါအချက်များသည် Code ၏ လုပ်ဆောင်ချက်ဖော်ပြချက်ဖြစ်ပြီး တိုက်ရိုက် Upload တင်နိုင်သော Arduino Code အပြည့်အစုံ မဟုတ်ပါ။

---

### ၇။ အားသာချက်နှင့် အားနည်းချက် (Pros & Cons)

**အားသာချက်များ**

- ရိုးရိုးသော့အစား Password အသုံးပြုသည့် Electronic Lock System တစ်ခုကို လက်တွေ့တည်ဆောက်နိုင်ခြင်း။
- Keypad၊ LCD၊ Servo Motor နှင့် Buzzer တို့ကို Arduino ဖြင့် ပေါင်းစပ်ထိန်းချုပ်နိုင်ခြင်း။
- Embedded Systems နှင့် Digital Input/Output များ၏ အလုပ်လုပ်ပုံကို လေ့လာနိုင်ခြင်း။
- နောက်ပိုင်းတွင် RFID၊ Fingerprint Sensor သို့မဟုတ် IoT Control စနစ်များဖြင့် တိုးချဲ့နိုင်ခြင်း။

**အားနည်းချက်များ**

- Password ကို Code ထဲတွင်သာ သတ်မှတ်ထားပါက ပြောင်းလဲစီမံရန် အဆင်မပြေနိုင်ခြင်း။
- Password ကို အကြိမ်ကြိမ် မှားယွင်းရိုက်ထည့်ခြင်းအတွက် ကာကွယ်ရေးစနစ် ထပ်မံထည့်သွင်းရန် လိုအပ်ခြင်း။
- Servo Motor သည် တကယ့်တံခါး၏ အလေးချိန်ကို ထိန်းချုပ်ရန် လုံလောက်သော Torque မရှိနိုင်ခြင်း။
- Power Supply မလုံလောက်ပါက Servo လှုပ်ရှားမှု မတည်ငြိမ်ခြင်း သို့မဟုတ် Arduino Reset ဖြစ်ခြင်းတို့ ဖြစ်နိုင်ခြင်း။

---

### ၈။ အသုံးပြုနိုင်သည့် နေရာများ (Use Cases)

- အိမ်တွင်းရှိ အခန်းငယ်များ၏ Electronic Door Lock Prototype များ။
- ရုံးခန်းနှင့် သိုလှောင်ခန်းများအတွက် Password Access Control စနစ်များ။
- ကျောင်းသားများ၏ Arduino နှင့် Embedded Systems လက်တွေ့ Project များ။
- နောက်ပိုင်း RFID၊ Fingerprint နှင့် IoT နည်းပညာများ ထပ်မံပေါင်းစပ်မည့် Smart Security System များ။

---

### ၉။ အကျိုးကျေးဇူးများ (Benefits)

ဤ Project ကို တည်ဆောက်ခြင်းဖြင့် Arduino ဖြင့် Sensor များနှင့် Input Devices များမှ Data ဖတ်ယူပုံ၊ LCD Display ဖြင့် အသုံးပြုသူအား အချက်အလက်ပြသပုံနှင့် Output Devices များကို ထိန်းချုပ်ပုံတို့ကို လက်တွေ့လေ့လာနိုင်မည်ဖြစ်သည်။

ထို့အပြင် Conditional Statements၊ Password Validation၊ Servo Control နှင့် Hardware Integration တို့ကို လေ့လာနိုင်သဖြင့် ပိုမိုရှုပ်ထွေးသော Smart Security System များ တည်ဆောက်ရန် အခြေခံကောင်းတစ်ခု ဖြစ်လာနိုင်ပါသည်။

---

### ထပ်မံဖြည့်စွက်ချက်

- **Password:** Code ထဲတွင် သတ်မှတ်ထားသော Password ကို မိမိလိုအပ်ချက်နှင့်အညီ ပြောင်းလဲနိုင်ပါသည်။
- **Keypad Configuration:** Row နှင့် Column Pins များသည် Code ထဲရှိ Pin Mapping နှင့် ကိုက်ညီရပါမည်။
- **Servo Angle:** တံခါးဖွင့်ခြင်းနှင့် ပိတ်ခြင်းအတွက် Servo ထောင့်များကို စမ်းသပ်ချိန်ညှိရန် လိုအပ်ပါသည်။
- **Power Supply:** Servo Motor အတွက် လိုအပ်သော Current ကို ပေးနိုင်သည့် Power Supply ကို အသုံးပြုပါ။
- **Safety:** ဤ Project သည် သင်ကြားရေး Prototype ဖြစ်သည်။ တကယ့်တံခါးတွင် အသုံးပြုမည်ဆိုပါက သင့်လျော်သော Lock Mechanism နှင့် အပိုလုံခြုံရေးစနစ်များ ထပ်မံထည့်သွင်းရန် လိုအပ်ပါသည်။

- [To View The Circuit Simulation](/circuit/?project=project-1792986116717-510d2v)
