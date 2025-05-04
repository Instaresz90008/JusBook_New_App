
import { render, screen } from '@testing-library/react';
import BackgroundAnimation from '../BackgroundAnimation';
import { ThemeProvider } from '../ThemeProvider';
import { vi, beforeEach, describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

// Mock CanvasRenderingContext2D
const mockCanvasContext = {
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  closePath: vi.fn(),
  quadraticCurveTo: vi.fn(),
  createRadialGradient: vi.fn(() => ({
    addColorStop: vi.fn()
  }))
};

// Mock HTMLCanvasElement getContext
const getContextMock = vi.fn().mockImplementation(() => mockCanvasContext);
HTMLCanvasElement.prototype.getContext = getContextMock;

// Mock window.requestAnimationFrame
const requestAnimationFrameMock = vi.fn().mockImplementation((cb) => {
  const timeoutId = setTimeout(cb, 0);
  return timeoutId as unknown as number;
});
window.requestAnimationFrame = requestAnimationFrameMock;

// Mock window.cancelAnimationFrame
window.cancelAnimationFrame = vi.fn();

// Mock animations utilities
vi.mock('@/utils/animations/particlesAnimation', () => ({
  initParticlesAnimation: vi.fn()
}));

vi.mock('@/utils/animations/wavesAnimation', () => ({
  initWavesAnimation: vi.fn()
}));

vi.mock('@/utils/animations/voiceAnimation', () => ({
  initEnhancedVoiceAnimation: vi.fn()
}));

describe('BackgroundAnimation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    Object.defineProperty(document.documentElement, 'classList', {
      value: {
        contains: vi.fn().mockReturnValue(false)
      }
    });
  });
  
  test('renders BackgroundAnimation component correctly', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <BackgroundAnimation />
        </ThemeProvider>
      </BrowserRouter>
    );
    
    // Canvas should be in the document when animation is enabled
    expect(screen.getByTestId('background-animation-canvas')).toBeInTheDocument();
  });
  
  test('doesn\'t render when animations are disabled', () => {
    // Mock ThemeProvider with animations disabled
    vi.mock('@/components/theme/ThemeProvider', () => ({
      useTheme: () => ({ animationEnabled: false, animationStyle: 'particles' })
    }));
    
    render(
      <BrowserRouter>
        <BackgroundAnimation />
      </BrowserRouter>
    );
    
    // Canvas should not be in the document when animation is disabled
    expect(screen.queryByTestId('background-animation-canvas')).not.toBeInTheDocument();
  });
});
