
/**
 * Utility functions for particles animation
 */

export interface ParticleProps {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
}

export const initParticlesAnimation = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  animationFrameIdRef: React.MutableRefObject<number | undefined>,
  isVoiceAssistantPage: boolean = false
) => {
  const width = canvas.width;
  const height = canvas.height;
  
  // Create particles with reduced count for better performance
  const particleCount = Math.min(30, Math.floor((width * height) / 50000));
  const particles: ParticleProps[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.1 + 0.05
    });
  }
  
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      
      // Use theme-aware color
      const isDarkTheme = document.documentElement.classList.contains('dark-purple') || 
                         document.documentElement.classList.contains('dark-charcoal');
      const particleColor = isDarkTheme ? 'rgba(255, 255, 255,' : 'rgba(70, 70, 150,';
      
      ctx.fillStyle = `${particleColor} ${particle.opacity})`;
      ctx.fill();
      
      // Move upward slowly
      particle.y -= particle.speed;
      
      // Reset if off-screen
      if (particle.y < -10) {
        particle.y = height + 10;
        particle.x = Math.random() * width;
      }
    });
    
    animationFrameIdRef.current = requestAnimationFrame(draw);
  };
  
  animationFrameIdRef.current = requestAnimationFrame(draw);
};
