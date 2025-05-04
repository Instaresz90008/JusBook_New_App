
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from '../Layout';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock the BackgroundAnimation component
vi.mock('@/components/theme/BackgroundAnimation', () => ({
  default: () => <div data-testid="mock-background-animation" />
}));

// Mock Sidebar component
vi.mock('../Sidebar', () => ({
  default: ({ collapsed }) => (
    <div data-testid="mock-sidebar" data-collapsed={collapsed.toString()} />
  )
}));

// Mock Header component
vi.mock('../Header', () => ({
  default: ({ children, title }) => (
    <header data-testid="mock-header" data-title={title}>
      {children}
    </header>
  )
}));

// Test Layout component
describe('Layout', () => {
  test('renders layout with title', () => {
    render(
      <ThemeProvider>
        <Layout title="Test Title">
          <div>Content</div>
        </Layout>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('mock-header')).toHaveAttribute('data-title', 'Test Title');
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
  
  test('toggles sidebar when button is clicked', () => {
    render(
      <ThemeProvider>
        <Layout title="Test Title">
          <div>Content</div>
        </Layout>
      </ThemeProvider>
    );
    
    // Sidebar should start as not collapsed
    expect(screen.getByTestId('mock-sidebar')).toHaveAttribute('data-collapsed', 'false');
    
    // Click the toggle button
    fireEvent.click(screen.getByTestId('toggle-sidebar'));
    
    // Sidebar should now be collapsed
    expect(screen.getByTestId('mock-sidebar')).toHaveAttribute('data-collapsed', 'true');
    
    // Click again to expand
    fireEvent.click(screen.getByTestId('toggle-sidebar'));
    
    // Sidebar should be expanded again
    expect(screen.getByTestId('mock-sidebar')).toHaveAttribute('data-collapsed', 'false');
  });
  
  test('includes background animation component', () => {
    render(
      <ThemeProvider>
        <Layout title="Test Title">
          <div>Content</div>
        </Layout>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('mock-background-animation')).toBeInTheDocument();
  });
});
