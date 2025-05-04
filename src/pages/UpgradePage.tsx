
import Layout from "@/components/layout/Layout";
import SubscriptionPlan from "@/components/subscription/SubscriptionPlan";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PlanComparisonTable from "@/components/subscription/PlanComparisonTable";
import PlanDialogContent from "@/components/subscription/PlanDialogContent";
import PlanDowngradeContent from "@/components/subscription/PlanDowngradeContent";
import { plans } from "@/components/subscription/PlansList";
import { usePlan } from "@/hooks/usePlan";

const UpgradePage = () => {
  const {
    billingPeriod,
    setBillingPeriod,
    currentPlanId,
    selectedPlanId,
    isUpgradeDialogOpen,
    isDowngradeSheetOpen,
    setIsUpgradeDialogOpen,
    setIsDowngradeSheetOpen,
    selectPlan
  } = usePlan({ initialBillingPeriod: "monthly" });

  return (
    <Layout title="Upgrade Your Plan">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Choose the Right Plan</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best suits your needs. All plans include core event management features.
            Upgrade or downgrade anytime.
          </p>
          
          <div className="mt-8 inline-flex items-center p-1 bg-muted rounded-lg">
            <RadioGroup
              value={billingPeriod}
              onValueChange={(val) => setBillingPeriod(val as "monthly" | "yearly")}
              className="flex"
            >
              <div className="flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="cursor-pointer">Monthly billing</Label>
              </div>
              
              <div className="flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="cursor-pointer">
                  Annual billing
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Save 16%
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <SubscriptionPlan
              key={plan.id}
              name={plan.name}
              price={plan.monthlyPrice}
              billingPeriod={billingPeriod}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              isCurrent={plan.id === currentPlanId}
              onSelectPlan={() => selectPlan(plan.id)}
            />
          ))}
        </div>
        
        <PlanComparisonTable billingPeriod={billingPeriod} />
        
        <Card className="mt-16 bg-muted/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
                <p className="text-muted-foreground mb-4">
                  Contact our sales team to discuss your specific requirements and get a tailored solution for your organization.
                </p>
                <Button variant="outline">Contact Sales</Button>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Questions about our plans?</h3>
                <p className="text-muted-foreground mb-4">
                  Our support team is here to help you choose the right plan and answer any questions you might have.
                </p>
                <Button variant="outline">Get Support</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upgrade to {plans.find(p => p.id === selectedPlanId)?.name}</DialogTitle>
              <DialogDescription>
                You're about to upgrade from {plans.find(p => p.id === currentPlanId)?.name} to {plans.find(p => p.id === selectedPlanId)?.name}.
                You will be charged immediately for the prorated difference.
              </DialogDescription>
            </DialogHeader>
            <PlanDialogContent 
              selectedPlan={selectedPlanId} 
              billingPeriod={billingPeriod}
              onClose={() => setIsUpgradeDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        
        <Sheet open={isDowngradeSheetOpen} onOpenChange={setIsDowngradeSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Schedule Downgrade</SheetTitle>
              <SheetDescription>
                You're downgrading from {plans.find(p => p.id === currentPlanId)?.name} to {plans.find(p => p.id === selectedPlanId)?.name}.
                Your current plan will remain active until the end of your billing cycle.
              </SheetDescription>
            </SheetHeader>
            <PlanDowngradeContent
              selectedPlan={selectedPlanId}
              onClose={() => setIsDowngradeSheetOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </Layout>
  );
};

export default UpgradePage;
