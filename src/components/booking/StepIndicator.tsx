
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) => {
  return (
    <div className="flex flex-col justify-center mb-8 md:hidden">
      <div className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full text-blue-600 text-sm font-medium">
        <span className="font-medium mr-2">Step {currentStep} of {totalSteps}:</span> {stepLabels[currentStep - 1]}
      </div>
      
      <div className="flex items-center justify-between px-4 mt-4">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all ${
              currentStep > index
                ? "bg-blue-600 text-white shadow-md" 
                : currentStep === index + 1
                ? "bg-blue-500/90 text-white ring-4 ring-blue-100"
                : "bg-blue-100 text-blue-400"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-xs mt-2 px-2 text-gray-500 mb-4">
        {stepLabels.map((label, index) => (
          <span 
            key={index} 
            className={`text-center px-1 max-w-[70px] truncate ${
              currentStep === index + 1 ? "font-medium text-blue-700" : ""
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
