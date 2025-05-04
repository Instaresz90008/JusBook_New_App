
import { Bell, Mic } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import PlanUpgradeButton from "@/components/subscription/PlanUpgradeButton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logger } from "@/utils/logger";

interface HeaderActionsProps {
  onMicClick?: () => void;
}

const HeaderActions = ({ onMicClick }: HeaderActionsProps) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const { animationEnabled } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  
  // Function to navigate to the Tara page directly
  const handleMicClick = () => {
    logger.trackEvent("header_mic_clicked");
    
    if (onMicClick) {
      onMicClick();
    } else {
      navigate('/voice-assistant');
    }
  };

  const handleLogout = () => {
    logger.trackEvent("header_logout_clicked");
    logout();
    navigate("/login");
  };
  
  const getUserInitials = () => {
    if (!user?.username) return "U";
    
    const nameParts = user.username.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.username.substring(0, 2).toUpperCase();
  };
  
  return (
    <div className="flex items-center gap-4">
      {isAuthenticated && (
        <PlanUpgradeButton 
          customVariant="minimal"
          className="text-xs border border-primary/30"
        >
          Upgrade <span className="hidden sm:inline ml-1">Plan</span>
        </PlanUpgradeButton>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "rounded-full overflow-hidden relative bg-gradient-to-r from-background to-background hover:from-primary/5 hover:to-background transition-all duration-300",
                animationEnabled && isHovering ? "ring-2 ring-primary/30 ring-offset-1 scale-110" : ""
              )}
              onClick={handleMicClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Mic className={cn(
                "h-4 w-4 transition-all duration-300",
                isHovering ? "text-primary scale-110" : "text-foreground/70"
              )} />
              {animationEnabled && isHovering && (
                <span className="absolute inset-0 bg-primary/10 animate-pulse rounded-full" />
              )}
              
              {/* Enhanced pulse animation */}
              {animationEnabled && isHovering && (
                <>
                  <span className="absolute -inset-0.5 rounded-full border border-primary/30 animate-ping opacity-70" />
                  <span className="absolute -inset-1 rounded-full border border-primary/20 animate-ping opacity-50 animation-delay-75" />
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tara Voice Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isAuthenticated ? (
        <>
          <Button className="relative" variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-foreground/70" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              1
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 border border-border cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.username}
                <p className="text-xs font-normal text-muted-foreground mt-1">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive" 
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeaderActions;
