
import { MessageSquare, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResponseDisplayProps {
  response: string;
  processingResponse: boolean;
  responseAnimating: boolean;
  animationEnabled: boolean;
}

const ResponseDisplay = ({ 
  response, 
  processingResponse, 
  responseAnimating, 
  animationEnabled 
}: ResponseDisplayProps) => {
  if (!response && !processingResponse) return null;

  return (
    <div className="p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20">
      <div className="flex items-start gap-2 mb-2">
        <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
        <h2 className="font-medium text-sm text-muted-foreground">
          {processingResponse ? "Tara is thinking..." : "Tara Response:"}
        </h2>
      </div>
      
      {processingResponse ? (
        <div className="pl-7 flex items-center gap-2">
          <Loader className="h-4 w-4 animate-spin text-primary" />
          <p className="text-muted-foreground">Processing your request...</p>
        </div>
      ) : (
        <p className="text-foreground pl-7 leading-relaxed">{response}</p>
      )}
    </div>
  );
};

export default ResponseDisplay;
