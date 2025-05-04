
import Layout from "@/components/layout/Layout";
import ServiceCreationForm from "@/components/slot-broadcast/service-creation/ServiceCreationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceCreation = () => {
  const navigate = useNavigate();
  
  return (
    <Layout title="Service Creation">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/slot-broadcast")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Slot Broadcast
          </Button>
          <div className="flex items-center">
            <span className="text-3xl mr-2">•</span>
            <h2 className="text-xl font-semibold">Create Your Service</h2>
          </div>
        </div>
        
        <div className="bg-white/50 shadow-sm rounded-lg p-6 border backdrop-blur-sm">
          <div className="mb-4 text-gray-700">
            Create a service that users can book. You'll add scheduling details later when you broadcast slots.
          </div>
          <ServiceCreationForm />
        </div>
      </div>
    </Layout>
  );
};

export default ServiceCreation;
