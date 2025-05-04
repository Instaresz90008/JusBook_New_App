
import { useTheme } from "@/components/theme/ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { initParticlesAnimation } from "@/utils/animations/particlesAnimation";
import { initWavesAnimation } from "@/utils/animations/wavesAnimation";
import { initEnhancedVoiceAnimation } from "@/utils/animations/voiceAnimation";

const BackgroundAnimation = () => {
  const { animationEnabled, animationStyle } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const animationFrameIdRef = useRef<number>();
  const location = useLocation();
  const isVoiceAssistantPage = location.pathname === "/voice-assistant";
  
  // Main animation effect
  useEffect(() => {
    // Clean up function to cancel animation frame
    const cleanup = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = undefined;
      }
      setIsInitialized(false);
    };
    
    // If animation is disabled or no canvas, clean up and return
    if (!animationEnabled || !canvasRef.current) {
      cleanup();
      return cleanup;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return cleanup;
    
    // Set canvas dimensions
    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Handle resize events
    const handleResize = () => {
      updateDimensions();
      // Reinitialize animation with new dimensions
      cleanup();
      initAnimation();
    };
    
    window.addEventListener('resize', handleResize);
    updateDimensions();
    
    // Initialize animations based on style and current page
    const initAnimation = () => {
      setIsInitialized(true);
      
      if (isVoiceAssistantPage) {
        // Enhanced animation for voice assistant page
        initEnhancedVoiceAnimation(canvas, ctx, animationFrameIdRef);
      } else if (animationStyle === "particles") {
        initParticlesAnimation(canvas, ctx, animationFrameIdRef);
      } else if (animationStyle === "waves") {
        initWavesAnimation(canvas, ctx, animationFrameIdRef);
      }
    };
    
    initAnimation();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cleanup();
    };
  }, [animationEnabled, animationStyle, isVoiceAssistantPage]);
  
  // If animations are disabled, don't render the canvas
  if (!animationEnabled) {
    return null;
  }
  
  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-1000",
        isInitialized ? 'opacity-100' : 'opacity-0',
        isVoiceAssistantPage ? 'bg-gradient-to-b from-background/50 to-background' : ''
      )}
      aria-hidden="true"
      data-testid="background-animation-canvas"
    />
  );
};

export default BackgroundAnimation;
