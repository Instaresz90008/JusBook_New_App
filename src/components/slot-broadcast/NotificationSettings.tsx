
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Settings for notifications
const notificationSettings = {
  email: true,
  sms: false,
  slack: true,
  reminder: "30 minutes before"
};

const NotificationSettings = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border">
      <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Notification Channels</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Checkbox id="email-notification" defaultChecked={notificationSettings.email} />
              <span className="text-sm">Email Notifications</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <Checkbox id="sms-notification" defaultChecked={notificationSettings.sms} />
              <span className="text-sm">SMS Notifications</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <Checkbox id="slack-notification" defaultChecked={notificationSettings.slack} />
              <span className="text-sm">Slack Notifications</span>
            </label>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Reminder Timing</h4>
          <Select defaultValue={notificationSettings.reminder}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select reminder timing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15 minutes before">15 minutes before</SelectItem>
              <SelectItem value="30 minutes before">30 minutes before</SelectItem>
              <SelectItem value="1 hour before">1 hour before</SelectItem>
              <SelectItem value="2 hours before">2 hours before</SelectItem>
              <SelectItem value="1 day before">1 day before</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Notification Events</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Checkbox id="booking-created" defaultChecked />
              <span className="text-sm">When booking is created</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <Checkbox id="booking-updated" defaultChecked />
              <span className="text-sm">When booking is updated</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <Checkbox id="booking-cancelled" defaultChecked />
              <span className="text-sm">When booking is cancelled</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
