
import { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { initParticlesAnimation } from "@/utils/animations/particlesAnimation";
import { initWavesAnimation } from "@/utils/animations/wavesAnimation";
import { cn } from "@/lib/utils";

type AnimationPreviewProps = {
  type: "particles" | "waves";
  active: boolean;
}

const AnimationPreview = ({ type, active }: AnimationPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isRendering, setIsRendering] = useState(false);
  const animationFrameIdRef = useRef<number>();
  
  useEffect(() => {
    // Clean up function
    const cleanup = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = undefined;
      }
      setIsRendering(false);
    };
    
    // If not active or no canvas, clean up
    if (!active || !canvasRef.current) {
      cleanup();
      return cleanup;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return cleanup;
    
    setIsRendering(true);
    
    // Initialize animation based on type
    if (type === "particles") {
      initParticlesAnimation(canvas, ctx, animationFrameIdRef);
    }
    else if (type === "waves") {
      initWavesAnimation(canvas, ctx, animationFrameIdRef);
    }
    
    // Clean up on unmount or when active changes
    return cleanup;
  }, [active, type, theme]);
  
  return (
    <div className="relative overflow-hidden rounded-md aspect-video bg-background border border-border group">
      <canvas 
        ref={canvasRef} 
        width={200} 
        height={120} 
        className={cn(
          "w-full h-full transition-opacity duration-300",
          isRendering ? 'opacity-100' : 'opacity-0'
        )}
        data-testid={`preview-${type}`}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="px-3 py-1.5 bg-primary/80 text-primary-foreground rounded-full text-xs font-medium">
          Click to select
        </div>
      </div>
      <div className="absolute bottom-2 left-2 text-xs font-medium bg-background/70 px-2 py-1 rounded shadow-sm">
        {type === "particles" ? "Particles" : "Waves"}
      </div>
    </div>
  );
};

export default AnimationPreview;
