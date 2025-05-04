
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  nextLabel?: string;
  showBackButton?: boolean;
}

const NavigationFooter = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  nextLabel = "Continue",
  showBackButton = true
}: NavigationFooterProps) => {
  return (
    <div className="flex justify-between items-center">
      {showBackButton ? (
        <Button variant="outline" onClick={onPrevious} className="border-gray-300">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      ) : (
        <div className="invisible">
          <Button variant="outline" className="opacity-0 pointer-events-none">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      )}
      <div className="text-sm text-gray-500">
        Page {currentStep} of {totalSteps}
      </div>
      <Button 
        onClick={onNext}
        className="px-8 py-2 h-auto bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        {nextLabel} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavigationFooter;
