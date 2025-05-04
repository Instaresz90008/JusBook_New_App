
import { Button } from "@/components/ui/button";
import { CalendarClock, Share, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlanUpgradeButton from "@/components/subscription/PlanUpgradeButton";
import { SlotBroadcastHeaderProps } from "@/types/subscription";

const SlotBroadcastHeader = ({ copyToClipboard, setActiveTab }: SlotBroadcastHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <span className="text-3xl mr-2 text-primary">•</span>
        <h2 className="text-xl font-semibold">Set Your Availability</h2>
      </div>
      <div className="space-x-2 flex items-center">
        <PlanUpgradeButton 
          customVariant="outline"
        />
        <Button 
          variant="outline" 
          className="bg-primary text-white hover:bg-primary/90"
          onClick={() => navigate("/service-creation")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Service
        </Button>
        <Button 
          variant="outline" 
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setActiveTab("manage")}
        >
          <CalendarClock className="h-4 w-4 mr-2" />
          Manage Slots
        </Button>
        <Button 
          variant="outline" 
          className="bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={copyToClipboard}
        >
          <Share className="h-4 w-4 mr-2" />
          Share Availability
        </Button>
      </div>
    </div>
  );
};

export default SlotBroadcastHeader;
