
import { Checkbox } from "@/components/ui/checkbox";

interface WeekHeaderProps {
  label: string;
  selectAll: boolean;
  onToggleSelectAll: () => void;
}

const WeekHeader = ({ label, selectAll, onToggleSelectAll }: WeekHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <label className="flex items-center space-x-2">
        <span>Select all</span>
        <Checkbox 
          checked={selectAll}
          onCheckedChange={onToggleSelectAll}
        />
      </label>
    </div>
  );
};

export default WeekHeader;
