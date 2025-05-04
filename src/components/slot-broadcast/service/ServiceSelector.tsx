
import { ReactNode } from "react";
import { Info, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceOption {
  id: string;
  name: string;
  color?: string;
  costFactor?: number;
}

interface ServiceSelectorProps {
  service: string;
  setService: (service: string) => void;
  serviceCost?: number;
  setServiceCost?: (cost: number) => void;
  options: ServiceOption[];
  showCostFactor?: boolean;
  children?: ReactNode;
  className?: string;
  allowCreate?: boolean;
}

const ServiceSelector = ({
  service,
  setService,
  serviceCost,
  setServiceCost,
  options,
  showCostFactor = false,
  children,
  className,
  allowCreate = false
}: ServiceSelectorProps) => {
  
  // Function to get service cost based on service name
  const getServiceCost = (serviceName: string) => {
    const serviceOption = options.find(s => s.name === serviceName);
    return serviceOption?.costFactor ?? 1.0;
  };

  // Update service cost when service selection changes
  const handleServiceChange = (serviceName: string) => {
    setService(serviceName);
    if (setServiceCost) {
      setServiceCost(getServiceCost(serviceName));
    }
  };
  
  return (
    <div className={className}>
      <div>
        {/* More compact service selector */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Select value={service} onValueChange={handleServiceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.name}>
                    <div className="flex items-center">
                      {option.color && (
                        <span className={`w-3 h-3 rounded-full bg-${option.color}-500 mr-2`} />
                      )}
                      {option.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {allowCreate && (
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Cost per slot section with improved labeling */}
        {showCostFactor && serviceCost !== undefined && setServiceCost && (
          <div className="mt-3 flex items-center gap-2">
            <div className="space-y-1 flex-1">
              <label className="text-xs text-gray-500">Cost per Slot</label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={serviceCost}
                  onChange={(e) => setServiceCost(parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="0"
                  className="w-24 h-8"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0">
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Cost associated per slot for this service</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default ServiceSelector;
