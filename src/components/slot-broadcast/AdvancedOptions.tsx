
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const AdvancedOptions = () => {
  const [advanced, setAdvanced] = useState(false);
  
  return (
    <div className="pt-4">
      <Button 
        variant="outline" 
        className="w-full flex justify-between" 
        onClick={() => setAdvanced(!advanced)}
      >
        <span>Advanced Options</span>
        {advanced ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </Button>

      {advanced && (
        <div className="border rounded-lg p-4 space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Limit Maximum Bookings</label>
            <Input type="number" defaultValue="3" min="1" className="w-full" />
            <p className="text-xs text-gray-500 mt-1">Maximum number of bookings per day</p>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <Checkbox id="allow-rescheduling" />
              <span className="text-sm font-medium text-gray-700">Allow Rescheduling</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <Checkbox id="allow-cancellation" defaultChecked />
              <span className="text-sm font-medium text-gray-700">Allow Cancellation</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Notice (hours)</label>
            <Input type="number" defaultValue="2" min="0" className="w-full" />
            <p className="text-xs text-gray-500 mt-1">Minimum hours before a slot can be booked</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;
