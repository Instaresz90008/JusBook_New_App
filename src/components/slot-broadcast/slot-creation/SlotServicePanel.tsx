
import { useState } from "react";
import DynamicServiceSelector from "../service/DynamicServiceSelector";
import TimeSettingsPanel from "./TimeSettingsPanel";

interface SlotServicePanelProps {
  service: string;
  setService: (service: string) => void;
  serviceCost: number;
  setServiceCost: (cost: number) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
}

const SlotServicePanel = ({
  service,
  setService,
  serviceCost,
  setServiceCost,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  duration,
  setDuration
}: SlotServicePanelProps) => {
  return (
    <div className="space-y-4">
      {/* Service selection - more compact design */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Service Type</h3>
          {service !== "N/A" && (
            <div className="flex items-center text-xs bg-gray-50 px-2 py-1 rounded-md">
              <span className="text-gray-500">Selected:</span>
              <span className="ml-1 font-medium">{service}</span>
              <span className="w-2 h-2 ml-2 rounded-full bg-blue-500"></span>
            </div>
          )}
        </div>
        <DynamicServiceSelector
          service={service}
          setService={setService}
          serviceCost={serviceCost}
          setServiceCost={setServiceCost}
          setDuration={setDuration}
          showCostFactor={true}
          allowCreate={true}
        />
      </div>
      
      {/* Time settings panel */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Time Settings</h3>
        <TimeSettingsPanel
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          duration={duration}
          setDuration={setDuration}
        />
      </div>
    </div>
  );
};

export default SlotServicePanel;
