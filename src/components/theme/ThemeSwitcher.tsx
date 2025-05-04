
import { Moon, Sun, Palette, Check } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { theme, setTheme, animationEnabled, toggleAnimation } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0" data-testid="theme-switcher-button">
          <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Light</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light-purple")} className="flex items-center gap-2" data-testid="theme-light-purple-option">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-primary border border-border"></div>
            <span>Purple</span>
          </div>
          {theme === "light-purple" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light-blue")} className="flex items-center gap-2" data-testid="theme-light-blue-option">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-400 border border-border"></div>
            <span>Blue</span>
          </div>
          {theme === "light-blue" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Dark</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("dark-purple")} className="flex items-center gap-2" data-testid="theme-dark-purple-option">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#006C5B] border border-[#F9B517]/30"></div>
            <span>Teal</span>
          </div>
          {theme === "dark-purple" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark-charcoal")} className="flex items-center gap-2" data-testid="theme-dark-charcoal-option">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#004C40] border border-[#F9B517]/30"></div>
            <span>Dark Teal</span>
          </div>
          {theme === "dark-charcoal" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={toggleAnimation}
          className="flex items-center justify-between"
          data-testid="toggle-animation-option"
        >
          <span>Visual Effects</span>
          <span className={`px-1.5 py-0.5 text-xs rounded ${animationEnabled ? 'bg-primary/20' : 'bg-muted'}`}>
            {animationEnabled ? 'ON' : 'OFF'}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
