
import { Info, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { serviceOptions } from "./constants";

interface ServiceSelectorProps {
  service: string;
  setService: (service: string) => void;
  serviceCost: number;
  setServiceCost: (cost: number) => void;
}

const ServiceSelector = ({
  service,
  setService,
  serviceCost,
  setServiceCost
}: ServiceSelectorProps) => {
  
  // Function to get service cost based on service name
  const getServiceCost = (serviceName: string) => {
    const service = serviceOptions.find(s => s.name === serviceName);
    return service ? service.costFactor : 1.0;
  };

  // Update service cost when service selection changes
  const handleServiceChange = (serviceName: string) => {
    setService(serviceName);
    setServiceCost(getServiceCost(serviceName));
  };
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
      <div className="space-y-4">
        <div className="flex">
          <Select value={service} onValueChange={handleServiceChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((serviceOption) => (
                <SelectItem key={serviceOption.id} value={serviceOption.name}>
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full bg-${serviceOption.color}-500 mr-2`} />
                    {serviceOption.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="ml-2">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cost Factor</label>
          <div className="flex items-center">
            <Input
              type="number"
              value={serviceCost}
              onChange={(e) => setServiceCost(parseFloat(e.target.value) || 0)}
              step="0.1"
              min="0"
              className="w-24"
            />
            <span className="ml-2 text-gray-700">x</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cost factor multiplier for this service type</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;
