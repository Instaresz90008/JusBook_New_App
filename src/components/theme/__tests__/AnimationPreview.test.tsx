
import { render, screen, fireEvent } from '@testing-library/react';
import AnimationPreview from '../AnimationPreview';
import { ThemeProvider } from '../ThemeProvider';
import { act } from 'react-dom/test-utils';
import { describe, test, expect, vi, beforeEach } from 'vitest';

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
  lineWidth: 1
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

describe('AnimationPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders particles preview when active', async () => {
    render(
      <ThemeProvider>
        <AnimationPreview type="particles" active={true} />
      </ThemeProvider>
    );
    
    const canvas = screen.getByTestId('preview-particles');
    expect(canvas).toBeInTheDocument();
    
    // Allow animation frames to process
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });
    
    // Should have called beginPath and arc for particles
    expect(mockCanvasContext.beginPath).toHaveBeenCalled();
    expect(mockCanvasContext.arc).toHaveBeenCalled();
  });
  
  test('renders waves preview when active', async () => {
    render(
      <ThemeProvider>
        <AnimationPreview type="waves" active={true} />
      </ThemeProvider>
    );
    
    const canvas = screen.getByTestId('preview-waves');
    expect(canvas).toBeInTheDocument();
    
    // Allow animation frames to process
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });
    
    // Should have called beginPath and lineTo for waves
    expect(mockCanvasContext.beginPath).toHaveBeenCalled();
    expect(mockCanvasContext.lineTo).toHaveBeenCalled();
  });
  
  test('does not animate when not active', async () => {
    render(
      <ThemeProvider>
        <AnimationPreview type="particles" active={false} />
      </ThemeProvider>
    );
    
    const canvas = screen.getByTestId('preview-particles');
    expect(canvas).toBeInTheDocument();
    
    // Allow time for potential animation frames
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });
    
    // Should not have called drawing methods
    expect(mockCanvasContext.beginPath).not.toHaveBeenCalled();
    expect(mockCanvasContext.arc).not.toHaveBeenCalled();
  });
  
  test('shows type label in the preview', () => {
    render(
      <ThemeProvider>
        <AnimationPreview type="particles" active={true} />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Particles')).toBeInTheDocument();
  });
  
  test('shows hover state with "Click to select" message', () => {
    render(
      <ThemeProvider>
        <AnimationPreview type="particles" active={true} />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Click to select')).toBeInTheDocument();
  });
});
