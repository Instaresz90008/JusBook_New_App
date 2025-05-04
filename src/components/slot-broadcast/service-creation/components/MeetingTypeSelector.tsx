
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Video, MapPin, Phone } from "lucide-react";
import { ServiceFormValues } from "../types";

interface MeetingTypeSelectorProps {
  control: Control<ServiceFormValues>;
  setMeetingType: (type: string) => void;
}

const MeetingTypeSelector = ({ control, setMeetingType }: MeetingTypeSelectorProps) => {
  return (
    <FormField
      control={control}
      name="meetingType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meeting Type</FormLabel>
          <FormControl>
            <div className="grid grid-cols-3 gap-4">
              <div 
                className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${field.value === 'Video' ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50'}`}
                onClick={() => {
                  field.onChange('Video');
                  setMeetingType('Video');
                }}
              >
                <Video className="h-8 w-8 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Video</span>
              </div>
              <div 
                className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${field.value === 'In Person' ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50'}`}
                onClick={() => {
                  field.onChange('In Person');
                  setMeetingType('In Person');
                }}
              >
                <MapPin className="h-8 w-8 mb-2 text-gray-600" />
                <span className="text-sm font-medium">In Person</span>
              </div>
              <div 
                className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${field.value === 'Phone Call' ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50'}`}
                onClick={() => {
                  field.onChange('Phone Call');
                  setMeetingType('Phone Call');
                }}
              >
                <Phone className="h-8 w-8 mb-2 text-gray-600" />
                <span className="text-sm font-medium">Phone Call</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MeetingTypeSelector;
