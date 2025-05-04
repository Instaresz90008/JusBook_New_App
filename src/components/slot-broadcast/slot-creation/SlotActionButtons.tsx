
import React from "react";
import { Button } from "@/components/ui/button";

interface SlotActionButtonsProps {
  onClear: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

const SlotActionButtons = ({ onClear, onSave, isSaving = false }: SlotActionButtonsProps) => {
  return (
    <div className="flex justify-end space-x-2.5 pt-2.5">
      <Button 
        variant="outline" 
        onClick={onClear}
        className="px-4 py-0.5 text-[10px] h-7"
        disabled={isSaving}
      >
        Clear All
      </Button>
      <Button 
        variant="outline" 
        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-0.5 text-[10px] h-7"
        onClick={onSave}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Configuration"}
      </Button>
    </div>
  );
};

export default SlotActionButtons;
