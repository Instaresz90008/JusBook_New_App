
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Control } from "react-hook-form";
import { ServiceFormValues } from "../types";
import { Users, Clock, Bell, Calendar } from "lucide-react";

interface MeetingOptionsSectionProps {
  control: Control<ServiceFormValues>;
  serviceType: string;
  showCommentBox: boolean;
  setShowCommentBox: (show: boolean) => void;
  emailVisibility: boolean;
  setEmailVisibility: (visible: boolean) => void;
}

const MeetingOptionsSection = ({
  control,
  serviceType,
  showCommentBox,
  setShowCommentBox,
  emailVisibility,
  setEmailVisibility
}: MeetingOptionsSectionProps) => {
  const isMultiAttendee = serviceType === "one-to-many" || serviceType === "group";
  
  return (
    <div className="space-y-4">
      {/* Basic Options */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="showCommentBox" 
            checked={showCommentBox} 
            onCheckedChange={(checked) => setShowCommentBox(checked as boolean)}
          />
          <label htmlFor="showCommentBox" className="text-sm">Show Comment Box</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="emailVisibility" 
            checked={emailVisibility} 
            onCheckedChange={(checked) => setEmailVisibility(checked as boolean)}
          />
          <label htmlFor="emailVisibility" className="text-sm">Email visibility to the public</label>
        </div>
      </div>
      
      {/* Advanced Options */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced-options">
          <AccordionTrigger className="text-sm font-medium">
            Advanced Service Options
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Attendee Limits - Only for one-to-many and group */}
            {isMultiAttendee && (
              <>
                <FormField
                  control={control}
                  name="maxAttendees"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <FormLabel>Maximum Attendees</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="e.g., 20"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Total number of participants who can register for this service
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="maxSeatsPerBooking"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <FormLabel>Max Seats Per Booking</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="e.g., 4"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Maximum number of seats a customer can book in a single order
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="allowWaitlist"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Bell className="h-4 w-4 mr-2 text-gray-500" />
                          <FormLabel className="text-base">Enable Waitlist</FormLabel>
                        </div>
                        <FormDescription className="text-xs">
                          Allow users to join a waitlist when fully booked
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Buffer Time - for all service types */}
            <FormField
              control={control}
              name="bufferTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <FormLabel>Buffer Time (minutes)</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g., 10"
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Extra time between bookings to prepare for the next session
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="advanceBookingDays"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <FormLabel>Advance Booking Period (days)</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="e.g., 30"
                      {...field}
                      value={field.value || 30}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 30)}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    How far in advance users can book this service
                  </FormDescription>
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MeetingOptionsSection;
