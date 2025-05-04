
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface SummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: string;
  date?: Date;
  selectedDates?: string[];
  startTime: string;
  endTime: string;
  duration: string;
  showWeekSelection: boolean;
}

const SummaryDialog = ({
  open,
  onOpenChange,
  service,
  date,
  selectedDates = [],
  startTime,
  endTime,
  duration,
  showWeekSelection
}: SummaryDialogProps) => {
  const { toast } = useToast();
  const sharableLink = `book-${service.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 8)}`;
  
  const copyToClipboard = () => {
    const link = `https://jusbook.com/${sharableLink}`;
    navigator.clipboard.writeText(link);
    toast({ description: "Link copied to clipboard" });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Availability Saved</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p><strong>Service:</strong> {service}</p>
            
            {!showWeekSelection && date && (
              <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
            )}
            
            {showWeekSelection && selectedDates.length > 0 && (
              <div>
                <p><strong>Selected Days:</strong> {selectedDates.length} days</p>
                {selectedDates.length <= 5 && (
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    {selectedDates.map((day, i) => (
                      <li key={i}>{format(new Date(day), "EEEE, MMM d")}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            
            <p><strong>Time Range:</strong> {startTime} - {endTime}</p>
            <p><strong>Duration:</strong> {duration}</p>
            
            <div className="mt-4 pt-2 border-t">
              <p className="text-sm text-gray-500 mb-2">Shareable Link</p>
              <div className="flex items-center gap-2">
                <code className="bg-slate-100 p-2 rounded text-xs flex-1 overflow-auto">
                  https://jusbook.com/{sharableLink}
                </code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={copyToClipboard}
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

export default SummaryDialog;
