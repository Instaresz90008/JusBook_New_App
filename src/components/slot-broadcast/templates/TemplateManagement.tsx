
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "../constants/serviceOptions";
import TemplateCard from "./TemplateCard";

interface TemplateManagementProps {
  onApplyTemplate?: (templateId: string) => void;
}

const TemplateManagement = ({ onApplyTemplate }: TemplateManagementProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Schedule Templates</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            onApply={() => onApplyTemplate && onApplyTemplate(template.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateManagement;
