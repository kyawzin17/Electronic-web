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
        <div className="w-full bg-transparent flex py-6 border-b-4 border-double border-b-text-secondary/50">
                        <button onClick={() => {
                            setDocComponents("doc");
                            navigate("/docs/doc/components")
                            localStorage.setItem("docComponents", "/docs/doc/components");
                        }} className={`w-full cursor-pointer border-2 border-border py-2 flex items-center justify-center font-medium ${secondPath === 'doc' ? "text-text-main border-text-secondary bg-text-muted/40" : "bg-transparent text-text-muted rounded-sm"}`}>
                            Components
                        </button>
                        <button onClick={() => {
                            setDocComponents("learn");
                            navigate("/docs/learning")
                            localStorage.setItem("docComponents", "/docs/learning");
                        }} className={`w-full cursor-pointer border-2 border-border py-2 flex items-center justify-center font-medium ${secondPath === 'learning' ? "text-text-main border-text-secondary bg-text-muted/40" : "bg-transparent text-text-muted rounded-sm"}`}>
                            Learning
                        </button>
                    </div>
    );
    }
    export default LearnSidebarMode;