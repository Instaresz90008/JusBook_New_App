
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SlotSummaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: string;
  timeRange: string;
  duration: string;
  serviceCost: number;
  selectedDays?: number;
  totalSlots: number;
  hideWeekSelection?: boolean;
  sharableLink: string;
}

const SlotSummaryDialog = ({
  open,
  onOpenChange,
  service,
  timeRange,
  duration,
  serviceCost,
  selectedDays,
  totalSlots,
  hideWeekSelection = false,
  sharableLink
}: SlotSummaryProps) => {
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://jusbook.com/${sharableLink}`);
    toast({ description: "Link copied to clipboard" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Slots Created Successfully</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p><strong>Service:</strong> {service}</p>
            {!hideWeekSelection && selectedDays !== undefined && (
              <p><strong>Days Selected:</strong> {selectedDays}</p>
            )}
            <p><strong>Time Range:</strong> {hideWeekSelection ? "All day" : timeRange}</p>
            <p><strong>Duration:</strong> {duration}</p>
            {!hideWeekSelection && totalSlots !== undefined && (
              <p><strong>Total Slots Created:</strong> {totalSlots}</p>
            )}
            <p><strong>Cost Factor:</strong> {serviceCost}x</p>
            
            <div className="mt-4 pt-2 border-t">
              <p className="text-sm text-gray-500 mb-2">Shareable Link</p>
              <div className="flex items-center gap-2">
                <code className="bg-slate-100 p-2 rounded text-xs flex-1 overflow-auto">
                  https://jusbook.com/{sharableLink}
                </code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleCopyLink}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlotSummaryDialog;
