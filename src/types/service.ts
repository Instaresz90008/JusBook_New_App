
export interface Service {
  id: string;
  user_id: string;
  name: string;
  description: string;
  service_type: "one-to-one" | "one-to-many" | "group";
  duration_mins: number;
  meeting_type: string;
  meeting_link?: string;
  meeting_platform?: string;
  location_address?: string;
  phone_number?: string;
  access_code?: string;
  cost_factor: number;
  is_public: boolean;
  requires_confirmation: boolean;
  collect_payment: boolean;
  max_attendees?: number | null;
  max_seats_per_booking?: number | null;
  allow_waitlist: boolean;
  buffer_time: number;
  advance_booking_days: number;
  created_at: string;
  updated_at: string;
}

// Additional service-related interfaces for form handling
export interface ServiceFormData {
  name: string;
  description: string;
  type: "one-to-one" | "one-to-many" | "group";
  duration: number;
  meetingType: string;
  meetingDetails: {
    platform: string;
    link: string;
    locationAddress: string;
    phoneNumber: string;
    accessCode: string;
  };
  costFactor: number;
  isPublic: boolean;
  settings: {
    requiresConfirmation: boolean;
    collectPayment: boolean;
    maxAttendees: number | null;
    maxSeatsPerBooking: number | null;
    allowWaitlist: boolean;
    bufferTime: number;
    advanceBookingDays: number;
  };
}
