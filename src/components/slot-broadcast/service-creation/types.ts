
import { z } from "zod";

export const serviceFormSchema = z.object({
  serviceName: z.string().min(3, {
    message: "Service name must be at least 3 characters.",
  }),
  serviceType: z.enum(["one-to-one", "one-to-many", "group"]),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  durationInMins: z.string(),
  meetingType: z.string(),
  // Meeting specific fields
  meetingLink: z.string().optional(),
  meetingPlatform: z.string().optional(),
  locationAddress: z.string().optional(),
  phoneNumber: z.string().optional(),
  accessCode: z.string().optional(),
  // Options
  costFactor: z.number().positive().default(1.0),
  isPublic: z.boolean().default(true),
  requiresConfirmation: z.boolean().default(false),
  collectPayment: z.boolean().default(false),
  // Advanced options
  maxAttendees: z.number().int().positive().optional(),
  maxSeatsPerBooking: z.number().int().positive().optional(),
  allowWaitlist: z.boolean().default(false),
  bufferTime: z.number().int().min(0).default(0),
  advanceBookingDays: z.number().int().min(0).default(30),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export interface ServiceTypeOption {
  id: string;
  label: string;
  description: string;
}

export const serviceTypeOptions: ServiceTypeOption[] = [
  { id: "one-to-one", label: "1-1 (Individual Sessions)", description: "One provider to one participant" },
  { id: "one-to-many", label: "1-Many", description: "One provider to multiple participants" },
  { id: "group", label: "Group Based", description: "Multiple providers to multiple participants" }
];

// Default service templates
export interface ServiceTemplate {
  name: string;
  type: "one-to-one" | "one-to-many" | "group";
  description: string;
  duration: string;
  meetingType: string;
  meetingPlatform?: string;
  maxAttendees?: number;
  maxSeatsPerBooking?: number;
  requiresConfirmation: boolean;
  collectPayment: boolean;
  isPublic: boolean;
}

export const serviceTemplates: ServiceTemplate[] = [
  {
    name: "One-on-One Interview",
    type: "one-to-one",
    description: "Private interview session between interviewer and candidate",
    duration: "30 mins",
    meetingType: "Video",
    meetingPlatform: "Zoom",
    requiresConfirmation: true,
    collectPayment: false,
    isPublic: true
  },
  {
    name: "Webinar Session",
    type: "one-to-many",
    description: "Educational webinar presented to multiple attendees",
    duration: "60 mins",
    meetingType: "Video",
    meetingPlatform: "Microsoft Teams",
    maxAttendees: 100,
    requiresConfirmation: false,
    collectPayment: true,
    isPublic: true
  },
  {
    name: "Team Workshop",
    type: "group",
    description: "Collaborative workshop for multiple team members",
    duration: "120 mins",
    meetingType: "In Person",
    maxAttendees: 20,
    maxSeatsPerBooking: 4,
    requiresConfirmation: true,
    collectPayment: false,
    isPublic: false
  },
  {
    name: "Client Call",
    type: "one-to-one",
    description: "Quick phone consultation with a client",
    duration: "15 mins",
    meetingType: "Phone Call",
    requiresConfirmation: true,
    collectPayment: false,
    isPublic: true
  }
];
