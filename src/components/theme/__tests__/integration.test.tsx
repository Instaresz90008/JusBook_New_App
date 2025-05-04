
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import AppearanceTab from '../../settings/AppearanceTab';
import Layout from '../../layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock BackgroundAnimation to detect when it's being rendered
vi.mock('../BackgroundAnimation', () => {
  return {
    default: vi.fn(({ children }) => (
      <div data-testid="mock-background-animation">
        {children}
      </div>
    ))
  };
});

// Mock other dependencies
vi.mock('@/components/layout/Sidebar', () => {
  return {
    default: vi.fn(({ collapsed }) => (
      <div data-testid="mock-sidebar">{collapsed ? 'Collapsed' : 'Expanded'}</div>
    ))
  };
});

vi.mock('@/components/layout/Header', () => {
  return {
    default: vi.fn(({ children, title }) => (
      <div data-testid="mock-header">
        <h1>{title}</h1>
        {children}
      </div>
    ))
  };
});

// Mock AnimationPreview
vi.mock('../AnimationPreview', () => {
  return {
    default: vi.fn(({ type, active }) => (
      <div data-testid={`animation-preview-${type}`} data-active={active.toString()}>
        {type} preview
      </div>
    ))
  };
});

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn()
  }
}));

// Integration tests for theme and animation functionality
describe('Theme and Animation Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Clear localStorage
    localStorage.clear();
  });
  
  test('theme changes persist across components', async () => {
    // Set up test app with ThemeProvider at the root
    const { rerender } = render(
      <ThemeProvider>
        <AppearanceTab />
      </ThemeProvider>
    );
    
    // Change theme to dark-purple
    fireEvent.click(screen.getByTestId('theme-dark-purple'));
    
    // Save settings
    fireEvent.click(screen.getByTestId('save-settings'));
    
    // Unmount and remount to simulate navigation
    rerender(
      <ThemeProvider>
        <BrowserRouter>
          <Layout title="Test Page">
            <div>Content</div>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // Layout should reflect the theme change
    const htmlElement = document.documentElement;
    expect(htmlElement.classList.contains('dark-purple')).toBe(true);
  });
  
  test('animation settings persist across components', async () => {
    // Start with AppearanceTab
    const { rerender } = render(
      <ThemeProvider>
        <AppearanceTab />
      </ThemeProvider>
    );
    
    // Enable animations
    fireEvent.click(screen.getByTestId('toggle-animation'));
    
    // Choose waves animation
    fireEvent.click(screen.getByTestId('select-waves'));
    
    // Save settings
    fireEvent.click(screen.getByTestId('save-settings'));
    
    // Unmount and remount with Layout
    rerender(
      <ThemeProvider>
        <BrowserRouter>
          <Layout title="Test Page">
            <div>Content</div>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // BackgroundAnimation should be rendered in Layout
    expect(screen.getByTestId('mock-background-animation')).toBeInTheDocument();
  });
  
  test('apply immediately option correctly updates UI without saving', async () => {
    render(
      <ThemeProvider>
        <AppearanceTab />
      </ThemeProvider>
    );
    
    // Enable "Apply immediately"
    fireEvent.click(screen.getByTestId('apply-immediately'));
    
    // Change theme - should apply without saving
    fireEvent.click(screen.getByTestId('theme-dark-purple'));
    
    // HTML element should immediately have the new theme class
    expect(document.documentElement.classList.contains('dark-purple')).toBe(true);
    
    // Toggle animations - should apply without saving
    fireEvent.click(screen.getByTestId('toggle-animation'));
    
    // Should show animation style options
    expect(screen.getByText('Select an animation style')).toBeInTheDocument();
    
    // Animation should be enabled
    expect(screen.getByText('Enabled')).toBeInTheDocument();
  });
});
