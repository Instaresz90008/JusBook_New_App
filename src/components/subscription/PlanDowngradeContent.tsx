
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getPlanById, getCurrentPlan } from "./PlansList";

interface PlanDowngradeContentProps {
  selectedPlan: string | null;
  onClose: () => void;
}

const PlanDowngradeContent = ({ selectedPlan, onClose }: PlanDowngradeContentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentPlanId = getCurrentPlan();
  const currentPlan = getPlanById(currentPlanId);
  const targetPlan = selectedPlan ? getPlanById(selectedPlan) : null;
  
  const handleScheduleDowngrade = () => {
    if (!targetPlan) return;
    
    setIsProcessing(true);
    
    // Simulate downgrade scheduling
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      
      toast({
        title: "Downgrade Scheduled",
        description: `Your plan will change to ${targetPlan.name} at the end of your billing cycle.`,
      });
      
      // Redirect to billing tab in settings to show scheduled change
      navigate("/settings");
    }, 1500);
  };
  
  // Get features that will be lost after downgrade
  const getLostFeatures = () => {
    if (!currentPlan || !targetPlan) return [];
    
    return currentPlan.features
      .filter(f => f.included)
      .filter(currentFeature => {
        const featureInTargetPlan = targetPlan.features.find(
          tf => tf.title === currentFeature.title
        );
        return !(featureInTargetPlan?.included);
      });
  };
  
  const lostFeatures = getLostFeatures();
  
  if (!targetPlan) return null;
  
  return (
    <>
      <div className="py-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-1.5 block">When should the downgrade take effect?</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer bg-muted/30">
                <input 
                  type="radio" 
                  id="end-of-cycle" 
                  name="downgrade-timing" 
                  checked={!selectedDate} 
                  onChange={() => setSelectedDate(null)}
                  className="h-4 w-4"
                />
                <div>
                  <Label htmlFor="end-of-cycle" className="font-medium cursor-pointer">End of billing cycle</Label>
                  <p className="text-sm text-muted-foreground">May 22, 2025</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer">
                <input 
                  type="radio" 
                  id="specific-date" 
                  name="downgrade-timing" 
                  checked={!!selectedDate} 
                  onChange={() => setSelectedDate(new Date())}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <Label htmlFor="specific-date" className="font-medium cursor-pointer">Specific date</Label>
                  <input 
                    type="date" 
                    className="w-full p-1 mt-1 border rounded-md text-sm"
                    disabled={!selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {lostFeatures.length > 0 && (
            <div className="pt-4 border-t">
              <p className="font-medium mb-2">Changes in your plan</p>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">After downgrade, you will lose access to:</p>
                <ul className="space-y-1.5">
                  {lostFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start text-red-500">
                      <span className="block w-4 h-0.5 bg-red-500 mr-2 mt-2.5" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <Button onClick={handleScheduleDowngrade} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Schedule Downgrade"}
        </Button>
        <Button variant="outline" onClick={onClose} disabled={isProcessing}>Cancel</Button>
      </div>
    </>
  );
};

export default PlanDowngradeContent;
