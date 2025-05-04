
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { Link, MapPin, Phone, Mic } from "lucide-react";
import { ServiceFormValues } from "../types";

interface MeetingDetailsProps {
  control: Control<ServiceFormValues>;
  meetingType: string;
}

const MeetingDetailsCollapsible = ({ 
  control, 
  meetingType
}: MeetingDetailsProps) => {
  return (
    <div className="space-y-4 p-2">
      {meetingType === 'Video' && (
        <>
          <FormField
            control={control}
            name="meetingPlatform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-3">
                    {["Zoom", "Google Meet", "Microsoft Teams"].map((platform) => (
                      <div 
                        key={platform}
                        className={`flex items-center justify-center p-2 border rounded-md cursor-pointer ${field.value === platform ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50'}`}
                        onClick={() => field.onChange(platform)}
                      >
                        <span>{platform}</span>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="meetingLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Link (Optional)</FormLabel>
                <FormControl>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                      <Link className="h-4 w-4" />
                    </span>
                    <Input 
                      className="rounded-l-none" 
                      placeholder="https://zoom.us/j/123456789"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  If you don't provide a link now, you can add it later when scheduling
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      
      {meetingType === 'In Person' && (
        <FormField
          control={control}
          name="locationAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Address</FormLabel>
              <FormControl>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <Textarea 
                    className="rounded-l-none min-h-[80px]" 
                    placeholder="123 Business St, Suite 101, San Francisco, CA 94103"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      {meetingType === 'Phone Call' && (
        <>
          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                      <Phone className="h-4 w-4" />
                    </span>
                    <Input 
                      className="rounded-l-none" 
                      placeholder="+1 (555) 123-4567"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  If you don't provide a number now, you can add it later when scheduling
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="accessCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Code (Optional)</FormLabel>
                <FormControl>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                      <Mic className="h-4 w-4" />
                    </span>
                    <Input 
                      className="rounded-l-none" 
                      placeholder="12345#"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};

export default MeetingDetailsCollapsible;
