
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Setup global mocks that might be needed across test files
window.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(() => true),
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => null,
    setItem: vi.fn(),
    clear: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true
});
