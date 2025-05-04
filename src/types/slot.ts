
export interface Slot {
  id: string;
  service_id: string;
  user_id: string;
  slot_date: string;
  start_time: string;
  duration:string;
  end_time: string;
  is_available: boolean;
  booking_link?: string;
  created_at: string;
  updated_at: string;
}

export interface SlotCreationRequest {
  service_id: string;
  slots: SlotData[];
}

export interface SlotData {
  slot_date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}
