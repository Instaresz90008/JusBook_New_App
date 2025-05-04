
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
}

interface QuickTemplatesProps {
  onApplyTemplate: (templateId: string) => void;
  onClearAll?: () => void;
  onSaveAndApply?: () => void;
}

const QuickTemplates = ({ onApplyTemplate, onClearAll, onSaveAndApply }: QuickTemplatesProps) => {
  const { toast } = useToast();
  
  const templates: TemplateDefinition[] = [
    {
      id: "regular",
      name: "Regular Work Hours",
      description: "Monday to Friday, 9 AM to 5 PM"
    },
    {
      id: "weekend",
      name: "Weekend Hours",
      description: "Saturday and Sunday, 10 AM to 4 PM"
    },
    {
      id: "evening",
      name: "Evening Sessions",
      description: "Monday to Friday, 6 PM to 9 PM"
    },
    {
      id: "morning",
      name: "Morning Only",
      description: "Monday to Friday, 7 AM to 12 PM"
    }
  ];
  
  const handleApplyTemplate = (templateId: string) => {
    onApplyTemplate(templateId);
    
    toast({
      title: "Template Applied",
      description: `${templates.find(t => t.id === templateId)?.name} template applied successfully.`
    });
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Quick Templates</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {templates.map((template) => (
          <Button 
            key={template.id}
            variant="outline" 
            size="sm"
            onClick={() => handleApplyTemplate(template.id)}
            className="text-sm h-9 px-4"
            title={template.description}
          >
            {template.name}
          </Button>
        ))}
      </div>

      {(onClearAll || onSaveAndApply) && (
        <div className="flex justify-between mt-4">
          {onClearAll && (
            <Button 
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
          
          {onSaveAndApply && (
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white ml-auto" 
              size="sm"
              onClick={onSaveAndApply}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Save & Apply
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickTemplates;
