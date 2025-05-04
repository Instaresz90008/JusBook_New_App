
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getPlanById, getCurrentPlan } from "./PlansList";
import { BillingPeriod } from "@/types/subscription";
import { usePlan } from "@/hooks/usePlan";

interface PlanDialogContentProps {
  selectedPlan: string | null;
  billingPeriod: BillingPeriod;
  onClose: () => void;
}

const PlanDialogContent = ({ selectedPlan, billingPeriod, onClose }: PlanDialogContentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const currentPlan = getCurrentPlan();
  const planDetails = selectedPlan ? getPlanById(selectedPlan) : null;
  
  const handleUpgrade = () => {
    if (!planDetails) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      
      toast({
        title: "Upgrade Successful!",
        description: `You've upgraded to the ${planDetails.name} plan.`,
      });
      
      // Redirect to billing tab in settings to show new plan details
      navigate("/settings", { state: { fromUpgrade: true } });
    }, 2000);
  };
  
  if (!planDetails) return null;
  
  return (
    <>
      <div className="py-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <p className="font-medium">{planDetails.name} Plan ({billingPeriod})</p>
              <p className="text-sm text-muted-foreground">Effective immediately</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                ${billingPeriod === "monthly" 
                  ? planDetails.monthlyPrice
                  : Math.round(planDetails.monthlyPrice * 10)
                }/{billingPeriod === "monthly" ? "mo" : "yr"}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">You'll get:</p>
            <ul className="text-sm space-y-1.5">
              {planDetails.features
                .filter(f => f.included)
                .map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>{feature.title}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={isProcessing}>Cancel</Button>
        <Button onClick={handleUpgrade} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Confirm Upgrade"}
        </Button>
      </div>
    </>
  );
};

export default PlanDialogContent;
