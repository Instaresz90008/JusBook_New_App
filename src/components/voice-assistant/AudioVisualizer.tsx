
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AudioWaveform } from "lucide-react";

interface AudioVisualizerProps {
  visualizeAudio: boolean;
  isListening: boolean;
  hasTranscript: boolean;
}

const AudioVisualizer = ({ visualizeAudio, isListening, hasTranscript }: AudioVisualizerProps) => {
  const waveContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!waveContainerRef.current) return;
    
    const container = waveContainerRef.current;
    
    // Clear previous waves
    container.innerHTML = '';
    
    if (!visualizeAudio) return;
    
    // Create sound wave bars
    const barCount = 24;
    const bars: HTMLDivElement[] = [];
    
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = cn(
        'bg-primary/60 rounded-full w-1',
        isListening ? 'transition-all duration-200 ease-in-out' : ''
      );
      
      // Set initial heights in wave pattern
      const height = isListening ? 
        5 + Math.sin(i * 0.4) * 15 : 
        2 + Math.sin(i * 0.5) * 8; // Smaller wave when not listening
      
      bar.style.height = `${height}px`;
      container.appendChild(bar);
      bars.push(bar);
    }
    
    // Wave animation
    let frame = 0;
    const animate = () => {
      frame += 0.1;
      
      bars.forEach((bar, i) => {
        // Dynamic wave effect
        const height = isListening ?
          // More active wave when listening
          5 + Math.sin(frame + i * 0.4) * 15 :
          // Gentle wave when idle showing "ready to service"
          2 + Math.sin(frame + i * 0.5) * 8;
          
        bar.style.height = `${height}px`;
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [visualizeAudio, isListening]);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="flex items-center justify-center mb-2">
        <AudioWaveform className="w-4 h-4 text-primary/70 mr-2" />
        <p className="text-sm text-primary/70">
          {isListening ? "Listening to your voice..." : "Ready to assist you"}
        </p>
      </div>
      
      <div 
        ref={waveContainerRef}
        className="flex items-end justify-center gap-[2px] h-16 w-64 mb-3"
      />
    </div>
  );
};

export default AudioVisualizer;
