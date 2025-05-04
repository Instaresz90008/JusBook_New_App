
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { templates } from "./constants/serviceOptions";

interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate
}: TemplateSelectorProps) => {
  return (
    <div className="mt-6">
      <div className="font-medium mb-2">Quick Templates</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {templates.map((template) => (
          <Button 
            key={template.id}
            variant="outline" 
            size="sm"
            className={selectedTemplate === template.id ? "border-primary border-2" : ""}
            onClick={() => onSelectTemplate(template.id)}
          >
            {template.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
