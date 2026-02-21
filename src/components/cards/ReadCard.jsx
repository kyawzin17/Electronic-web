import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReadCard({ 
  icon, 
  title, 
  description, 
  buttonText,
  buttonColor,
  onButtonClick
}) {

  const buttonColorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300",
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    purple: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-300",
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-300"
  };

  return (
    <div className="max-w-sm bg-card rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary-soft border border-border">
      {/* Icon Section */}
      <div className="flex justify-center pt-6 pb-4">
          <FontAwesomeIcon 
            icon={icon} 
            className="text-3xl text-primary"
          />
      </div>
       <div className="px-6 pb-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-text-primary text-center mb-3">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-text-muted text-center mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={onButtonClick}
            className={`px-6 py-2 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${buttonColorClasses[buttonColor] || buttonColorClasses.blue}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
      </div>
    )
}
      {/* Content Section */}