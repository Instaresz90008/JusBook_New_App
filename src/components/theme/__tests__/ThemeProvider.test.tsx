
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeProvider';
import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock component to test the theme hook
const TestComponent = () => {
  const { 
    theme, 
    setTheme, 
    animationEnabled, 
    toggleAnimation, 
    animationStyle, 
    setAnimationStyle,
    saveAppearanceSettings,
    settingsChanged,
    applyImmediately,
    setApplyImmediately
  } = useTheme();
  
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <div data-testid="animation-enabled">{animationEnabled ? "true" : "false"}</div>
      <div data-testid="animation-style">{animationStyle}</div>
      <div data-testid="settings-changed">{settingsChanged ? "true" : "false"}</div>
      <div data-testid="apply-immediately">{applyImmediately ? "true" : "false"}</div>
      
      <button data-testid="set-theme-button" onClick={() => setTheme('dark-purple')}>Set Theme</button>
      <button data-testid="toggle-animation-button" onClick={toggleAnimation}>Toggle Animation</button>
      <button data-testid="set-style-button" onClick={() => setAnimationStyle('waves')}>Set Style</button>
      <button data-testid="save-settings-button" onClick={saveAppearanceSettings}>Save Settings</button>
      <button data-testid="toggle-apply-button" onClick={() => setApplyImmediately(!applyImmediately)}>Toggle Apply</button>
    </div>
  );
};

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Mock document.documentElement methods
    document.documentElement.classList.remove = vi.fn();
    document.documentElement.classList.add = vi.fn();
  });

  test('provides default theme values', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme').textContent).toBe('light-purple');
    expect(screen.getByTestId('animation-enabled').textContent).toBe('false');
    expect(screen.getByTestId('animation-style').textContent).toBe('particles');
  });
  
  test('can change theme and save settings', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Initially nothing has changed
    expect(screen.getByTestId('settings-changed').textContent).toBe('false');
    
    // Change theme
    fireEvent.click(screen.getByTestId('set-theme-button'));
    
    // Settings changed but theme not updated yet
    expect(screen.getByTestId('settings-changed').textContent).toBe('true');
    expect(screen.getByTestId('current-theme').textContent).toBe('light-purple');
    
    // Save settings
    fireEvent.click(screen.getByTestId('save-settings-button'));
    
    // Theme updated and settings no longer changed
    expect(screen.getByTestId('current-theme').textContent).toBe('dark-purple');
    expect(screen.getByTestId('settings-changed').textContent).toBe('false');
  });
  
  test('applies changes immediately when enabled', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Enable apply immediately
    fireEvent.click(screen.getByTestId('toggle-apply-button'));
    expect(screen.getByTestId('apply-immediately').textContent).toBe('true');
    
    // Change theme
    fireEvent.click(screen.getByTestId('set-theme-button'));
    
    // Theme should update immediately
    expect(screen.getByTestId('current-theme').textContent).toBe('dark-purple');
    expect(screen.getByTestId('settings-changed').textContent).toBe('true');
  });
  
  test('toggles animation state correctly', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Animation initially disabled
    expect(screen.getByTestId('animation-enabled').textContent).toBe('false');
    
    // Toggle animation with apply immediately off
    fireEvent.click(screen.getByTestId('toggle-animation-button'));
    
    // Animation still disabled until saved
    expect(screen.getByTestId('animation-enabled').textContent).toBe('false');
    expect(screen.getByTestId('settings-changed').textContent).toBe('true');
    
    // Save settings
    fireEvent.click(screen.getByTestId('save-settings-button'));
    
    // Animation now enabled
    expect(screen.getByTestId('animation-enabled').textContent).toBe('true');
  });
  
  test('changes animation style correctly', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Animation style initially 'particles'
    expect(screen.getByTestId('animation-style').textContent).toBe('particles');
    
    // Change animation style
    fireEvent.click(screen.getByTestId('set-style-button'));
    
    // Style not changed until saved
    expect(screen.getByTestId('animation-style').textContent).toBe('particles');
    
    // Save settings
    fireEvent.click(screen.getByTestId('save-settings-button'));
    
    // Style now 'waves'
    expect(screen.getByTestId('animation-style').textContent).toBe('waves');
  });
});
