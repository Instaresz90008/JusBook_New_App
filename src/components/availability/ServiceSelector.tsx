
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Service options from the original component
const serviceOptions = [];

interface ServiceSelectorProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Service" />
        </SelectTrigger>
        <SelectContent>
          {serviceOptions.map((option) => (
            <SelectItem key={option.id} value={option.name}>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full bg-${option.color}-500 mr-2`}></div>
                {option.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="ghost" size="icon" className="absolute -mt-[38px] right-1">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ServiceSelector;
