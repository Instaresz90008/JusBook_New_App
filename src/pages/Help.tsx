
import Layout from "@/components/layout/Layout";
import { HelpCircle, Search, FileText, MessageSquare, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <Layout title="Get Help">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="text-center mb-8">
            <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-2xl font-bold mb-2">How can we help you?</h1>
            <p className="text-gray-600">Search our knowledge base or contact support</p>
          </div>
          
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-10 py-6 text-lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <FileText className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium mb-1">Documentation</h3>
              <p className="text-sm text-gray-600 mb-3">Browse our user guides and tutorials</p>
              <Button variant="link" className="text-blue-600">Read docs</Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium mb-1">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-3">Chat with our support team</p>
              <Button variant="link" className="text-green-600">Start chat</Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <ExternalLink className="mx-auto h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium mb-1">Community</h3>
              <p className="text-sm text-gray-600 mb-3">Join our community forum</p>
              <Button variant="link" className="text-purple-600">Visit forum</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How do I set up my availability?</h3>
              <p className="text-gray-600 text-sm">
                You can set up your availability by navigating to the Slot Broadcast page and selecting the days and times you're available.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How do I manage my bookings?</h3>
              <p className="text-gray-600 text-sm">
                All your bookings can be managed from the Event Management dashboard, where you can view, edit, or cancel appointments.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Can I integrate with my calendar?</h3>
              <p className="text-gray-600 text-sm">
                Yes, Jusbook supports integration with Google Calendar, Microsoft Outlook, and other popular calendar services.
              </p>
            </div>
            
            <div className="pb-4">
              <h3 className="font-medium mb-2">How do I upgrade my account?</h3>
              <p className="text-gray-600 text-sm">
                To upgrade your account, click on the "Upgrade now" button in the sidebar or navigate to the billing section in your account settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
