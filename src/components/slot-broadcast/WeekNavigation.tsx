
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface WeekNavigationProps {
  onNavigate: (direction: 'prev' | 'next') => void;
}

const WeekNavigation = ({ onNavigate }: WeekNavigationProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-8 px-4 flex items-center"
        onClick={() => onNavigate('prev')}
      >
        <ArrowLeft className="h-3 w-3 mr-1" /> Previous
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-8 px-4 flex items-center"
        onClick={() => onNavigate('next')}
      >
        Next <ArrowRight className="h-3 w-3 ml-1" />
      </Button>
    </div>
  );
};

export default WeekNavigation;
