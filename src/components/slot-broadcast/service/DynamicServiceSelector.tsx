
// import React, { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import serviceService from "@/services/serviceService";
// import { Service } from "@/types/service";
// import { toast } from "sonner";

// interface ServiceSelectorProps {
//   service: string;
//   setService: (service: string) => void;
//   serviceCost: number;
//   setServiceCost: (cost: number) => void;
//   options?: { id: string; name: string; color: string; costFactor: number }[];
//   showCostFactor?: boolean;
//   className?: string;
//   allowCreate?: boolean;
// }

// const DynamicServiceSelector: React.FC<ServiceSelectorProps> = ({
//   service,
//   setService,
//   serviceCost,
//   setServiceCost,
//   showCostFactor = false,
//   className = "",
//   allowCreate = false
// }) => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const navigate = useNavigate();

//   // Fetch services from the API
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         const fetchedServices = await serviceService.getUserServices();
//         setServices(fetchedServices);
        
//         // Set default service if available
//         if (fetchedServices.length > 0 && !service) {
//           setService(fetchedServices[0].name);
//           setServiceCost(fetchedServices[0].cost_factor);
//         }
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         toast.error("Failed to load services. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleServiceChange = (serviceName: string) => {
//     const selectedService = services.find(s => s.name === serviceName);
//     if (selectedService) {
//       setService(serviceName);
//       setServiceCost(selectedService.cost_factor);
//     }
//   };

//   const handleCreateService = () => {
//     navigate("/service-creation");
//   };

//   return (
//     <div className={className}>
//       <div className="flex items-center gap-2">
//         <Select value={service} onValueChange={handleServiceChange} disabled={loading}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder={loading ? "Loading services..." : "Select a service"} />
//           </SelectTrigger>
//           <SelectContent>
//             {services.length === 0 && !loading && (
//               <div className="p-2 text-sm text-gray-500">No services available</div>
//             )}
//             {services.map((serviceItem) => (
//               <SelectItem key={serviceItem.id} value={serviceItem.name}>
//                 <div className="flex items-center">
//                   <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
//                   {serviceItem.name}
//                 </div>
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
        
//         {allowCreate && (
//           <Button variant="outline" size="icon" onClick={handleCreateService}>
//             <Plus className="h-4 w-4" />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DynamicServiceSelector;


//@ts-nocheck
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import serviceService from '@/services/serviceService';
import { Service } from '@/types/service';
import { useSlotStore } from '@/store/slotStore';

interface DynamicServiceSelectorProps {
  service?: string;
  setService?: (service: string) => void;
  serviceCost?: number;
  setServiceCost?: (cost: number) => void;
  showCostFactor?: boolean;
  allowCreate?: boolean;
  onServiceChange?: (serviceId: string, serviceName: string, serviceCost: number) => void;
  className?: string;
  setDuration?: (duration: string) => void;
}

const DynamicServiceSelector = ({
  service: externalService,
  setService: externalSetService,
  serviceCost: externalServiceCost,
  setServiceCost: externalSetServiceCost,
  showCostFactor,
  allowCreate,
  setDuration,
  onServiceChange,
  className = "",
}: DynamicServiceSelectorProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { setService, setServiceCost, setServiceId } = useSlotStore();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        console.log("Fetching services...");
        const fetchedServices = await serviceService.getUserServices();
        console.log("Fetched services:", fetchedServices);
        setServices(fetchedServices);
        
        if (fetchedServices.length > 0) {
          const defaultService = fetchedServices[0];
          console.log("Setting default service:", defaultService);

          setService(defaultService.name);
          setServiceCost(defaultService.cost_factor);
          setServiceId(defaultService.id);

          if (setDuration && defaultService.duration_mins !== undefined) {
            const durationStr = `${defaultService.duration_mins} mins`;
            console.log("Setting duration from default service:", durationStr);
            setDuration(durationStr);
          }                   

          if (externalSetService) {
            console.log("Setting external service:", defaultService.name);
            externalSetService(defaultService.name);
          }
          if (externalSetServiceCost) {
            console.log("Setting external service cost:", defaultService.cost_factor);
            externalSetServiceCost(defaultService.cost_factor);
          }

          if (onServiceChange) {
            console.log("Calling onServiceChange callback with default service");
            onServiceChange(defaultService.id, defaultService.name, defaultService.cost_factor);
          }
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast({
          title: "Error",
          description: "Failed to load services. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (serviceId: string) => {
    console.log("Selected service ID:", serviceId);
    const selectedService = services.find(s => s.id === serviceId);
    if (selectedService) {
      console.log("Selected service:", selectedService);
      setService(selectedService.name);
      setServiceCost(selectedService.cost_factor);
      setServiceId(selectedService.id);
      if (setDuration && selectedService.duration_mins !== undefined) {
        const durationStr = `${selectedService.duration_mins} mins`;
        console.log("Setting duration from selected service:", durationStr);
        setDuration(durationStr);
      }           
      if (externalSetService) {
        console.log("Updating external service state:", selectedService.name);
        externalSetService(selectedService.name);
      }
      if (externalSetServiceCost) {
        console.log("Updating external service cost:", selectedService.cost_factor);
        externalSetServiceCost(selectedService.cost_factor);
      }

      if (onServiceChange) {
        console.log("Calling onServiceChange with:", selectedService.id, selectedService.name, selectedService.cost_factor);
        onServiceChange(selectedService.id, selectedService.name, selectedService.cost_factor);
      }
    } else {
      console.warn("Selected service not found in list!");
    }
  };

  return (
    <div className={className}>
      <Select disabled={loading} onValueChange={handleServiceChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={loading ? "Loading services..." : "Select a service"} />
        </SelectTrigger>
        <SelectContent>
          {services.map((service) => (
            <SelectItem key={service.id} value={service.id}>
              {service.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DynamicServiceSelector;