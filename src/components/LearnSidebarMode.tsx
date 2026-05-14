import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";


const LearnSidebarMode: React.FC = () => {
    const navigate = useNavigate();
    const { docComponents, setDocComponents } = useAppContext(); 
    

    return (
        <div className="w-full bg-transparent flex py-6 border-b-4 border-double border-b-text-secondary/50">
                        <button onClick={() => {
                            setDocComponents(true);
                            navigate("/doc/components")
                        }} className={`w-full cursor-pointer border-2 border-border py-2 flex items-center justify-center font-medium ${docComponents ? "text-text-main border-text-secondary bg-text-muted/40" : "bg-transparent text-text-muted rounded-sm"}`}>
                            Components
                        </button>
                        <button onClick={() => {
                            setDocComponents(false);
                            navigate("/doc/learning")
                        }} className={`w-full cursor-pointer border-2 border-border py-2 flex items-center justify-center font-medium ${!docComponents ? "text-text-main border-text-secondary bg-text-muted/40" : "bg-transparent text-text-muted rounded-sm"}`}>
                            Learning
                        </button>
                    </div>
    );
    }
    export default LearnSidebarMode;