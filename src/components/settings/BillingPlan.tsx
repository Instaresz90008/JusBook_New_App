
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "@/hooks/usePlan";

export const BillingPlan = () => {
  const navigate = useNavigate();
  const { currentPlanId } = usePlan({});
  
  // Sample plans structure for the billing tab
  // In a real app, these would come from the usePlan hook or API
  const billingPlans = [
    { 
      id: "basic",
      name: "Starter", 
      price: "$0", 
      highlight: false,
      features: ["50 events/month", "Basic analytics", "1 team member"]
    },
    { 
      id: "professional",
      name: "Professional", 
      price: "$24", 
      highlight: true,
      features: ["200 events/month", "Advanced analytics", "5 team members", "Email support", "Custom branding"]
    },
    { 
      id: "business",
      name: "Business", 
      price: "$49", 
      highlight: false,
      features: ["Unlimited events", "Advanced analytics", "Unlimited team members", "Priority support", "Custom domains", "API access"]
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Available Plans</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {billingPlans.map((plan, i) => (
            <div 
              key={i} 
              className={`border rounded-lg p-6 ${plan.highlight ? 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20' : ''}`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.id === currentPlanId ? "default" : "outline"}
                className="w-full mt-6"
                onClick={() => {
                  if (plan.id !== currentPlanId) {
                    navigate(`/upgrade?plan=${plan.id}`);
                  }
                }}
              >
                {plan.id === currentPlanId ? "Current Plan" : "Select Plan"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
