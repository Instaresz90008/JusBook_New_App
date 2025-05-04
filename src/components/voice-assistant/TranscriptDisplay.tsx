
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TranscriptDisplayProps {
  transcript: string;
  animationEnabled: boolean;
}

const TranscriptDisplay = ({ transcript, animationEnabled }: TranscriptDisplayProps) => {
  if (!transcript) return null;
  
  return (
    <div className="mb-6 p-4 bg-muted/50 backdrop-blur-md rounded-lg border border-border/30">
      <div className="flex items-center gap-2 mb-2">
        <Volume2 className="h-4 w-4 text-primary/70" />
        <h2 className="font-medium text-sm text-muted-foreground">You said:</h2>
      </div>
      <p className="text-foreground pl-6 font-medium">{transcript}</p>
    </div>
  );
};

export default TranscriptDisplay;
