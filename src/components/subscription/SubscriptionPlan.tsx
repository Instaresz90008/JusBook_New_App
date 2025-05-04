
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PlanFeature {
  title: string;
  included: boolean;
}

export interface SubscriptionPlanProps {
  name: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  isCurrent?: boolean;
  onSelectPlan: () => void;
}

const SubscriptionPlan = ({
  name,
  price,
  billingPeriod,
  description,
  features,
  isPopular = false,
  isCurrent = false,
  onSelectPlan,
}: SubscriptionPlanProps) => {
  const displayPrice = billingPeriod === "yearly" ? Math.round(price * 10) : price;
  const yearlyDiscount = billingPeriod === "yearly" ? Math.round(price * 12 - price * 10) : 0;
  
  return (
    <div 
      className={`h-full flex flex-col rounded-xl border ${
        isPopular 
          ? "border-primary/50 shadow-lg shadow-primary/10" 
          : isCurrent 
            ? "border-primary/20 bg-primary/5" 
            : "border-border"
      }`}
    >
      <div className="p-6">
        {isPopular && (
          <Badge variant="default" className="mb-2">
            Most Popular
          </Badge>
        )}
        
        {isCurrent && !isPopular && (
          <Badge variant="outline" className="mb-2 border-primary/40 text-primary">
            Current Plan
          </Badge>
        )}
        
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-muted-foreground mt-1.5 text-sm">{description}</p>
        
        <div className="mt-4">
          <div className="flex items-end">
            <span className="text-3xl font-bold">${displayPrice}</span>
            <span className="text-muted-foreground ml-1 mb-1">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
          </div>
          
          {billingPeriod === "yearly" && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              Save ${yearlyDiscount}/year
            </p>
          )}
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-border flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <Check 
                className={`h-5 w-5 mr-2 flex-shrink-0 ${
                  feature.included 
                    ? "text-green-500" 
                    : "text-muted-foreground opacity-40"
                }`} 
              />
              <span 
                className={`text-sm ${!feature.included ? "text-muted-foreground" : ""}`}
              >
                {feature.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-6 border-t border-border mt-auto">
        <Button 
          onClick={onSelectPlan}
          variant={isPopular ? "default" : isCurrent ? "outline" : "secondary"}
          className={`w-full ${isCurrent ? "border-primary/30 text-primary hover:bg-primary/10" : ""}`}
        >
          {isCurrent ? "Current Plan" : "Select Plan"}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
