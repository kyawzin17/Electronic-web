import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";


const Project = () => {
  const navigate = useNavigate();
 
  const projects = [
    {
      title: "Arduino Clap Switch",
      slug: "arduino-clap-switch",
      description: "Sound Sensor ကို အသုံးပြု၍ လက်ခုပ်သံနဲ့ မီးဖွင့်ပိတ်နိုင်သော စနစ်။",
      micro: "Arduino UNO R3",
      power: "5V DC",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000",
      category: "Automation"
    },
    {
      title: "Ultrasonic Distance Detector",
      slug: "ultrasonic-distance-detector",
      description: "Ultrasonic Sensor နှင့် Arduino UNO R3 ကို အသုံးပြု၍ အကွာအဝေးတိုင်းတာသော စနစ်။",
      micro: "Arduino UNO R3",
      power: "7V - 12V DC",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000",
      category: "Automation"
    },
    {
      title: "Smart Home Automation",
      slug: "smart-home-automation",
      description: "ESP8266 နှင့် Relay Module များကို အသုံးပြု၍ အိမ်တွင်းမီးများကို ဖုန်းမှတစ်ဆင့် ထိန်းချုပ်နိုင်သော စနစ်။",
      micro: "ESP8266 / NodeMCU",
      power: "5V DC",
      // Internet မှ နမူနာပုံ (Smart Home/Arduino)
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000",
      category: "Automation"
    },
    {
      title: "Digital Thermometer",
      slug: "digital-thermometer",
      description: "LM35 Temperature Sensor နှင့် I2C LCD Display ကို အသုံးပြုထားသော အပူချိန်တိုင်း ကိရိယာ။",
      micro: "Arduino Nano",
      power: "9V Battery",
      // Internet မှ နမူနာပုံ (Circuit Board)
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
      category: "Sensors"
    }
  ];

  

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(project => 
  project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.micro.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="space-y-16 py-10 max-w-6xl mx-auto px-8 ">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredProjects.map((proj, index) => (
        <div key={index} className="w-full bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform hover:translate-y-[-8px] duration-300">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Preview Area */}
            <div className="lg:w-1/2 relative h-72 lg:h-auto overflow-hidden">
              <img 
                src={proj.image} 
                alt={proj.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent opacity-40 lg:hidden" />
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-soft/90 text-accent backdrop-blur-md rounded-full text-xs font-bold border border-accent/90">
                {proj.category}
              </div>
            </div>

            {/* Technical Info Area */}
            <div className="lg:w-1/2 p-8 lg:p-12 space-y-6">
              <h2 className="text-3xl font-bold text-text-main tracking-tight">
                {proj.title}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {proj.description}
              </p>

              {/* Specs Table-like Grid */}
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-[var(--border)]">
                <div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest mb-1">Microcontroller</p>
                  <p className="font-semibold text-primary">{proj.micro}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest mb-1">Power Req.</p>
                  <p className="font-semibold text-secondary">{proj.power}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button onClick={() => navigate(`/project/${proj.slug}`)} className="flex-1 py-4 bg-soft hover:border-2 border-primary text-text-main font-bold rounded-2xl shadow-lg shadow-soft hover:opacity-90 transition-all">
                  ဖတ်ရှုရန်
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;