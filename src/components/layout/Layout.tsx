
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { MenuIcon } from "lucide-react";
import BackgroundAnimation from "../theme/BackgroundAnimation";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { animationEnabled } = useTheme();
  const location = useLocation();
  const isVoiceAssistantPage = location.pathname === "/voice-assistant";
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Effect to set body classes based on animation state
  useEffect(() => {
    if (animationEnabled) {
      document.body.classList.add('has-animations');
    } else {
      document.body.classList.remove('has-animations');
    }
    
    // Add special class for voice assistant page with enhanced styling
    if (isVoiceAssistantPage) {
      document.body.classList.add('voice-assistant-page');
    } else {
      document.body.classList.remove('voice-assistant-page');
    }
    
    return () => {
      document.body.classList.remove('has-animations');
      document.body.classList.remove('voice-assistant-page');
    };
  }, [animationEnabled, isVoiceAssistantPage]);

  return (
    <div className="flex h-screen">
      <BackgroundAnimation />
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title}>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 mr-2 transition-colors"
            aria-label="Toggle sidebar"
            data-testid="toggle-sidebar"
          >
            <MenuIcon className="h-3.5 w-3.5" />
          </button>
        </Header>
        <main className={cn(
          "flex-1 overflow-auto bg-background/50 backdrop-blur-[2px] p-4 transition-all duration-500",
          isVoiceAssistantPage && "bg-background/30 backdrop-blur-[8px]"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
