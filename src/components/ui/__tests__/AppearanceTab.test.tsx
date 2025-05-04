
import { render, screen, fireEvent } from '@testing-library/react';
import AppearanceTab from '../../settings/AppearanceTab';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock the Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn()
  }
}));

// Mock the AnimationPreview component
vi.mock('@/components/theme/AnimationPreview', () => ({
  default: ({ type, active }) => (
    <div data-testid={`animation-preview-${type}`} data-active={active.toString()} />
  )
}));

describe('AppearanceTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  test('renders all theme options', () => {
    render(
      <ThemeProvider>
        <AppearanceTab />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Light Purple')).toBeInTheDocument();
    expect(screen.getByText('Light Blue')).toBeInTheDocument();
    expect(screen.getByText('Dark Purple')).toBeInTheDocument();
    expect(screen.getByText('Dark Charcoal')).toBeInTheDocument();
  });
  
  test('toggle animation switch works', () => {
    render(
      <ThemeProvider>
        <AppearanceTab />
      </ThemeProvider>
    );
    
    // Animation should start disabled
    expect(screen.getByText('Disabled')).toBeInTheDocument();
    
    // Click the toggle
    fireEvent.click(screen.getByTestId('toggle-animation'));
    
    // Save settings to apply changes
    fireEvent.click(screen.getByTestId('save-settings'));
    
    // Animation should now be enabled
    expect(screen.getByText('Enabled')).toBeInTheDocument();
  });
  
  test('selects different animation styles', () => {
    render(
      <ThemeProvider defaultTheme="light-purple" storageKey="test-theme">
        <AppearanceTab />
      </ThemeProvider>
    );
    
    // Enable animations
    fireEvent.click(screen.getByTestId('toggle-animation'));
    fireEvent.click(screen.getByTestId('save-settings'));
    
    // Should show animation style options
    expect(screen.getByText('Select an animation style')).toBeInTheDocument();
    
    // Select waves style
    fireEvent.click(screen.getByTestId('select-waves'));
    
    // Save settings to apply changes
    fireEvent.click(screen.getByTestId('save-settings'));
    
    // Waves preview should be active when it's selected
    const wavesPreview = screen.getByTestId('animation-preview-waves');
    expect(wavesPreview).toHaveAttribute('data-active', 'true');
  });
  
  test('apply immediately option works', () => {
    render(
      <ThemeProvider>
        <AppearanceTab />
      </ThemeProvider>
    );
    
    // Toggle "Apply immediately" checkbox
    fireEvent.click(screen.getByTestId('apply-immediately'));
    
    // Enable animations - should apply immediately without saving
    fireEvent.click(screen.getByTestId('toggle-animation'));
    
    // Animation should now be enabled without clicking save
    expect(screen.getByText('Enabled')).toBeInTheDocument();
  });
  
  test('save button is disabled when no changes are made', () => {
    render(
      <ThemeProvider>
        <AppearanceTab />
      </ThemeProvider>
    );
    
    // Save button should be disabled initially
    const saveButton = screen.getByTestId('save-settings');
    expect(saveButton).toBeDisabled();
    
    // Make a change
    fireEvent.click(screen.getByTestId('toggle-animation'));
    
    // Save button should be enabled
    expect(saveButton).not.toBeDisabled();
    
    // Save changes
    fireEvent.click(saveButton);
    
    // Save button should be disabled again
    expect(saveButton).toBeDisabled();
  });
});
