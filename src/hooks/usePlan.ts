
import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Plan, BillingPeriod, PlanFeature } from '@/types/subscription';
import { plans, getCurrentPlan, getPlanById } from '@/components/subscription/PlansList';
import { calculateYearlyPrice } from '@/utils/subscription/subscriptionUtils';

interface UsePlanOptions {
  initialBillingPeriod?: BillingPeriod;
}

export function usePlan(options: UsePlanOptions = {}) {
  const { initialBillingPeriod = 'monthly' } = options;
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(initialBillingPeriod);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [isDowngradeSheetOpen, setIsDowngradeSheetOpen] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const currentPlanId = useMemo(() => getCurrentPlan(), []);
  const currentPlan = useMemo(() => getPlanById(currentPlanId), [currentPlanId]);
  const selectedPlan = useMemo(
    () => selectedPlanId ? getPlanById(selectedPlanId) : null,
    [selectedPlanId]
  );
  
  // Extract plan from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const planParam = searchParams.get('plan');
    
    if (planParam && plans.some(plan => plan.id === planParam)) {
      setSelectedPlanId(planParam);
      
      if (planParam !== currentPlanId) {
        const isPlanUpgrade = isPlanHigherTier(planParam, currentPlanId);
        
        // Auto-open the appropriate dialog/sheet based on the selected plan
        setTimeout(() => {
          if (isPlanUpgrade) {
            setIsUpgradeDialogOpen(true);
          } else {
            setIsDowngradeSheetOpen(true);
          }
        }, 500);
      }
    }
  }, [location.search, currentPlanId]);
  
  // Check if a plan is higher tier than another
  const isPlanHigherTier = (planId: string, comparisonPlanId: string): boolean => {
    const planIndex = plans.findIndex(p => p.id === planId);
    const comparisonIndex = plans.findIndex(p => p.id === comparisonPlanId);
    return planIndex > comparisonIndex;
  };
  
  // Get plan price based on billing period
  const getPlanPrice = (plan: Plan | null | undefined): number => {
    if (!plan) return 0;
    return billingPeriod === 'monthly' 
      ? plan.monthlyPrice 
      : calculateYearlyPrice(plan.monthlyPrice);
  };
  
  // Get savings amount when switching to yearly billing
  const getYearlySavings = (plan: Plan | null | undefined): number => {
    if (!plan) return 0;
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlyTotal = calculateYearlyPrice(plan.monthlyPrice);
    return monthlyTotal - yearlyTotal;
  };
  
  // Get features that will be lost when downgrading
  const getLostFeatures = (fromPlanId: string, toPlanId: string): PlanFeature[] => {
    const fromPlan = getPlanById(fromPlanId);
    const toPlan = getPlanById(toPlanId);
    
    if (!fromPlan || !toPlan) return [];
    
    return fromPlan.features
      .filter(f => f.included)
      .filter(currentFeature => {
        const featureInTargetPlan = toPlan.features.find(
          tf => tf.title === currentFeature.title
        );
        return !(featureInTargetPlan?.included);
      });
  };
  
  // Handle plan selection
  const selectPlan = (planId: string) => {
    if (planId === currentPlanId) {
      // Don't do anything if they select their current plan
      return;
    }
    
    setSelectedPlanId(planId);
    
    if (isPlanHigherTier(planId, currentPlanId)) {
      // Upgrading to a higher tier
      setIsUpgradeDialogOpen(true);
    } else {
      // Downgrading to a lower tier
      setIsDowngradeSheetOpen(true);
    }
  };
  
  // Handle plan upgrade confirmation
  const confirmUpgrade = async () => {
    if (!selectedPlan) return;
    
    setIsProcessingAction(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Close dialog
      setIsUpgradeDialogOpen(false);
      setIsProcessingAction(false);
      
      // Show success toast
      toast({
        title: "Upgrade Successful!",
        description: `You've upgraded to the ${selectedPlan.name} plan.`,
      });
      
      // Redirect to billing tab in settings to show new plan details
      navigate("/settings", { state: { fromUpgrade: true } });
    } catch (error) {
      setIsProcessingAction(false);
      toast({
        title: "Upgrade Failed",
        description: "There was an error processing your upgrade. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle plan downgrade confirmation
  const confirmDowngrade = async (scheduleDate: Date | null = null) => {
    if (!selectedPlan) return;
    
    setIsProcessingAction(true);
    
    try {
      // Simulate downgrade scheduling
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Close sheet
      setIsDowngradeSheetOpen(false);
      setIsProcessingAction(false);
      
      // Show success toast
      toast({
        title: "Downgrade Scheduled",
        description: `Your plan will change to ${selectedPlan.name} at the end of your billing cycle.`,
      });
      
      // Redirect to billing tab in settings to show scheduled change
      navigate("/settings");
    } catch (error) {
      setIsProcessingAction(false);
      toast({
        title: "Scheduling Failed",
        description: "There was an error scheduling your downgrade. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return {
    // State
    billingPeriod,
    selectedPlanId,
    selectedPlan,
    currentPlanId,
    currentPlan,
    isUpgradeDialogOpen,
    isDowngradeSheetOpen,
    isProcessingAction,
    plans,
    
    // Actions
    setBillingPeriod,
    selectPlan,
    setSelectedPlanId,
    setIsUpgradeDialogOpen,
    setIsDowngradeSheetOpen,
    confirmUpgrade,
    confirmDowngrade,
    
    // Helpers
    isPlanHigherTier,
    getPlanPrice,
    getYearlySavings,
    getLostFeatures
  };
}
