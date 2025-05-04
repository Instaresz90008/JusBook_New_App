
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Bell, Calendar, Globe, CreditCard, Shield, MessageSquare } from "lucide-react";
import ProfileTab from "./ProfileTab";
import NotificationsTab from "./NotificationsTab";
import IntegrationsTab from "./IntegrationsTab";
import AppearanceTab from "./AppearanceTab";
import BillingTab from "./BillingTab";
import SecurityTab from "./SecurityTab";
import TeamTab from "./TeamTab";
import ApiTab from "./ApiTab";

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <div className="bg-card rounded-lg border shadow-sm p-2 sticky top-0 z-10 mb-6">
        <TabsList className="grid grid-cols-4 md:grid-cols-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Team</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">API</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="profile">
        <ProfileTab />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
      
      <TabsContent value="integrations">
        <IntegrationsTab />
      </TabsContent>
      
      <TabsContent value="appearance">
        <AppearanceTab />
      </TabsContent>
      
      <TabsContent value="billing">
        <BillingTab />
      </TabsContent>
      
      <TabsContent value="security">
        <SecurityTab />
      </TabsContent>
      
      <TabsContent value="team">
        <TeamTab />
      </TabsContent>
      
      <TabsContent value="api">
        <ApiTab />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
