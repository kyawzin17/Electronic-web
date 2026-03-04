import React from "react";
import SearchBar from "../components/SearchBar";

const Project = () => {
  const projects = [
    {
      title: "Smart Home Automation",
      description: "ESP8266 နှင့် Relay Module များကို အသုံးပြု၍ အိမ်တွင်းမီးများကို ဖုန်းမှတစ်ဆင့် ထိန်းချုပ်နိုင်သော စနစ်။",
      micro: "ESP8266 / NodeMCU",
      power: "5V DC",
      // Internet မှ နမူနာပုံ (Smart Home/Arduino)
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000",
      category: "Automation"
    },
    {
      title: "Digital Thermometer",
      description: "LM35 Temperature Sensor နှင့် I2C LCD Display ကို အသုံးပြုထားသော အပူချိန်တိုင်း ကိရိယာ။",
      micro: "Arduino Nano",
      power: "9V Battery",
      // Internet မှ နမူနာပုံ (Circuit Board)
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
      category: "Sensors"
    }
  ];

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredProjects = projects.filter(project => 
//   project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   project.micro.toLowerCase().includes(searchTerm.toLowerCase())
// );

  return (
    <div className="space-y-16 py-10 max-w-6xl mx-auto px-4">
        <SearchBar />
      {projects.map((proj, index) => (
        <div key={index} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Preview Area */}
            <div className="lg:w-1/2 relative h-72 lg:h-auto overflow-hidden">
              <img 
                src={proj.image} 
                alt={proj.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent opacity-40 lg:hidden" />
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-[var(--pink-soft)] text-[var(--pink-main)] backdrop-blur-md rounded-full text-xs font-bold border border-[var(--pink-main)]/20">
                {proj.category}
              </div>
            </div>

            {/* Technical Info Area */}
            <div className="lg:w-1/2 p-8 lg:p-12 space-y-6">
              <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">
                {proj.title}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {proj.description}
              </p>

              {/* Specs Table-like Grid */}
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-[var(--border)]">
                <div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest mb-1">Microcontroller</p>
                  <p className="font-semibold text-[var(--primary)]">{proj.micro}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest mb-1">Power Req.</p>
                  <p className="font-semibold text-[var(--secondary)]">{proj.power}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="flex-1 py-4 bg-[var(--gradient-primary)] text-white font-bold rounded-2xl shadow-lg shadow-[var(--primary-soft)] hover:opacity-90 transition-all">
                  Guide မန်ဘာဝင်ဖတ်ရှုရန်
                </button>
                <button className="px-6 py-4 bg-[var(--bg-soft)] text-[var(--text-main)] font-bold rounded-2xl border border-[var(--border)] hover:bg-[var(--border)] transition-all">
                  <i className="fa-brands fa-github text-lg"></i>
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