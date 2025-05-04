
// import { useState } from "react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { DURATION_OPTIONS, TIME_SLOTS } from "../utils/timeUtils";
// import serviceService from '@/services/serviceService';

// interface TimeSettingsPanelProps {
//   startTime: string;
//   setStartTime: (time: string) => void;
//   endTime: string;
//   setEndTime: (time: string) => void;
//   duration: string;
//   setDuration: (duration: string) => void;
// }

// const TimeSettingsPanel = ({
//   startTime,
//   setStartTime,
//   endTime,
//   setEndTime,
//   duration,
//   setDuration
// }: TimeSettingsPanelProps) => {
//   return (
//     <div className="grid grid-cols-2 gap-2">
//       <div className="flex flex-col space-y-2">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
//         <Select value={duration} onValueChange={setDuration}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Duration" />
//           </SelectTrigger>
//           <SelectContent>
//             {DURATION_OPTIONS.map(time => (
//               <SelectItem key={time} value={time}>{time}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
      
//       <div className="grid grid-cols-2 gap-2">
//         <div className="flex flex-col space-y-2">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
//           <Select value={startTime} onValueChange={setStartTime}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Start Time" />
//             </SelectTrigger>
//             <SelectContent className="max-h-[300px] overflow-y-auto">
//               {TIME_SLOTS.map(time => (
//                 <SelectItem key={time} value={time}>{time}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
        
//         <div className="flex flex-col space-y-2">
//           <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
//           <Select value={endTime} onValueChange={setEndTime}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="End Time" />
//             </SelectTrigger>
//             <SelectContent className="max-h-[300px] overflow-y-auto">
//               {TIME_SLOTS.map(time => (
//                 <SelectItem key={time} value={time} disabled={time <= startTime}>{time}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSettingsPanel;


//@ts-nocheck
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DURATION_OPTIONS, TIME_SLOTS, addDurationToTime } from "../utils/timeUtils";
interface TimeSettingsPanelProps {
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
}

const TimeSettingsPanel = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  duration,
  setDuration
}: TimeSettingsPanelProps) => {

  // Auto-update endTime when startTime or duration changes
  useEffect(() => {
    if (startTime && duration) {
      const newEndTime = addDurationToTime(startTime, duration);
      setEndTime(newEndTime);
    }
  }, [startTime, duration]);

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
        <Select value={duration} onValueChange={setDuration} disabled>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            {DURATION_OPTIONS.map(time => (
              <SelectItem key={time} value={time}>{time}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Start Time" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {TIME_SLOTS.map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="End Time" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {TIME_SLOTS.map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TimeSettingsPanel;