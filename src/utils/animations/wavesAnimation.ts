
/**
 * Utility functions for waves animation
 */

export interface WaveProps {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  opacity: number;
}

export const initWavesAnimation = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  animationFrameIdRef: React.MutableRefObject<number | undefined>,
  isVoiceAssistantPage: boolean = false
) => {
  const width = canvas.width;
  const height = canvas.height;
  
  // Create waves
  const waves: WaveProps[] = [];
  
  for (let i = 0; i < 3; i++) {
    waves.push({
      amplitude: Math.random() * 15 + 5,
      frequency: Math.random() * 0.005 + 0.003,
      speed: Math.random() * 0.2 + 0.05,
      offset: Math.random() * width,
      opacity: Math.random() * 0.03 + 0.02
    });
  }
  
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    
    waves.forEach(wave => {
      ctx.beginPath();
      
      // Optimize by drawing fewer points on wider screens
      const step = width > 1000 ? 8 : 4;
      
      for (let x = 0; x < width; x += step) {
        const y = height / 2 + Math.sin((x + wave.offset) * wave.frequency) * wave.amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      // Use theme-aware color
      const isDarkTheme = document.documentElement.classList.contains('dark-purple') || 
                         document.documentElement.classList.contains('dark-charcoal');
      const waveColor = isDarkTheme ? 'rgba(200, 200, 255,' : 'rgba(100, 100, 200,';
      
      ctx.strokeStyle = `${waveColor} ${wave.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Move wave
      wave.offset += wave.speed;
    });
    
    animationFrameIdRef.current = requestAnimationFrame(draw);
  };
  
  animationFrameIdRef.current = requestAnimationFrame(draw);
};
