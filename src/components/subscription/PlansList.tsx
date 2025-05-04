
import { Plan, PlanFeature } from "@/types/subscription";

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential features for small teams",
    monthlyPrice: 9,
    features: [
      { title: "5 team members", included: true },
      { title: "50 events/month", included: true },
      { title: "Basic analytics", included: true },
      { title: "Email support", included: true },
      { title: "Calendar integrations", included: false },
      { title: "Custom branding", included: false },
      { title: "Advanced analytics", included: false },
      { title: "Dedicated support", included: false },
      { title: "API access", included: false },
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "For growing businesses and teams",
    monthlyPrice: 29,
    features: [
      { title: "15 team members", included: true },
      { title: "150 events/month", included: true },
      { title: "Basic analytics", included: true },
      { title: "Email support", included: true },
      { title: "Calendar integrations", included: true },
      { title: "Custom branding", included: true },
      { title: "Advanced analytics", included: false },
      { title: "Dedicated support", included: false },
      { title: "API access", included: false },
    ],
    isPopular: true,
  },
  {
    id: "pro",
    name: "Professional",
    description: "For businesses requiring more power",
    monthlyPrice: 59,
    features: [
      { title: "Unlimited team members", included: true },
      { title: "500 events/month", included: true },
      { title: "Basic analytics", included: true },
      { title: "Priority email support", included: true },
      { title: "Calendar integrations", included: true },
      { title: "Custom branding", included: true },
      { title: "Advanced analytics", included: true },
      { title: "Dedicated support", included: true },
      { title: "API access", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations with custom needs",
    monthlyPrice: 99,
    features: [
      { title: "Unlimited team members", included: true },
      { title: "Unlimited events", included: true },
      { title: "Basic analytics", included: true },
      { title: "Priority email support", included: true },
      { title: "Calendar integrations", included: true },
      { title: "Custom branding", included: true },
      { title: "Advanced analytics", included: true },
      { title: "Dedicated support", included: true },
      { title: "API access", included: true },
    ],
  },
];

export const getCurrentPlan = (): string => {
  // In a real app, this would come from user data or API
  // For now, returning a fixed value for demo
  return "basic";
};

export const getPlanById = (planId: string): Plan | undefined => {
  return plans.find(plan => plan.id === planId);
};

export const getPlanFeatures = (planId: string): PlanFeature[] => {
  return getPlanById(planId)?.features || [];
};

export const getAllUniqueFeatures = (): string[] => {
  return Array.from(
    new Set(
      plans.flatMap(plan => plan.features.map(feature => feature.title))
    )
  );
};
