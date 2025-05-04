
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useLocation } from "react-router-dom";
import PlanUpgradeButton from "@/components/subscription/PlanUpgradeButton";
import { useToast } from "@/hooks/use-toast";
import { usePlan } from "@/hooks/usePlan";
import { BillingPlan } from "@/components/settings/BillingPlan";

const BillingTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false);
  const { currentPlan, currentPlanId, plans } = usePlan({});
  
  // Check if user was redirected from the upgrade page
  useEffect(() => {
    const isFromUpgrade = location.state?.fromUpgrade;
    if (isFromUpgrade) {
      setShowUpgradeSuccess(true);
      // Clear the state after 5 seconds
      const timer = setTimeout(() => {
        setShowUpgradeSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Billing & Subscription</h2>
      <p className="text-gray-500 mb-6">Manage your subscription and payment methods</p>
      
      {showUpgradeSuccess && (
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 p-4 mb-4 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-green-800 dark:text-green-300">Upgrade Successful!</h3>
            <p className="text-sm text-green-600 dark:text-green-400">
              Your subscription has been upgraded successfully. Your new plan is now active.
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-semibold">Current Plan</h3>
          </CardHeader>
          <CardContent>
            <CurrentPlanCard />
            
            <Separator className="my-6" />
            
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/upgrade')}
              >
                Change Plan
              </Button>
              <Button variant="outline" size="sm">Update Payment Method</Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>
        
        <BillingHistoryCard />
      </div>
      
      <BillingPlan />
    </div>
  );
};

const CurrentPlanCard = () => {
  const { currentPlan } = usePlan({});
  
  return (
    <>
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 -mt-8 -mr-8 bg-purple-200 dark:bg-purple-700/30 rounded-full opacity-70"></div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 text-xs font-medium px-2.5 py-1 rounded">Professional</span>
            <h4 className="text-2xl font-bold mt-2">$24<span className="text-sm font-normal text-muted-foreground">/month</span></h4>
            <p className="text-sm text-muted-foreground mt-1">Billed annually ($288/year)</p>
          </div>
          <div>
            <PlanUpgradeButton>Upgrade Plan</PlanUpgradeButton>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Event usage</span>
            <span className="font-medium">145/200 events</span>
          </div>
          <Progress value={72} className="h-2" />
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium">Next billing date</h5>
            <p className="text-sm text-muted-foreground">July 22, 2025</p>
          </div>
          <div>
            <h5 className="text-sm font-medium">Payment method</h5>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CreditCard className="h-3 w-3" />
              <span>•••• 4242</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-3">Plan Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
          {currentPlan?.features
            .filter(feature => feature.included)
            .map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature.title}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const BillingHistoryCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Billing History</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { date: "Jun 22, 2025", amount: "$24.00", status: "Upcoming" },
            { date: "May 22, 2025", amount: "$24.00", status: "Paid" },
            { date: "Apr 22, 2025", amount: "$24.00", status: "Paid" },
            { date: "Mar 22, 2025", amount: "$24.00", status: "Paid" }
          ].map((invoice, i) => (
            <div key={i} className="flex justify-between items-center py-2">
              <div>
                <p className="text-sm font-medium">{invoice.date}</p>
                <p className="text-xs text-muted-foreground">{invoice.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{invoice.amount}</span>
                {invoice.status === "Paid" && (
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" className="w-full mt-4">
          View All Invoices
        </Button>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
