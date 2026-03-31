## Ultrasonic Distance Sensor with LCD & Alarm System

အရာဝတ္ထုတစ်ခုနှင့် အကွာအဝေးကို တိကျစွာတိုင်းတာပြီး သတ်မှတ်ထားသော အကွာအဝေးအတွင်း ရောက်ရှိပါက သတိပေးချက်ထုတ်ပေးမည့် Arduino Project ဖြစ်ပါသည်။

---

### ၁။ ပရောဂျက်၏ ရည်ရွယ်ချက် (Project Goal)
ဤ Project ၏ အဓိကရည်ရွယ်ချက်မှာ Ultrasonic Sensor ကို အသုံးပြု၍ အရာဝတ္ထုများ၏ အကွာအဝေးကို တိုင်းတာရန်နှင့် အကွာအဝေး ၂၀ စင်တီမီတာ (20cm) အောက်ရောက်ပါက အသံနှင့် အလင်းဖြင့် သတိပေးစနစ် (Alarm System) တစ်ခု တည်ဆောက်ရန် ဖြစ်သည်။

---

### ၂။ အလုပ်လုပ်ပုံ အကျဉ်းချုပ် (Working Principle)
Ultrasonic Sensor မှ အသံလှိုင်း (Ultrasonic Waves) များကို ထုတ်လွှတ်ပြီး အရာဝတ္ထုတစ်ခုတွင် ရိုက်မိ၍ ပြန်လာသော အချိန်ကို တိုင်းတာပါသည်။ ထိုအချိန်ကို အခြေခံ၍ အကွာအဝေးကို တွက်ချက်ပြီး LCD Display ပေါ်တွင် ဖော်ပြပေးပါသည်။ အကယ်၍ တိုင်းတာရရှိသော အကွာအဝေးသည် 20cm ထက် နည်းသွားပါက Arduino မှ Buzzer ကို အသံမြည်စေပြီး LED ကို လင်းစေမည် ဖြစ်သည်။

---

### ၃။ လိုအပ်သော ပစ္စည်းများ (Components List)
*   **Arduino Uno R3** (Main Controller)
*   **HC-SR04 Ultrasonic Sensor** (Distance Measuring)
*   **I2C LCD Display (16x2)** (Visual Output)
*   **Piezo Buzzer** (Audio Alert)
*   **LED (Red)** (Visual Alert)
*   **220 Ohm Resistor** (For LED)
*   **Breadboard & Jumper Wires**

---

### ၄။ တစ်ခုချင်းစီ၏ အလုပ်လုပ်ပုံ (Component Functions)

![Ultrasonic Distance Sensor System](https://res.cloudinary.com/dn4jczzgu/image/upload/f_auto,q_100/v1774853665/distance-detector_ezshky.png)

1.  **Arduino Uno R3:** Sensor မှ အချက်အလက်များကို လက်ခံတွက်ချက်ပြီး Output များ (LCD, Buzzer, LED) ကို ထိန်းချုပ်ပေးသည်။
2.  **Ultrasonic Sensor (HC-SR04):** အရာဝတ္ထုရှိမရှိနှင့် အကွာအဝေးကို အသံလှိုင်းသုံးပြီး စစ်ဆေးပေးသည်။
3.  **I2C LCD Display:** တွက်ချက်ရရှိသော အကွာအဝေး (cm) ကို Screen ပေါ်တွင် စာသားဖြင့် ပြသပေးသည်။
4.  **Buzzer:** ဘေးအန္တရာယ် သို့မဟုတ် သတ်မှတ်အကွာအဝေးအတွင်း ရောက်ရှိပါက အသံဖြင့် သတိပေးသည်။
5.  **LED:** အကွာအဝေး နီးကပ်လာမှုကို အမြင်အာရုံဖြင့် သတိပေးရန် အသုံးပြုသည်။

---

### ၅။ ပတ်လမ်းပုံစံ (Circuit Diagram Description)

![Ultrasonic Distance Sensor System Circuit](https://res.cloudinary.com/dn4jczzgu/image/upload/f_auto,q_100/v1774853661/distance-dig_msmiok.png)

*   **Ultrasonic Sensor:** VCC -> 5V, GND -> GND, Trig -> Pin 9, Echo -> Pin 10.
*   **I2C LCD:** VCC -> 5V, GND -> GND, SDA -> A4, SCL -> A5.
*   **Buzzer:** Positive -> Pin 8, Negative -> GND.
*   **LED:** Anode -> Pin 13 (via 220Ω resistor), Cathode -> GND.

---

### ၆။ Arduino Code

```cpp
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

// Initialize LCD (Address 0x27 is common)
LiquidCrystal_I2C lcd(0x27, 16, 2);

const int trigPin = 9;
const int echoPin = 10;
const int buzzer = 8;
const int led = 13;

long duration;
int distance;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(led, OUTPUT);
  
  lcd.init();
  lcd.backlight();
  
  Serial.begin(9600);
}

void loop() {
  // Clear the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  // Set the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Read the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculating the distance (Speed of sound = 0.034 cm/us)
  distance = duration * 0.034 / 2;
  
  // Display on LCD
  lcd.setCursor(0, 0);
  lcd.print("Distance: ");
  lcd.print(distance);
  lcd.print(" cm  "); // Extra spaces to clear old digits

  // Alarm Logic
  if (distance < 20) {
    digitalWrite(led, HIGH);
    tone(buzzer, 1000); // Send 1KHz sound signal
    lcd.setCursor(0, 1);
    lcd.print("Status: TOO CLOSE");
  } else {
    digitalWrite(led, LOW);
    noTone(buzzer);
    lcd.setCursor(0, 1);
    lcd.print("Status: SAFE     ");
  }
  
  delay(200);
}

```
---

### ၇။ အားသာချက်နှင့် အားနည်းချက် (Pros & Cons)
#### အားသာချက်များ~

* ကုန်ကျစရိတ် သက်သာပြီး တည်ဆောက်ရ လွယ်ကူခြင်း။

* အမှောင်ထဲတွင်ပင် အကွာအဝေးကို တိကျစွာ တိုင်းတာနိုင်ခြင်း။

* Real-time monitoring လုပ်ဆောင်နိုင်ခြင်း။

#### အားနည်းချက်များ~

အသံလှိုင်းကို စုပ်ယူနိုင်သော ပျော့ပျောင်းသည့် ပစ္စည်းများ (ဥပမာ- ရေမြှုပ်၊ အဝတ်) ကို တိုင်းတာရာတွင် အမှားအယွင်း ရှိနိုင်ခြင်း။

အပူချိန်နှင့် စိုထိုင်းဆပေါ် မူတည်၍ အနည်းငယ် ပြောင်းလဲနိုင်ခြင်း။

---  

### ၈။ အသုံးပြုနိုင်သည့် နေရာများ (Use Cases)
* ကားနောက်ဆုတ်ရာတွင် အကူအညီပေးမည့် Parking Sensor စနစ်။

* စက်ရုံများတွင် အရာဝတ္ထုများ၏ အကွာအဝေးကို တိုင်းတာသည့် Conveyor belt စနစ်များ။

* ရေတိုင်ကီအတွင်း ရေမျက်နှာပြင် အမြင့်ကို တိုင်းတာခြင်း။
  
  ![Circuit Diagram](https://res.cloudinary.com/dn4jczzgu/image/upload/f_auto,q_auto/v1774853668/distance-img_m0pi3f.png)  
  
  ---  
  
###  ၉။ အကျိုးကျေးဇူးများ (Benefits)
ဤ Project ကို လုပ်ဆောင်ခြင်းဖြင့် Sensor များ၏ အလုပ်လုပ်ပုံ၊ I2C LCD interfacing ပြုလုပ်ပုံနှင့် Logic-based Hardware ထိန်းချုပ်မှု (IF-ELSE Condition) များကို လက်တွေ့ကျကျ နားလည်သဘောပေါက်လာမည် ဖြစ်သည်။  

---

### အကြံပြုချက်:  
>  **LCD Address:** LCD က အလုပ်မလုပ်ရင် `0x27` အစား `0x3F` ဖြစ်နိုင်တာမို့ အဲ့ဒါလေးကို သတိပြုပါ။  

---