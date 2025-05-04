
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Calendar, Clock } from "lucide-react";
import serviceService from "@/services/serviceService";

// Import components
import BasicInformationSection from "./components/BasicInformationSection";
import ServiceOptionsSection from "./components/ServiceOptionsSection";
import MeetingTypeSelector from "./components/MeetingTypeSelector";
import DurationSelector from "./components/DurationSelector";
import MeetingDetailsCollapsible from "./components/MeetingDetailsCollapsible";
import MeetingOptionsSection from "./components/MeetingOptionsSection";

// Import types
import { serviceFormSchema, ServiceFormValues, serviceTypeOptions, serviceTemplates } from "./types";
import { ServiceFormData } from "@/types/service";

const ServiceCreationForm = () => {
  const navigate = useNavigate();
  
  // State
  const [serviceCost, setServiceCost] = useState(1.0);
  const [service, setService] = useState("Candidate Interview");
  const [duration, setDuration] = useState("15 mins");
  const [meetingType, setMeetingType] = useState("Video");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [emailVisibility, setEmailVisibility] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      serviceName: service,
      serviceType: "one-to-one",
      description: "",
      durationInMins: duration,
      meetingType: meetingType,
      meetingLink: "",
      meetingPlatform: "",
      locationAddress: "",
      phoneNumber: "",
      accessCode: "",
      costFactor: serviceCost,
      isPublic: true,
      requiresConfirmation: false,
      collectPayment: false,
      maxAttendees: undefined,
      maxSeatsPerBooking: undefined,
      allowWaitlist: false,
      bufferTime: 0,
      advanceBookingDays: 30,
    },
  });

  const serviceType = form.watch("serviceType");

  const onSubmit = async (data: ServiceFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Convert string duration to number
      const durationInMinutes = extractDurationMinutes(data.durationInMins);
      
      // Convert form data to service object expected by API
      const serviceData: ServiceFormData = {
        name: data.serviceName,
        description: data.description || "No description provided",
        type: data.serviceType,
        duration: durationInMinutes,  // Ensure this is a number
        meetingType: data.meetingType,
        meetingDetails: {
          platform: data.meetingPlatform || "N/A",
          link: data.meetingLink || "N/A",
          locationAddress: data.locationAddress || "N/A",
          phoneNumber: data.phoneNumber || "N/A",
          accessCode: data.accessCode || "N/A",
        },
        costFactor: data.costFactor || serviceCost,
        isPublic: data.isPublic,
        settings: {
          requiresConfirmation: data.requiresConfirmation,
          collectPayment: data.collectPayment,
          maxAttendees: data.maxAttendees || null,
          maxSeatsPerBooking: data.maxSeatsPerBooking || null,
          allowWaitlist: data.allowWaitlist,
          bufferTime: data.bufferTime || 0,
          advanceBookingDays: data.advanceBookingDays || 30,
        },
      };
      
      // Call the API to create the service
      const response = await serviceService.createService(serviceData);
      
      toast.success(`Service "${data.serviceName}" created successfully`);
      
      // Navigate back to slot broadcast after successful creation
      setTimeout(() => {
        navigate("/slot-broadcast");
      }, 1500);
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to extract minutes from duration string
  const extractDurationMinutes = (durationStr: string): number => {
    // Extract number from strings like "30 mins"
    const minutes = parseInt(durationStr.split(" ")[0], 10);
    return isNaN(minutes) ? 30 : minutes; // Default to 30 if parsing fails
  };

  const applyTemplate = (template: number) => {
    const selectedTemplate = serviceTemplates[template];
    
    form.reset({
      serviceName: selectedTemplate.name,
      serviceType: selectedTemplate.type,
      description: selectedTemplate.description,
      durationInMins: selectedTemplate.duration,
      meetingType: selectedTemplate.meetingType,
      meetingPlatform: selectedTemplate.meetingPlatform || "",
      locationAddress: "",
      phoneNumber: "",
      accessCode: "",
      costFactor: 1.0,
      isPublic: selectedTemplate.isPublic,
      requiresConfirmation: selectedTemplate.requiresConfirmation,
      collectPayment: selectedTemplate.collectPayment,
      maxAttendees: selectedTemplate.maxAttendees,
      maxSeatsPerBooking: selectedTemplate.maxSeatsPerBooking,
      allowWaitlist: false,
      bufferTime: 0,
      advanceBookingDays: 30,
    });
    
    setMeetingType(selectedTemplate.meetingType);
    setDuration(selectedTemplate.duration);
    
    toast.success(`"${selectedTemplate.name}" template has been applied.`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Template Selector */}
        <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
          <h3 className="text-lg font-medium">Quick Start with Templates</h3>
          <p className="text-sm text-gray-600">Select a template to quickly create a pre-configured service</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceTemplates.map((template, index) => (
              <div 
                key={index}
                className="bg-white border rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => applyTemplate(index)}
              >
                <h4 className="font-medium">{template.name}</h4>
                <div className="text-xs text-gray-500 mt-1">{template.type}</div>
                <div className="flex items-center text-xs text-gray-600 mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  {template.duration}
                </div>
                <p className="text-xs mt-2 line-clamp-2">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            {/* Basic Information Section */}
            <BasicInformationSection 
              control={form.control} 
              serviceTypeOptions={serviceTypeOptions} 
            />
            
            {/* Service Options Section */}
            <ServiceOptionsSection control={form.control} />
          </div>
          
          {/* Right Column - Meeting Details */}
          <div className="space-y-6">
            {/* Meeting Details */}
            <div className="bg-white p-6 rounded-lg border space-y-6">
              <h3 className="text-lg font-medium mb-2">Meeting Details</h3>
              
              {/* Meeting Type Selector */}
              <MeetingTypeSelector 
                control={form.control} 
                setMeetingType={setMeetingType} 
              />
              
              {/* Duration Selector */}
              <DurationSelector 
                control={form.control} 
                setDuration={setDuration} 
              />
              
              {/* Meeting Details - Now always visible */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium mb-3">Meeting Specific Details</h4>
                <MeetingDetailsCollapsible 
                  control={form.control}
                  meetingType={meetingType}
                />
              </div>
              
              {/* Options Section with Advanced Options */}
              <MeetingOptionsSection 
                control={form.control}
                serviceType={serviceType}
                showCommentBox={showCommentBox}
                setShowCommentBox={setShowCommentBox}
                emailVisibility={emailVisibility}
                setEmailVisibility={setEmailVisibility}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate("/slot-broadcast")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceCreationForm;
