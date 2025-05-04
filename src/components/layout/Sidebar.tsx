
import { useLocation, useNavigate } from "react-router-dom";
import { 
  User, 
  Calendar, 
  History, 
  Settings,
  HelpCircle,
  LayoutDashboard,
  Radio,
  Plus,
  Mic,
  Link,
  LogOut,
  UserCircle,
  Bookmark,
} from "lucide-react";
import Logo from "./Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { Badge } from "@/components/ui/badge";
import PlanUpgradeButton from "@/components/subscription/PlanUpgradeButton";
import { useAuth } from "@/hooks/useAuth";
import { logger } from "@/utils/logger";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { toast } = useToast();
  const currentPath = location.pathname;
  
  // Define sidebar items based on authentication status
  const sidebarItems = [

    {
      label: "Event Hub",
      icon: <LayoutDashboard className="h-3.5 w-3.5" />,
      path: "/",
      requiresAuth: false,
    },
    {
      label: "Slot Broadcast",
      icon: <Radio className="h-3.5 w-3.5" />,
      path: "/slot-broadcast",
      requiresAuth: true,
    },
    {
      label: "Service Creation",
      icon: <Plus className="h-3.5 w-3.5" />,
      path: "/service-creation",
      requiresAuth: true,
    },
    {
      label: "Calendar",
      icon: <Calendar className="h-3.5 w-3.5" />,
      path: "/calendar",
      requiresAuth: true,
    },
    {
      label: "Event Management",
      icon: <User className="h-3.5 w-3.5" />,
      path: "/event-management",
      requiresAuth: true,
    },
    {
      label: "History",
      icon: <History className="h-3.5 w-3.5" />,
      path: "/history",
      requiresAuth: true,
    },
    {
      label: "Booking Link",
      icon: <Link className="h-3.5 w-3.5" />,
      path: "/book/demo",
      requiresAuth: true,
    },
    {
      label: "Bookings",
      icon: <Bookmark className="h-3.5 w-3.5" />,
      path: "/bookings",
      requiresAuth: true,
    },
  ];

  const bottomItems = [
    {
      label: "Profile",
      icon: <UserCircle className="h-3.5 w-3.5" />,
      path: "/profile",
      requiresAuth: true,
    },
    {
      label: "Get Help",
      icon: <HelpCircle className="h-3.5 w-3.5" />,
      path: "/help",
      requiresAuth: false,
    },
    {
      label: "Configure",
      icon: <Settings className="h-3.5 w-3.5" />,
      path: "/settings",
      requiresAuth: true,
    },
  ];

  // Filter items based on auth status
  const visibleSidebarItems = sidebarItems.filter(
    item => !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );
  
  const visibleBottomItems = bottomItems.filter(
    item => !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };
  
  const handleLogout = () => {
    logger.trackEvent("sidebar_logout_clicked");
    logout();
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  return (
    <aside className={`flex flex-col border-r border-border h-screen bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] transition-all duration-300 ${collapsed ? 'w-12' : 'w-52'}`}>
      <div className="p-2 flex items-center justify-between">
        {!collapsed && <Logo />}
        {collapsed && <div className="w-6 h-6 mx-auto bg-primary/10 rounded-md flex items-center justify-center text-primary font-bold text-xs">T</div>}
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="px-1.5 py-2 space-y-0.5">
          {/* Auth status indicator */}
          {!collapsed && isAuthenticated && (
            <div className="px-2 py-1 mb-2 text-xs text-muted-foreground">
              Signed in as {user?.username}
            </div>
          )}
          
          {/* Main navigation items */}
          {visibleSidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`sidebar-item w-full text-left ${isActive(item.path) ? "active" : ""} ${collapsed ? 'justify-center' : ''} text-xs py-1.5`}
            >
              {item.icon}
              {!collapsed && <span className="text-[11px]">{item.label}</span>}
            </button>
          ))}
          
          {/* Authentication buttons for non-authenticated users */}
          {!isAuthenticated && !collapsed && (
            <div className="mt-4 space-y-1.5 px-1">
              <button
                onClick={() => navigate("/login")}
                className="w-full py-1.5 px-2 text-[11px] bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full py-1.5 px-2 text-[11px] border border-primary/30 text-primary rounded-md hover:bg-primary/10 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </nav>
      </ScrollArea>
      
      <div className="px-1.5 py-2 border-t border-border">
        {!collapsed && (
          <>
            <button
              onClick={() => navigate("/voice-assistant")}
              className={`sidebar-item w-full text-left mb-2 text-xs py-1.5 ${collapsed ? 'justify-center' : ''}`}
            >
              <Mic className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px]">Tara</span>
            </button>
            
            {isAuthenticated && (
              <div className="bg-primary/10 rounded-lg p-1.5 mb-3">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="text-[11px] font-medium">Free trial</div>
                  <Badge variant="warning" className="text-[9px] py-0 px-1">7 days left</Badge>
                </div>
                <div className="text-[9px] text-muted-foreground mb-1">Basic plan • Limited features</div>
                <PlanUpgradeButton 
                  className="w-full py-1 px-2 rounded-md text-[10px] flex items-center justify-center gap-1"
                  preselectedPlan="advanced"
                >
                  Upgrade now
                </PlanUpgradeButton>
              </div>
            )}
          </>
        )}
        
        {collapsed && (
          <>
            <button
              onClick={() => navigate("/voice-assistant")}
              className="sidebar-item w-full justify-center mb-2 py-1.5"
            >
              <Mic className="h-3.5 w-3.5 text-primary" />
            </button>
            
            {isAuthenticated && (
              <button
                onClick={() => navigate("/upgrade?plan=advanced")}
                className="w-full h-6 bg-primary hover:opacity-90 text-primary-foreground rounded-md flex items-center justify-center mb-2"
              >
                <Badge variant="warning" className="text-[8px] h-3.5 px-0.5">7d</Badge>
              </button>
            )}
          </>
        )}
        
        {/* Bottom navigation items */}
        {visibleBottomItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`sidebar-item w-full text-left mb-1 text-xs py-1.5 ${collapsed ? 'justify-center' : ''}`}
          >
            {item.icon}
            {!collapsed && <span className="text-[11px]">{item.label}</span>}
          </button>
        ))}
        
        {/* Logout button for authenticated users */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className={`sidebar-item w-full text-left mb-1 text-xs py-1.5 ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="h-3.5 w-3.5 text-destructive" />
            {!collapsed && <span className="text-[11px] text-destructive">Logout</span>}
          </button>
        )}
        
        <div className={`flex ${collapsed ? 'justify-center mt-2' : 'justify-end mt-1.5'}`}>
          <ThemeSwitcher />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
