
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BillingPeriod } from "@/types/subscription";
import { plans, getAllUniqueFeatures } from "./PlansList";
import { calculateYearlyPrice } from "@/utils/subscription/subscriptionUtils";

interface PlanComparisonTableProps {
  billingPeriod: BillingPeriod;
}

const PlanComparisonTable = ({ billingPeriod }: PlanComparisonTableProps) => {
  const allFeatures = getAllUniqueFeatures();

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Plan Comparison</h2>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Features</th>
              {plans.map((plan) => (
                <th key={plan.id} className="py-3 px-4 text-left font-medium">
                  {plan.name}
                  {plan.isPopular && (
                    <Badge variant="default" className="ml-2">
                      Popular
                    </Badge>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((featureTitle, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="py-3 px-4 border-t">{featureTitle}</td>
                {plans.map((plan) => {
                  const feature = plan.features.find(
                    (f) => f.title === featureTitle
                  );
                  return (
                    <td key={plan.id} className="py-3 px-4 border-t">
                      {feature?.included ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <span className="block w-5 h-0.5 bg-muted-foreground/30 rounded-full" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="bg-muted/30">
              <td className="py-4 px-4 border-t font-medium">Price</td>
              {plans.map((plan) => (
                <td key={plan.id} className="py-4 px-4 border-t font-medium">
                  ${billingPeriod === "monthly" ? 
                    plan.monthlyPrice : 
                    calculateYearlyPrice(plan.monthlyPrice)}/{billingPeriod === "monthly" ? "mo" : "yr"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanComparisonTable;
