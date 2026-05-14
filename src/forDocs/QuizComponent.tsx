import React, { useState } from 'react';
import './forDocs.css'; // အပေါ်က css ကို လှမ်းခေါ်မယ်

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizComponent: React.FC<QuizProps> = ({ question, options, correctAnswer }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    setIsSubmitted(true);
  };

  const getStatusClass = () => {
    if (!isSubmitted || !selectedValue) return '';
    return selectedValue === correctAnswer ? 'correct' : 'incorrect';
  };

  return (
    <div className="quiz-container">
      <h3>{question}</h3>
      
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className={`quiz-select ${getStatusClass()}`}
      >
        <option value="" disabled>အဖြေတစ်ခု ရွေးချယ်ပါ</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {isSubmitted && (
        <p className={`result-text ${selectedValue === correctAnswer ? 'text-green' : 'text-red'}`}>
          {selectedValue === correctAnswer 
            ? '✅ အဖြေမှန်ပါတယ်!' 
            : `❌ မှားနေပါတယ်၊ အဖြေမှန်က ${correctAnswer} ပါ။`}
        </p>
      )}
    </div>
  );
};

export default QuizComponent;