
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface WeekTemplateButtonsProps {
  onApplyTemplate: (templateId: string) => void;
}

const WeekTemplateButtons = ({ onApplyTemplate }: WeekTemplateButtonsProps) => {
  const { toast } = useToast();
  
  const handleApplyTemplate = (templateId: string) => {
    onApplyTemplate(templateId);
    
    toast({
      title: "Template Applied",
      description: `Applied template successfully.`
    });
  };
  
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Quick Templates</h4>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleApplyTemplate('regular')}
          className="text-sm"
        >
          Regular Work Hours
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleApplyTemplate('weekend')}
          className="text-sm"
        >
          Weekend Hours
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleApplyTemplate('evening')}
          className="text-sm"
        >
          Evening Sessions
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleApplyTemplate('morning')}
          className="text-sm"
        >
          Morning Only
        </Button>
      </div>
    </div>
  );
};

export default WeekTemplateButtons;
