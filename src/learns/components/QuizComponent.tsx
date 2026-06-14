import React, { useState } from 'react';
import '../../docs/forDocs.css'; // အပေါ်က css ကို လှမ်းခေါ်မယ်

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
    <div className="border border-border p-2 rounded-lg max-w-100 my-5 bg-card">

      <h4 className="font-semibold text-text-main">{question}</h4>
      
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className={`w-full p-2.5 mt-2.5 rounded-md border border-text-secondary outline-none text-[14px] ${getStatusClass()}`}
      >
        <option value="" disabled className="text-text-main bg-card">အဖြေတစ်ခု ရွေးချယ်ပါ</option>
        {options.map((option, index) => (
          <option key={index} value={option} className="bg-card">
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