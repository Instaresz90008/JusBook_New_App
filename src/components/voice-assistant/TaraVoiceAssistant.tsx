
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useVoiceService } from "@/hooks/useVoiceService";
import { useAuth } from "@/hooks/useAuth";

// Import components
import MicButton from "./MicButton";
import AudioVisualizer from "./AudioVisualizer";
import ConfidenceIndicator from "./ConfidenceIndicator";
import TranscriptDisplay from "./TranscriptDisplay";
import ResponseDisplay from "./ResponseDisplay";
import ListeningStatus from "./ListeningStatus";
import TaraHeader from "./TaraHeader";

const TaraVoiceAssistant = () => {
  // Use the speech recognition hook
  const { 
    isListening, 
    transcript, 
    confidence, 
    startListening, 
    stopListening 
  } = useSpeechRecognition();
  
  // State
  const [responseAnimating, setResponseAnimating] = useState(false);
  
  // Hooks
  const { toast } = useToast();
  const { animationEnabled } = useTheme();
  const { user } = useAuth();
  const { 
    isProcessing, 
    currentConversation,
    processVoiceQuery 
  } = useVoiceService();

  // Effect to handle transcript changes
  useEffect(() => {
    if (!isListening && transcript && !isProcessing) {
      processCommand(transcript);
    }
  }, [isListening, transcript, isProcessing]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const processCommand = async (command: string) => {
    // Show animation first
    setResponseAnimating(true);
    
    // Process the command using our API
    await processVoiceQuery(command);
    
    // Toast after response is shown
    toast({
      title: "Command Processed",
      description: "Your voice command has been recognized."
    });
  };

  return (
    <div className="bg-card/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-border">
      <div className="flex flex-col items-center mb-8 relative z-10">
        {/* Title header */}
        <TaraHeader animationEnabled={animationEnabled} />
        
        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          Click the microphone button and speak your command. I'll try to understand and assist you.
        </p>
        
        {/* Mic button */}
        <MicButton 
          isListening={isListening}
          onToggle={toggleListening}
        />
        
        {/* Audio visualizer */}
        <AudioVisualizer 
          visualizeAudio={true}
          isListening={isListening}
          hasTranscript={!!transcript}
        />
        
        {/* Confidence indicator */}
        <ConfidenceIndicator 
          isListening={isListening}
          confidence={confidence}
        />
        
        {/* Listening status text */}
        <ListeningStatus 
          isListening={isListening}
          animationEnabled={animationEnabled}
        />
      </div>

      {/* Transcript display */}
      <TranscriptDisplay 
        transcript={transcript}
        animationEnabled={animationEnabled}
      />

      {/* Response display */}
      <ResponseDisplay 
        response={currentConversation?.response || ""}
        processingResponse={isProcessing}
        responseAnimating={responseAnimating}
        animationEnabled={animationEnabled}
      />
    </div>
  );
};

export default TaraVoiceAssistant;
