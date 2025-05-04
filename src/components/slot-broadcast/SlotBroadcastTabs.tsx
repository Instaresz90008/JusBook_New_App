
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Filter, Bell } from "lucide-react";
import TemplateManagement from "@/components/slot-broadcast/TemplateManagement";
import NotificationSettings from "@/components/slot-broadcast/NotificationSettings";

interface SlotBroadcastTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  manageTabContent: React.ReactNode;
}

const SlotBroadcastTabs = ({ 
  activeTab, 
  setActiveTab, 
  manageTabContent 
}: SlotBroadcastTabsProps) => {
  return (
    <Tabs defaultValue="manage" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 bg-background">
        <TabsTrigger value="manage" className="flex items-center">
          <CalendarClock className="h-4 w-4 mr-2" />
          Manage
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Templates
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="manage" className="space-y-4 mt-2">
        {manageTabContent}
      </TabsContent>
      
      <TabsContent value="templates" className="space-y-4 mt-2">
        <TemplateManagement />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-4 mt-2">
        <NotificationSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SlotBroadcastTabs;
