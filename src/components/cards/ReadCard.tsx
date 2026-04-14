import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface PropsCard {
    icon: any;
    title: string;
    description: string;
    buttonText: string;
    buttonColor: "primary" | "secondary" | "accent" | "purple" | "red";
    onButtonClick: () => void;
    color: "primary" | "secondary" | "accent" | "purple" | "red";
}
const ReadCard= forwardRef<HTMLDivElement, PropsCard>(( 
  { icon, 
  title, 
  description, 
  buttonText,
  buttonColor,
  onButtonClick,
  color },
  ref
 ) => {

  const buttonColorClasses = {
    primary: "bg-primary hover:bg-primary/80 focus:ring-blue-300",
    secondary: "bg-secondary hover:bg-secondary/80 focus:ring-green-300",
    accent: "bg-accent hover:bg-accent/80 focus:ring-yellow-300",
    purple: "bg-purple hover:bg-purple/80 focus:ring-purple-300",
    red: "bg-red hover:bg-red/80 focus:ring-red-300"
  };

  return (
    <div ref={ref} className={`max-w-sm bg-card/40 flex flex-col justify-between rounded-lg overflow-hidden transform transition-all duration-300 hover:translate-y-[-10px] border-3 border-border hover:border-${color} py-4`}>
      {/* Icon Section */}
      
       <div className="px-4">
        <div className="flex justify-center py-4">
          <FontAwesomeIcon 
            icon={icon} 
            className={`text-3xl text-${color}`}
          />
      </div>
        {/* Title */}
        <h3 className="text-xl font-bold text-text-primary text-center mb-3">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-text-muted text-center mb-6 leading-relaxed">
          {description}
        </p>
        </div>
        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={onButtonClick}
            className={`px-6 py-2 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${buttonColorClasses[buttonColor] || buttonColorClasses.primary}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    )
}
)
export default ReadCard;
      {/* Content Section */}