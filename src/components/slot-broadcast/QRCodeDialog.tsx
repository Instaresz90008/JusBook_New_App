
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface QRCodeDialogProps {
  selectedSlot: {
    id: string;
    name: string;
    bookingLink: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QRCodeDialog = ({ selectedSlot, open, onOpenChange }: QRCodeDialogProps) => {
  const { toast } = useToast();

  // Function to copy booking link to clipboard
  const copyBookingLink = () => {
    if (!selectedSlot) return;
    
    const link = `${window.location.origin}/book/${selectedSlot.bookingLink}`;
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Link Copied!",
      description: "Booking link has been copied to clipboard.",
    });
  };

  // Generate QR code SVG for a slot
  const generateQRCode = () => {
    // This is a simple placeholder SVG for a QR code
    // In a real implementation, you would use a library like qrcode.react
    return (
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white" />
        <g fill="black">
          {/* Frame */}
          <rect x="20" y="20" width="160" height="160" fill="none" stroke="black" strokeWidth="5" />
          
          {/* Position detection patterns */}
          <rect x="40" y="40" width="30" height="30" />
          <rect x="45" y="45" width="20" height="20" fill="white" />
          <rect x="50" y="50" width="10" height="10" />
          
          <rect x="130" y="40" width="30" height="30" />
          <rect x="135" y="45" width="20" height="20" fill="white" />
          <rect x="140" y="50" width="10" height="10" />
          
          <rect x="40" y="130" width="30" height="30" />
          <rect x="45" y="135" width="20" height="20" fill="white" />
          <rect x="50" y="140" width="10" height="10" />
          
          {/* Data pattern (simplified) */}
          <rect x="85" y="40" width="5" height="5" />
          <rect x="95" y="40" width="5" height="5" />
          <rect x="105" y="40" width="5" height="5" />
          <rect x="115" y="40" width="5" height="5" />
          
          <rect x="40" y="85" width="5" height="5" />
          <rect x="50" y="85" width="5" height="5" />
          <rect x="60" y="85" width="5" height="5" />
          <rect x="70" y="95" width="5" height="5" />
          <rect x="80" y="105" width="5" height="5" />
          <rect x="90" y="115" width="5" height="5" />
          <rect x="100" y="105" width="5" height="5" />
          <rect x="110" y="95" width="5" height="5" />
          <rect x="120" y="85" width="5" height="5" />
          <rect x="130" y="85" width="5" height="5" />
          <rect x="140" y="85" width="5" height="5" />
          <rect x="150" y="85" width="5" height="5" />
          
          <rect x="85" y="150" width="5" height="5" />
          <rect x="95" y="150" width="5" height="5" />
          <rect x="105" y="150" width="5" height="5" />
          <rect x="115" y="150" width="5" height="5" />
        </g>
      </svg>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking QR Code</DialogTitle>
        </DialogHeader>
        {selectedSlot && (
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              {generateQRCode()}
            </div>
            <p className="text-sm text-center mt-4">
              Scan this QR code to book a slot for "{selectedSlot.name}"
            </p>
            <div className="mt-4 w-full">
              <label className="text-sm font-medium">Booking Link:</label>
              <div className="flex mt-1">
                <Input 
                  readOnly 
                  value={`${window.location.origin}/book/${selectedSlot.bookingLink}`}
                  className="rounded-r-none"
                />
                <Button 
                  className="rounded-l-none" 
                  onClick={copyBookingLink}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          </div>
        )}
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button variant="outline" className="sm:w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
