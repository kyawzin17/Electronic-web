
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faBookOpen, faMicrochip, faBolt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface Project {
  title: string;
  description: string;
  micro: string;
  image: string;
  category: string;
  power: string;
}

const ProjectCard = ({ project}: { project: Project },  isMember = false ) => {  
  return (
    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-(--primary-soft) mb-10">
      <div className="flex flex-col">
        
        {/* Left Side: Image Section */}
        <div className="relative min-h-75">
          <img 
            src={project.image || "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000"} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 px-4 py-1.5 bg-card/80 backdrop-blur-md text-(--pink-main) rounded-full text-xs font-bold border border-(--pink-main)/20 uppercase tracking-widest">
            {project.category}
          </div>
        </div>

        {/* Right Side: Content Section */}
        <div className="p-8 space-y-6 flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-3 tracking-tight">
              {project.title}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-8 py-6 border-y border-border">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-primary">
                <FontAwesomeIcon icon={faMicrochip} />
              </div>
              <div>
                <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest">Microcontroller</p>
                <p className="font-semibold text-text-main">{project.micro}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-secondary">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <div>
                <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest">Power Req.</p>
                <p className="font-semibold text-text-main">{project.power}</p>
              </div>
            </div>
          </div>

          {/* Access Control Section */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-3 text-(--success) bg-(--success)/10 p-4 rounded-2xl border border-(--success)/20">
              <FontAwesomeIcon icon={faBookOpen} />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">အခြေခံ Guide ကို အခမဲ့ဖတ်ရှုနိုင်သည်</span>
            </div>

            {!isMember && (
              <div className="flex items-center justify-between text-xs p-3 bg-(--bg-soft) rounded-xl border border-(--border)">
                <p className="text-(--text-secondary)">
                  Premium အချက်အလက်များ (Code & Schematic) အတွက်
                </p>
                <button className="text-(--primary) font-bold hover:underline">
                  <FontAwesomeIcon icon={faLock} className="mr-2" />
                  Member ဝင်ပါ
                </button>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-(--gradient-primary) text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                Guide ဖတ်ရှုရန်
              </button>
              <button className="px-6 py-4 bg-(--bg-card) text-text-main border border-(--border) rounded-2xl hover:bg-(--bg-soft) transition-all">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;