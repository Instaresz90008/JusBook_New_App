
/**
 * Utility functions for enhanced voice animation with soothing wave effect
 */

export interface VoiceWaveProps {
  radius: number;
  baseRadius: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
  points: number;
  color: string;
  opacity: number;
}

export interface VoiceParticleProps {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  centerX: number;
  centerY: number;
  opacity: number;
  color: string;
}

export const initEnhancedVoiceAnimation = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  animationFrameIdRef: React.MutableRefObject<number | undefined>
) => {
  const width = canvas.width;
  const height = canvas.height;
  
  // Create center area
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(width, height) * 0.2;
  
  // Generate color based on theme
  const isDarkTheme = document.documentElement.classList.contains('dark-purple') || 
                    document.documentElement.classList.contains('dark-charcoal');
  
  // Soothing color palettes with better contrast and vibrancy
  const darkColors = [
    'rgba(170, 155, 245, opacity)',  // Soft purple
    'rgba(140, 130, 255, opacity)',  // Medium purple
    'rgba(160, 140, 240, opacity)',  // Lavender
    'rgba(190, 180, 250, opacity)'   // Light purple
  ];
  
  const lightColors = [
    'rgba(120, 100, 215, opacity)',  // Deep blue-purple
    'rgba(130, 110, 225, opacity)',  // Mid purple
    'rgba(150, 130, 235, opacity)',  // Bright purple
    'rgba(110, 90, 195, opacity)'    // Dark purple
  ];
  
  const colorPalette = isDarkTheme ? darkColors : lightColors;
  
  // Create circular waves with soothing properties
  const waves: VoiceWaveProps[] = [];
  
  // Create fewer waves with gentler characteristics
  for (let i = 0; i < 3; i++) {
    const colorTemplate = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    waves.push({
      radius: baseRadius * (0.8 + i * 0.2),
      baseRadius: baseRadius * (0.8 + i * 0.2),
      speed: 0.005 + Math.random() * 0.005, // Slower speed for soothing effect
      amplitude: 4 + Math.random() * 6,     // Lower amplitude for gentler waves
      frequency: 0.05 + Math.random() * 0.05, // Lower frequency for wider waves
      phase: Math.random() * Math.PI * 2,
      points: 120 + i * 20,                 // More points for smoother circles
      color: colorTemplate,
      opacity: 0.15 - i * 0.02              // Lower opacity for softer look
    });
  }
  
  // Add floating particles around the circles - fewer for less distraction
  const particles: VoiceParticleProps[] = [];
  
  const particleCount = Math.min(25, Math.floor((width * height) / 60000)); // Fewer particles
  
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const orbitRadius = baseRadius * (1.2 + Math.random() * 0.8);
    const colorTemplate = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    
    particles.push({
      x: centerX + Math.cos(angle) * orbitRadius,
      y: centerY + Math.sin(angle) * orbitRadius,
      size: Math.random() * 2 + 1,  // Smaller particles
      speed: Math.random() * 0.3 + 0.1, // Slower speed
      angle: angle,
      orbitRadius: orbitRadius,
      orbitSpeed: (Math.random() * 0.001 + 0.0005) * (Math.random() > 0.5 ? 1 : -1), // Much slower orbit
      centerX: centerX + (Math.random() * 60 - 30), // Less deviation from center
      centerY: centerY + (Math.random() * 60 - 30),
      opacity: Math.random() * 0.3 + 0.1, // Lower opacity
      color: colorTemplate
    });
  }
  
  // Time counter for animations
  let time = 0;
  
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    time += 0.005; // Slower time increment for more soothing animations
    
    // Draw particles
    particles.forEach(particle => {
      // Update particle position - circular/orbital motion
      particle.angle += particle.orbitSpeed;
      particle.x = particle.centerX + Math.cos(particle.angle) * particle.orbitRadius;
      particle.y = particle.centerY + Math.sin(particle.angle) * particle.orbitRadius;
      
      // Draw particle with subtle glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace('opacity', particle.opacity.toString());
      ctx.fill();
      
      // Add gentle glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 4
      );
      gradient.addColorStop(0, particle.color.replace('opacity', (particle.opacity * 0.6).toString()));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    // Draw circular audio waves
    waves.forEach(wave => {
      wave.phase += wave.speed;
      
      // Calculate points along the circle with wave effect
      const points: {x: number, y: number}[] = [];
      
      for (let i = 0; i < wave.points; i++) {
        const angle = (Math.PI * 2 * i) / wave.points;
        
        // Calculate wave distortion - smoother sine wave
        const waveDistortion = Math.sin(angle * wave.frequency * 4 + wave.phase) * wave.amplitude;
        
        // Calculate actual radius with wave effect
        const radius = wave.radius + waveDistortion;
        
        // Calculate point position
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        points.push({x, y});
      }
      
      // Draw the wave as a closed path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      // Use bezier curves for smoother rendering
      for (let i = 0; i < points.length; i++) {
        const current = points[i];
        const next = points[(i + 1) % points.length];
        const nextNext = points[(i + 2) % points.length];
        
        // Control points for bezier curve
        const cp1x = (current.x + next.x) / 2;
        const cp1y = (current.y + next.y) / 2;
        const cp2x = (next.x + nextNext.x) / 2;
        const cp2y = (next.y + nextNext.y) / 2;
        
        ctx.quadraticCurveTo(next.x, next.y, cp2x, cp2y);
        i++; // Skip one point since we're using it as a control point
      }
      
      ctx.closePath();
      ctx.strokeStyle = wave.color.replace('opacity', wave.opacity.toString());
      ctx.lineWidth = 1.5; // Thinner lines for subtle look
      ctx.stroke();
      
      // Add subtle fill
      ctx.fillStyle = wave.color.replace('opacity', (wave.opacity * 0.08).toString());
      ctx.fill();
      
      // Add gentle pulsing effect to base radius
      wave.radius = wave.baseRadius + Math.sin(time * 0.5) * 3; // Gentler pulsing
    });
    
    // Add central glow - softer and more spread out
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, baseRadius * 1.5
    );
    
    const glowColor = isDarkTheme ? 
      'rgba(170, 155, 245,' : 
      'rgba(130, 110, 245,';
      
    gradient.addColorStop(0, glowColor + ' 0.07)');
    gradient.addColorStop(0.6, glowColor + ' 0.02)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    animationFrameIdRef.current = requestAnimationFrame(draw);
  };
  
  animationFrameIdRef.current = requestAnimationFrame(draw);
};
