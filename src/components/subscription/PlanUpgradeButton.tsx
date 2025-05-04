
import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PlanUpgradeButtonProps extends Omit<ButtonProps, 'customVariant'> {
  customVariant?: "primary" | "outline" | "minimal";
  showIcon?: boolean;
  preselectedPlan?: string;
}

const PlanUpgradeButton = ({ 
  customVariant = "primary", 
  showIcon = true, 
  preselectedPlan,
  className,
  children,
  ...props 
}: PlanUpgradeButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleUpgradeClick = () => {
    // Build the navigation URL with an optional plan parameter
    const upgradeUrl = preselectedPlan 
      ? `/upgrade?plan=${preselectedPlan}` 
      : "/upgrade";
      
    navigate(upgradeUrl);
    
    toast({
      title: "Upgrade Plan",
      description: "Accessing premium plan options...",
    });
  };
  
  const getButtonStyle = () => {
    switch (customVariant) {
      case "primary":
        return "bg-primary text-primary-foreground hover:bg-primary/90";
      case "outline":
        return "bg-green-500 text-white hover:bg-green-600";
      case "minimal":
        return "bg-transparent text-primary hover:bg-primary/10";
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/90";
    }
  };
  
  // Map our custom variant to a supported shadcn Button variant
  const getShadcnVariant = (): ButtonProps["variant"] => {
    if (customVariant === "minimal") return "ghost";
    return "outline";
  };
  
  return (
    <Button 
      variant={getShadcnVariant()}
      onClick={handleUpgradeClick}
      className={`${getButtonStyle()} ${className}`}
      {...props}
    >
      {showIcon && <ArrowRight className="h-4 w-4 mr-2" />}
      {children || "Upgrade Plan"}
    </Button>
  );
};

export default PlanUpgradeButton;
