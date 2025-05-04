
import React from "react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onReset: () => void;
  onSave: () => void;
  isSaving?: boolean;
  isDisabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onReset, 
  onSave, 
  isSaving = false,
  isDisabled = false
}) => {
  return (
    <div className="mt-8 flex justify-between">
      <Button 
        variant="outline" 
        onClick={onReset}
        disabled={isSaving}
      >
        Reset Form
      </Button>
      
      <Button 
        onClick={onSave}
        disabled={isDisabled || isSaving}
      >
        {isSaving ? "SAVING..." : "SAVE SLOTS"}
      </Button>
    </div>
  );
};

export default ActionButtons;
