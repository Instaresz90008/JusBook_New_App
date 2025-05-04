
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import AnimationPreview from "@/components/theme/AnimationPreview";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, Save, CircleCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const AppearanceTab = () => {
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
  
  const [previewingStyle, setPreviewingStyle] = useState<string | null>(null);
  
  const handleSaveSettings = () => {
    saveAppearanceSettings();
    toast.success("Appearance settings saved successfully", {
      icon: <CircleCheck className="h-4 w-4 text-green-500" />,
    });
  };
  
  return (
    <div className="space-y-6" data-testid="appearance-tab">
      <h2 className="text-xl font-semibold">Appearance Settings</h2>
      <p className="text-gray-500 mb-6">Customize the look and feel of your dashboard</p>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Theme</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div 
                className={`h-24 rounded-lg bg-white border-2 ${theme === 'light-purple' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200`}
                onClick={() => setTheme('light-purple')}
                data-testid="theme-light-purple"
              >
                <div className="h-1/5 bg-purple-500"></div>
                <div className="h-4/5 p-2">
                  <div className="h-2 w-3/4 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <p className="text-xs text-center font-medium">Light Purple</p>
            </div>
            
            <div className="space-y-2">
              <div 
                className={`h-24 rounded-lg bg-white border-2 ${theme === 'light-blue' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200`}
                onClick={() => setTheme('light-blue')}
                data-testid="theme-light-blue"
              >
                <div className="h-1/5 bg-blue-500"></div>
                <div className="h-4/5 p-2">
                  <div className="h-2 w-3/4 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <p className="text-xs text-center font-medium">Light Blue</p>
            </div>
            
            <div className="space-y-2">
              <div 
                className={`h-24 rounded-lg bg-gray-900 border-2 ${theme === 'dark-purple' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200`}
                onClick={() => setTheme('dark-purple')}
                data-testid="theme-dark-purple"
              >
                <div className="h-1/5 bg-purple-600"></div>
                <div className="h-4/5 p-2">
                  <div className="h-2 w-3/4 bg-gray-700 rounded-full mb-2"></div>
                  <div className="h-2 w-1/2 bg-gray-700 rounded-full"></div>
                </div>
              </div>
              <p className="text-xs text-center font-medium">Dark Purple</p>
            </div>
            
            <div className="space-y-2">
              <div 
                className={`h-24 rounded-lg bg-gray-900 border-2 ${theme === 'dark-charcoal' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200`}
                onClick={() => setTheme('dark-charcoal')}
                data-testid="theme-dark-charcoal"
              >
                <div className="h-1/5 bg-gray-700"></div>
                <div className="h-4/5 p-2">
                  <div className="h-2 w-3/4 bg-gray-700 rounded-full mb-2"></div>
                  <div className="h-2 w-1/2 bg-gray-700 rounded-full"></div>
                </div>
              </div>
              <p className="text-xs text-center font-medium">Dark Charcoal</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Visual Effects</h3>
            <div className="flex items-center">
              <Switch
                checked={animationEnabled}
                onCheckedChange={toggleAnimation}
                aria-label="Toggle background animation"
                data-testid="toggle-animation"
              />
              <span className="ml-2 text-sm font-medium">
                {animationEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
          
          {animationEnabled && (
            <>
              <p className="text-sm text-muted-foreground mb-4">Select an animation style</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div 
                  className={`relative rounded-lg border-2 ${animationStyle === 'particles' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} cursor-pointer overflow-hidden transition-all duration-200`}
                  onClick={() => setAnimationStyle('particles')}
                  onMouseEnter={() => setPreviewingStyle('particles')}
                  onMouseLeave={() => setPreviewingStyle(null)}
                  data-testid="select-particles"
                >
                  <AnimationPreview 
                    type="particles" 
                    active={previewingStyle === 'particles' || (animationStyle === 'particles' && !previewingStyle)} 
                  />
                  <div className="absolute right-2 top-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 rounded-full bg-background/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewingStyle(prev => prev === 'particles' ? null : 'particles');
                      }}
                      data-testid="preview-particles-button"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Preview particles</span>
                    </Button>
                  </div>
                </div>
                
                <div 
                  className={`relative rounded-lg border-2 ${animationStyle === 'waves' ? 'border-primary ring-2 ring-primary/30' : 'border-border'} cursor-pointer overflow-hidden transition-all duration-200`}
                  onClick={() => setAnimationStyle('waves')}
                  onMouseEnter={() => setPreviewingStyle('waves')}
                  onMouseLeave={() => setPreviewingStyle(null)}
                  data-testid="select-waves"
                >
                  <AnimationPreview 
                    type="waves" 
                    active={previewingStyle === 'waves' || (animationStyle === 'waves' && !previewingStyle)} 
                  />
                  <div className="absolute right-2 top-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 rounded-full bg-background/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewingStyle(prev => prev === 'waves' ? null : 'waves');
                      }}
                      data-testid="preview-waves-button"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Preview waves</span>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Layout Options</h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Navigation Style</h4>
              <RadioGroup defaultValue="sidebar" className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sidebar" id="sidebar" />
                  <Label htmlFor="sidebar">Sidebar Navigation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="top" id="top" />
                  <Label htmlFor="top">Top Navigation</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Dashboard Layout</h4>
              <RadioGroup defaultValue="cards" className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cards" id="cards" />
                  <Label htmlFor="cards">Card View</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="list" id="list" />
                  <Label htmlFor="list">List View</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Density</h4>
              <RadioGroup defaultValue="comfortable" className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="comfortable" />
                  <Label htmlFor="comfortable">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="compact" />
                  <Label htmlFor="compact">Compact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spacious" id="spacious" />
                  <Label htmlFor="spacious">Spacious</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6 pb-4">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="apply-immediately" 
              checked={applyImmediately}
              onCheckedChange={(checked) => setApplyImmediately(checked === true)}
              data-testid="apply-immediately"
            />
            <div className="grid gap-1.5">
              <Label htmlFor="apply-immediately">
                Apply changes immediately
              </Label>
              <p className="text-sm text-muted-foreground">
                When enabled, changes will be applied without clicking save
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          disabled={!settingsChanged}
          className={`flex items-center gap-2 ${settingsChanged ? "animate-pulse" : ""}`}
          data-testid="save-settings"
        >
          <Save className="h-4 w-4" />
          Save Appearance Settings
        </Button>
      </div>
    </div>
  );
};

export default AppearanceTab;
