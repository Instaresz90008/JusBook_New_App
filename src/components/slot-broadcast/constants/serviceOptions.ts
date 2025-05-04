
// Service options
export const serviceOptions = [
  { id: "1", name: "Candidate Interview", color: "blue", costFactor: 1.0 },
  { id: "2", name: "Client Meeting", color: "green", costFactor: 1.5 },
  { id: "3", name: "Team Sync", color: "purple", costFactor: 0.8 },
  { id: "4", name: "Product Demo", color: "orange", costFactor: 1.2 },
  { id: "5", name: "Strategy Session", color: "red", costFactor: 2.0 },
];

// Templates for quick setup
export const templates = [
  { 
    id: "1", 
    name: "Regular Work Hours", 
    days: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false },
    startTime: "9:00 AM",
    endTime: "5:00 PM"
  },
  { 
    id: "2", 
    name: "Weekend Hours", 
    days: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: true, Sun: true },
    startTime: "10:00 AM",
    endTime: "3:00 PM"
  },
  { 
    id: "3", 
    name: "Evening Sessions", 
    days: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false },
    startTime: "6:00 PM",
    endTime: "8:00 PM"
  }
];

// Email templates
export const emailTemplates = [
  {
    id: "default",
    name: "Default Template",
    content: `Hi {name},
Congratulations! Booking has been done.

Event Details:
• Date: {date}
• Time: {time}
• Location: Join meet

We are looking forward to welcoming you and ensuring you have a wonderful time. This event will provide an excellent opportunity to connect with others and gain valuable insights. Should you have any inquiries or need assistance, please feel free to contact us.

Best regards,
{host}`
  },
  {
    id: "reminder",
    name: "Reminder Template",
    content: `Hello {name},
This is a friendly reminder about your upcoming booking.

Booking Details:
• Date: {date}
• Time: {time}
• Service: {service}

We're looking forward to seeing you soon!

Best regards,
{host}`
  }
];
