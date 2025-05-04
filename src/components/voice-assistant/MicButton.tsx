
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface MicButtonProps {
  isListening: boolean;
  onToggle: () => void;
}

const MicButton = ({ isListening, onToggle }: MicButtonProps) => {
  return (
    <Button
      onClick={onToggle}
      size="lg"
      className={cn(
        "rounded-full w-24 h-24 transition-colors duration-300 shadow-md",
        isListening ? 'bg-red-500/90 hover:bg-red-600/90' : 'bg-primary hover:bg-primary/90',
      )}
    >
      {isListening ? (
        <MicOff className="h-10 w-10" />
      ) : (
        <Mic className="h-10 w-10" />
      )}
    </Button>
  );
};

export default MicButton;
