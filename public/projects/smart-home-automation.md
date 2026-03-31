## IoT Home Automation System (ESP8266 + Relay Module)

Wi-Fi ကွန်ရက်ကို အသုံးပြု၍ မိမိ၏ စမတ်ဖုန်း သို့မဟုတ် ကွန်ပျူတာမှတစ်ဆင့် အိမ်တွင်းလျှပ်စစ်ပစ္စည်းများကို အဝေးမှ ထိန်းချုပ်နိုင်သော IoT Project ဖြစ်ပါသည်။

---

### ၁။ ပရောဂျက်၏ ရည်ရွယ်ချက် (Project Goal)
ဤ Project ၏ အဓိကရည်ရွယ်ချက်မှာ Internet of Things (IoT) နည်းပညာကို အသုံးပြု၍ လူကိုယ်တိုင် ခလုတ်သွားနှိပ်ရန်မလိုဘဲ Wi-Fi ချိတ်ဆက်ထားသော မည်သည့် Device နှင့်မဆို လျှပ်စစ်မီးများကို အဖွင့်အပိတ် ပြုလုပ်နိုင်ရန် ဖြစ်သည်။

---

### ၂။ အလုပ်လုပ်ပုံ အကျဉ်းချုပ် (Working Principle)
ESP8266 (NodeMCU) သည် Local Wi-Fi ကွန်ရက်သို့ ချိတ်ဆက်ပြီး Web Server တစ်ခုအဖြစ် လုပ်ဆောင်ပါသည်။ အသုံးပြုသူက ဖုန်း Browser မှတစ်ဆင့် NodeMCU ၏ IP Address သို့ ဝင်ရောက်သောအခါ Control Dashboard (Web Page) တစ်ခု ကျလာမည်ဖြစ်သည်။ ထို Dashboard ပေါ်ရှိ ခလုတ်များကို နှိပ်လိုက်ပါက ESP8266 မှ Relay Module ထံသို့ Signal ပေးပို့ပြီး ၎င်းနှင့် ချိတ်ဆက်ထားသော မီးသီးများကို အဖွင့်အပိတ် ပြုလုပ်ပေးပါသည်။

---

### ၃။ လိုအပ်သော ပစ္စည်းများ (Components List)
* **NodeMCU ESP8266** (Wi-Fi Microcontroller)
* **4-Channel Relay Module** (သို့မဟုတ် ၂ လိုင်းသုံး)
* **Jumper Wires (Female to Female)**
* **5V Power Adapter သို့မဟုတ် Power Bank**
* **AC Bulb & Holder** (စမ်းသပ်ရန်အတွက်)

---

### ၄။ တစ်ခုချင်းစီ၏ အလုပ်လုပ်ပုံ (Component Functions)  

![Smart Home Automation System](https://res.cloudinary.com/dn4jczzgu/image/upload/w_800,e_sharpen:100,f_auto,q_100/v1774864193/smart-dig_tcbys6.jpg)

1.  **NodeMCU ESP8266:** Wi-Fi ချိတ်ဆက်မှုနှင့် Web Server ကို ကိုင်တွယ်ပေးသည့် အဓိက ဦးနှောက်ဖြစ်သည်။
2.  **Relay Module:** Microcontroller မှ လာသော အားနည်းသည့် Signal (3.3V/5V) ဖြင့် အိမ်သုံးလျှပ်စစ်မီး (220V AC) ကို ဘေးကင်းစွာ switch လုပ်ပေးသည်။
3.  **Web Dashboard:** အသုံးပြုသူက ဖုန်းမှတစ်ဆင့် အပြန်အလှန် ထိန်းချုပ်နိုင်သည့် UI ဖြစ်သည်။

---

### ၅။ ပတ်လမ်းပုံစံ (Circuit Diagram Description)  

![Smart Home Automation System Circuit](https://res.cloudinary.com/dn4jczzgu/image/upload/w_800,e_sharpen:100,f_auto,q_100/v1774864193/smart-circuit_f5n3lt.jpg)


* **Relay Module နှင့် NodeMCU ချိတ်ဆက်မှု:**
    * VCC -> NodeMCU Vin (သို့မဟုတ် 5V)
    * GND -> NodeMCU GND
    * **IN1 -> D1 (GPIO 5)**
    * **IN2 -> D2 (GPIO 4)**
* **AC မီးသီး ချိတ်ဆက်မှု:**
    * မီးသီး၏ ကြိုးတစ်ပင်ကို Relay ၏ **Common (COM)** ငုတ်တွင် တပ်ပါ။
    * ကျန်တစ်ပင်ကို **Normally Open (NO)** ငုတ်တွင် တပ်ပြီး AC plug နှင့် ချိတ်ဆက်ပါ။

---

### ၆။ Arduino Code

```cpp
#include <ESP8266WiFi.h>

// Wi-Fi Credentials
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

// Define Relay Pins
const int relay1 = 5; // D1
const int relay2 = 4; // D2

WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  
  // Initial State: OFF (Relays are often Active LOW)
  digitalWrite(relay1, HIGH);
  digitalWrite(relay2, HIGH);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (!client) return;

  String request = client.readStringUntil('\r');
  client.flush();

  // Control Logic
  if (request.indexOf("/R1ON") != -1) digitalWrite(relay1, LOW);
  if (request.indexOf("/R1OFF") != -1) digitalWrite(relay1, HIGH);
  if (request.indexOf("/R2ON") != -1) digitalWrite(relay2, LOW);
  if (request.indexOf("/R2OFF") != -1) digitalWrite(relay2, HIGH);

  // HTTP Response & HTML UI
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("");
  client.println("<!DOCTYPE HTML><html><head><meta name='viewport' content='width=device-width, initial-scale=1'>");
  client.println("<style>button{width:100px;height:50px;margin:10px;cursor:pointer;}</style></head><body>");
  client.println("<h2>Red Dragon IoT Control</h2>");
  client.println("<p>Light 1: <a href='/R1ON'><button>ON</button></a><a href='/R1OFF'><button>OFF</button></a></p>");
  client.println("<p>Light 2: <a href='/R2ON'><button>ON</button></a><a href='/R2OFF'><button>OFF</button></a></p>");
  client.println("</body></html>");
  
  delay(1);
} 
```  

---

### ၇။ အားသာချက်နှင့် အားနည်းချက် (Pros & Cons)
#### အားသာချက်များ~

* အပို App များ ထည့်သွင်းရန် မလိုဘဲ Browser ရှိရုံဖြင့် သုံးနိုင်ခြင်း။

* Local Network အတွင်း မည်သည့်နေရာမှမဆို ထိန်းချုပ်နိုင်ခြင်း။

* စရိတ်သက်သာပြီး စွမ်းဆောင်ရည် မြင့်မားခြင်း။  

---

#### အားနည်းချက်များ~

* Wi-Fi မရှိလျှင် သို့မဟုတ် Router ပိတ်ထားလျှင် အလုပ်မလုပ်နိုင်ခြင်း။

* လုံခြုံရေးအတွက် Password နှင့် IP စနစ်ကို သတိပြုရန် လိုအပ်ခြင်း။  

---

### ၈။ အသုံးပြုနိုင်သည့် နေရာများ (Use Cases)
* နေအိမ်ရှိ မီးချောင်းများ၊ ပန်ကာများကို ကုတင်ပေါ်မှ ဖုန်းဖြင့် ပိတ်ခြင်း။

* ရုံးခန်းများတွင် မီးများကို အဝေးမှ စုပေါင်းထိန်းချုပ်ခြင်း။

* ခြံဝင်းအတွင်းရှိ ရေပန့် သို့မဟုတ် မီးများကို ထိန်းချုပ်ခြင်း။  


![Smart Home Automation System](https://res.cloudinary.com/dn4jczzgu/image/upload/w_800,e_sharpen:100,f_auto,q_100/v1774864193/smart-img_lsuccq.jpg)

---

### ၉။ အကျိုးကျေးဇူးများ (Benefits)
ဤ Project ကို လုပ်ဆောင်ခြင်းဖြင့် Wi-Fi Microcontrollers များ၏ အလုပ်လုပ်ပုံ၊ HTTP Protocol သဘောတရားနှင့် Embedded Web Server တည်ဆောက်ပုံတို့ကို လက်တွေ့ လေ့လာနိုင်မည် ဖြစ်သည်။ ၎င်းသည် ပိုမိုကြီးမားသော Smart Home Ecosystem များ တည်ဆောက်ရန်အတွက် အခြေခံအကျဆုံး Project တစ်ခု ဖြစ်ပါသည်။  

---  

### ထပ်မံဖြည့်စွက်ချက်:
* **SSID & Password:** Code ထဲကနေရာမှာ မင်းရဲ့ အိမ်က Wi-Fi နာမည်နဲ့ password ကို ပြောင်းထည့်ဖို့ မမေ့ပါနဲ့။
* **Serial Monitor:** Code ကို upload တင်ပြီးရင် Serial Monitor ကို ဖွင့်ကြည့်ပါ။ အဲ့ဒီမှာပြတဲ့ **IP Address** ကို ဖုန်း Browser မှာ ရိုက်ထည့်ပြီး ထိန်းချုပ်ရမှာ ဖြစ်ပါတယ်။
 
 ---