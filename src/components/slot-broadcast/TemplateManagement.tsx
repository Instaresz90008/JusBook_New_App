
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "./constants";

interface TemplateManagementProps {
  onApplyTemplate?: (templateId: string) => void;
}

const TemplateManagement = ({ onApplyTemplate }: TemplateManagementProps) => {
  const handleApplyTemplate = (templateId: string) => {
    if (onApplyTemplate) {
      onApplyTemplate(templateId);
    }
  };

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
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between">
                <h4 className="font-medium">{template.name}</h4>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                <div>{template.startTime} - {template.endTime}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(template.days)
                    .filter(([_, isActive]) => isActive)
                    .map(([day]) => (
                      <span key={day} className="text-xs px-2 py-1 bg-gray-100 rounded-md">{day}</span>
                    ))
                  }
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 w-full"
                onClick={() => handleApplyTemplate(template.id)}
              >
                Apply Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateManagement;
