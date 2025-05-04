
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { ServiceFormValues } from "../types";

interface ServiceTypeOption {
  id: string;
  label: string;
  description: string;
}

interface BasicInformationSectionProps {
  control: Control<ServiceFormValues>;
  serviceTypeOptions: ServiceTypeOption[];
}

const BasicInformationSection = ({ control, serviceTypeOptions }: BasicInformationSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border space-y-4">
      <h3 className="text-lg font-medium mb-2">Basic Information</h3>
      
      <FormField
        control={control}
        name="serviceName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Candidate Interview" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="serviceType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Service Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-2"
              >
                {serviceTypeOptions.map((option) => (
                  <FormItem key={option.id} className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={option.id} />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-normal">{option.label}</FormLabel>
                      <FormDescription className="text-xs">
                        {option.description}
                      </FormDescription>
                    </div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe this service..." 
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInformationSection;
