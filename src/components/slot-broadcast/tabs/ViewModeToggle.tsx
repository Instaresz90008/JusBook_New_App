
import { Button } from "@/components/ui/button";
import { useSlotStore } from "@/store/slotStore";
import { logger } from "@/utils/logger";

const ViewModeToggle = () => {
  const { viewMode, setViewMode } = useSlotStore();

  const handleViewModeToggle = (mode: "advanced" | "simple") => {
    if (mode === viewMode) return;
    
    logger.trackEvent('view_mode_toggled', { from: viewMode, to: mode });
    setViewMode(mode);
  };

  return (
    <div className="border rounded-md p-1 bg-muted">
      <Button 
        variant={viewMode === "advanced" ? "default" : "ghost"}
        size="sm" 
        onClick={() => handleViewModeToggle("advanced")}
        className="rounded-sm"
      >
        Advanced
      </Button>
      <Button 
        variant={viewMode === "simple" ? "default" : "ghost"}
        size="sm" 
        onClick={() => handleViewModeToggle("simple")}
        className="rounded-sm"
      >
        Simple
      </Button>
    </div>
  );
};

export default ViewModeToggle;
