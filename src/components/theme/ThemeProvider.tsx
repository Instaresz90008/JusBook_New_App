
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light-purple" | "light-blue" | "dark-purple" | "dark-charcoal";
type AnimationStyle = "particles" | "waves" | "none";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  animationEnabled: boolean;
  toggleAnimation: () => void;
  animationStyle: AnimationStyle;
  setAnimationStyle: (style: AnimationStyle) => void;
  saveAppearanceSettings: () => void;
  settingsChanged: boolean;
  applyImmediately: boolean;
  setApplyImmediately: (value: boolean) => void;
}

const initialState: ThemeProviderState = {
  theme: "light-purple",
  setTheme: () => null,
  animationEnabled: false,
  toggleAnimation: () => null,
  animationStyle: "particles",
  setAnimationStyle: () => null,
  saveAppearanceSettings: () => null,
  settingsChanged: false,
  applyImmediately: false,
  setApplyImmediately: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light-purple",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // Get stored values or use defaults
  const [theme, setThemeValue] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(
    () => localStorage.getItem("ui-animation-enabled") === "true"
  );

  const [animationStyle, setAnimationStyleValue] = useState<AnimationStyle>(
    () => {
      const storedStyle = localStorage.getItem("ui-animation-style");
      return (storedStyle === "particles" || storedStyle === "waves") ? storedStyle : "particles";
    }
  );

  // Track if settings are changed but not saved
  const [settingsChanged, setSettingsChanged] = useState(false);
  
  // Values to be saved
  const [pendingTheme, setPendingTheme] = useState<Theme>(theme);
  const [pendingAnimationEnabled, setPendingAnimationEnabled] = useState<boolean>(animationEnabled);
  const [pendingAnimationStyle, setPendingAnimationStyle] = useState<AnimationStyle>(animationStyle);
  
  // Option to apply changes immediately (without saving)
  const [applyImmediately, setApplyImmediately] = useState<boolean>(
    () => localStorage.getItem("ui-apply-immediately") === "true"
  );

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("light-purple", "light-blue", "dark-purple", "dark-charcoal");
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);
  
  // Store animation preference
  useEffect(() => {
    localStorage.setItem("ui-animation-enabled", String(animationEnabled));
  }, [animationEnabled]);

  // Store animation style
  useEffect(() => {
    localStorage.setItem("ui-animation-style", animationStyle);
  }, [animationStyle]);

  // Store apply immediately preference
  useEffect(() => {
    localStorage.setItem("ui-apply-immediately", String(applyImmediately));
  }, [applyImmediately]);

  // When the settings change and applyImmediately is true, apply them
  useEffect(() => {
    if (applyImmediately && settingsChanged) {
      setThemeValue(pendingTheme);
      setAnimationEnabled(pendingAnimationEnabled);
      setAnimationStyleValue(pendingAnimationStyle);
      setSettingsChanged(false);
    }
  }, [pendingTheme, pendingAnimationEnabled, pendingAnimationStyle, applyImmediately, settingsChanged]);

  const setTheme = (newTheme: Theme) => {
    setPendingTheme(newTheme);
    setSettingsChanged(true);
    
    if (applyImmediately) {
      setThemeValue(newTheme);
    }
  };

  const toggleAnimation = () => {
    const newValue = !pendingAnimationEnabled;
    setPendingAnimationEnabled(newValue);
    setSettingsChanged(true);
    
    if (applyImmediately) {
      setAnimationEnabled(newValue);
    }
  };

  const setAnimationStyle = (style: AnimationStyle) => {
    setPendingAnimationStyle(style);
    setSettingsChanged(true);
    
    if (applyImmediately) {
      setAnimationStyleValue(style);
    }
  };

  const saveAppearanceSettings = () => {
    setThemeValue(pendingTheme);
    setAnimationEnabled(pendingAnimationEnabled);
    setAnimationStyleValue(pendingAnimationStyle);
    setSettingsChanged(false);
  };

  const value = {
    theme,
    setTheme,
    animationEnabled,
    toggleAnimation,
    animationStyle,
    setAnimationStyle,
    saveAppearanceSettings,
    settingsChanged,
    applyImmediately,
    setApplyImmediately,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
