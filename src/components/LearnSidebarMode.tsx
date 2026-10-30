import { useLocation } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";

const LearnSidebarMode: React.FC = () => {
    const location = useLocation();

    const pathParts = location.pathname.split('/');
  const secondPath = pathParts[2];

    const navigate = useNavigate();
    const { setDocComponents } = useAppContext(); 
    

    return (
        <div className="w-full sticky z-50 top-0 left-0 right-0 flex flex-row bg-soft/80 backdrop-blur-lg border-secondary/30 py-4 gap-2 border-b-4 border-double border-b-text-secondary/50">
                        <button onClick={() => {
                            setDocComponents("doc");
                            navigate("/docs/doc/components")
                            localStorage.setItem("docComponents", "/docs/doc/components");
                        }} className={`w-full cursor-pointer border-2 border-border py-2 flex items-center justify-center font-medium rounded-sm ${secondPath === 'doc' ? "text-text-main border-text-secondary bg-text-muted/40" : "bg-transparent text-text-muted"}`}>
                            Components
                        </button>
                        <button onClick={() => {
                            setDocComponents("learn");
                            navigate("/docs/learning")
                            localStorage.setItem("docComponents", "/docs/learning");
                        }} className={`w-full cursor-pointer border-2 border-border py-2 flex items-center justify-center font-medium rounded-sm ${secondPath === 'learning' ? "text-text-main border-text-secondary bg-text-muted/40" : "bg-transparent text-text-muted"}`}>
                            Learning
                        </button>
                    </div>
    );
    }
    export default LearnSidebarMode;