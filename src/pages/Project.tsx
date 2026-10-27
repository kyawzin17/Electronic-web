import { useState} from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../projects/SearchBar";


const Project = () => {
  const navigate = useNavigate();
 
  const projects = [
    {
  title: "Arduino LED Blink",
  slug: "arduino-led-blink",
  description:
    "Arduino UNO R3၊ LED နှင့် Resistor ကို အသုံးပြု၍ LED ကို အချိန်အပိုင်းအခြားအလိုက် အဖွင့်အပိတ် ပြုလုပ်သည့် အခြေခံ Electronic Project။",
  micro: "Arduino UNO R3",
  power: "7V - 12V DC",
  image: "https://res.cloudinary.com/dn4jczzgu/image/upload/f_auto,q_100/v1793083552/led-blink_rqp3b4.webp",
  category: "Basics"
},
    {
      title: "Ultrasonic Distance Detector",
      slug: "ultrasonic-distance-detector",
      description: "Ultrasonic Sensor နှင့် Arduino UNO R3 ကို အသုံးပြု၍ အကွာအဝေးတိုင်းတာသော စနစ်။",
      micro: "Arduino UNO R3",
      power: "7V - 12V DC",
      image: "https://res.cloudinary.com/dn4jczzgu/image/upload/f_auto,q_100/v1793082086/distance-detector_yc4yi8.webp",
      category: "Automation"
    },
    {
  title: "Smart Lock Door System",
  slug: "smart-lock-door",
  description:
    "Arduino UNO R3၊ Keypad၊ LCD1602 နှင့် Servo Motor ကို အသုံးပြု၍ Password ဖြင့် တံခါးဖွင့်ပိတ်နိုင်သော လုံခြုံရေးစနစ်။",
  micro: "Arduino UNO R3",
  power: "7V - 12V DC",
  image: "https://res.cloudinary.com/dn4jczzgu/image/upload/f_auto,q_100/v1793082086/smart-lock-door_yo6izu.webp",
  category: "Security"
},
  ];

  

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(project => 
  project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.micro.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-8 ">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="w-full h-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((proj, index) => (
        <div key={index} className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-300">
          <div className="flex flex-col">
            
            {/* Image Preview Area */}
            <div className="relative h-60 overflow-hidden">
              <img 
                src={proj.image} 
                alt={proj.title} 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-card to-transparent opacity-40 lg:hidden" />
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-soft/90 text-accent backdrop-blur-md rounded-full text-xs font-bold border border-accent/90">
                {proj.category}
              </div>
            </div>

            {/* Technical Info Area */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-text-main tracking-tight">
                {proj.title}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {proj.description}
              </p>

              {/* Specs Table-like Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 py-6 border-y border-(--border)">
                <div>
                  <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest mb-1">Microcontroller</p>
                  <p className="font-semibold text-primary">{proj.micro}</p>
                </div>
                <div>
                  <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest mb-1">Power Req.</p>
                  <p className="font-semibold text-secondary">{proj.power}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button onClick={() => navigate(`/project/${proj.slug}`)} className="flex-1 py-4 bg-primary hover:primary/90 hover:border-2 border-main text-text-main font-bold rounded-2xl shadow-lg shadow-soft hover:opacity-90 transition-all">
                  ဖတ်ရှုရန်
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
        </div>
    </div>
  );
};

export default Project;