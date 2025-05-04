
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface EmailSettingsProps {
  email: string;
  setEmail: (email: string) => void;
  emailTemplate: string;
  setEmailTemplate: (template: string) => void;
}

const EmailSettings = ({
  email,
  setEmail,
  emailTemplate,
  setEmailTemplate
}: EmailSettingsProps) => {
  const defaultEmailTemplate = `Hi {name},
Congratulations! Booking has been done.

Event Details:
• Date: {date}
• Time: {time}
• Location: Join meet

We are looking forward to welcoming you and ensuring you have a wonderful time. This event will provide an excellent opportunity to connect with others and gain valuable insights. Should you have any inquiries or need assistance, please feel free to contact us.

Best regards,
{host}`;

  return (
    <div className="bg-white rounded-lg border p-5">
      <h3 className="font-medium text-lg mb-4">Email Settings</h3>
      
      {/* Email section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Email</label>
        <Select value={email} onValueChange={setEmail}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select email" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nk.cloudern@gmail.com">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                nk.cloudern@gmail.com
              </div>
            </SelectItem>
            <SelectItem value="info@company.com">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                info@company.com
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Email template */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
        <Select value={emailTemplate} onValueChange={setEmailTemplate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select email template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Template</SelectItem>
            <SelectItem value="reminder">Reminder Template</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Email template editor */}
      <div className="mb-4">
        <div className="border rounded-md mb-2">
          <div className="flex items-center p-2 border-b overflow-x-auto">
            <Button variant="ghost" size="sm" className="h-8 px-2">Normal</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 font-bold">B</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 italic">I</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 underline">U</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">-</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">"</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">•</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">1.</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">⌐</Button>
          </div>
          <Textarea 
            className="min-h-[200px] border-0" 
            placeholder="Email template content"
            defaultValue={defaultEmailTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
