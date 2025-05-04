
import { Checkbox } from "@/components/ui/checkbox";

interface WeekControlsProps {
  showWeekend: boolean;
  setShowWeekend: (show: boolean) => void;
}

const WeekControls = ({ showWeekend, setShowWeekend }: WeekControlsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="flex items-center space-x-2">
        <Checkbox 
          checked={showWeekend}
          onCheckedChange={(checked) => setShowWeekend(checked === true)}
        />
        <span className="text-sm">Show Weekend</span>
      </label>
    </div>
  );
};

export default WeekControls;
