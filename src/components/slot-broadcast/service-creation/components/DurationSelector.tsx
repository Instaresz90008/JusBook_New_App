
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { ServiceFormValues } from "../types";

interface DurationSelectorProps {
  control: Control<ServiceFormValues>;
  setDuration: (duration: string) => void;
}

const DurationSelector = ({ control, setDuration }: DurationSelectorProps) => {
  return (
    <FormField
      control={control}
      name="durationInMins"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Duration</FormLabel>
          <FormControl>
            <div className="grid grid-cols-3 gap-2">
              {[""].map((time) => (
                <div 
                  key={time}
                  className={`flex items-center justify-center p-2 border rounded-md cursor-pointer ${field.value === time ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50'}`}
                  onClick={() => {
                    field.onChange(time);
                    setDuration(time);
                  }}
                >
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DurationSelector;
