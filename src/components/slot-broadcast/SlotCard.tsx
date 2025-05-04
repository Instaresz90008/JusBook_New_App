
import { format, parseISO } from "date-fns";
import { Copy, Link, QrCode, Share, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { serviceOptions } from "./constants";
import { useToast } from "@/hooks/use-toast";

export interface SlotCardProps {
  slot: {
    id: string;
    name: string;
    service: string;
    serviceCost: number;
    days: { [key: string]: boolean };
    startTime: string;
    endTime: string;
    createdAt: string;
    bookingLink: string;
  };
  onShowQRCode: (slot: SlotCardProps['slot']) => void;
}

const SlotCard = ({ slot, onShowQRCode }: SlotCardProps) => {
  const { toast } = useToast();
  
  // Function to get service color based on service name
  const getServiceColor = (serviceName: string) => {
    const service = serviceOptions.find(s => s.name === serviceName);
    return service ? service.color : "gray";
  };

  // Function to copy booking link to clipboard
  const copyBookingLink = () => {
    const link = `${window.location.origin}/book/${slot.bookingLink}`;
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Link Copied!",
      description: "Booking link has been copied to clipboard.",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{slot.name}</h4>
            <div className="flex items-center mt-1">
              <Badge variant={getServiceColor(slot.service) as any}>
                {slot.service}
              </Badge>
              {/* <span className="text-sm text-gray-500 ml-2">{slot.startTime} - {slot.endTime}</span> */}
              <span className="text-sm text-gray-500 ml-2">Cost: {slot.serviceCost}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(slot.days)
                .filter(([_, isActive]) => isActive)
                .map(([day]) => (
                  <span key={day} className="text-xs px-2 py-1 bg-gray-100 rounded-md">{day.substring(0, 3)}</span>
                ))
              }
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={copyBookingLink}
              title="Copy booking link"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => onShowQRCode(slot)}
              title="Show QR code"
            >
              <QrCode className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">Created on {format(parseISO(slot.createdAt), "MMMM d, yyyy")}</div>
      </CardContent>
    </Card>
  );
};

export default SlotCard;
