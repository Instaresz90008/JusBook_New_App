
// import { format, addDays, isToday, isTomorrow } from "date-fns";
// import { Check, X, CalendarCheck } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// // Mock data for upcoming events
// const upcomingEvents = [
//   {
//     id: 1,
//     title: "Strategy Meeting",
//     date: new Date(2025, 3, 30, 14, 30),
//     duration: 60,
//     client: "Acme Corp",
//     status: "pending",
//   },
//   {
//     id: 2,
//     title: "Product Demo",
//     date: new Date(2025, 4, 1, 10, 0),
//     duration: 45,
//     client: "Globex Inc",
//     status: "pending",
//   },
//   {
//     id: 3,
//     title: "Team Standup",
//     date: new Date(2025, 4, 2, 9, 0),
//     duration: 30,
//     client: "Internal",
//     status: "confirmed",
//   }
// ];

// const UpcomingEvents = () => {
//   // Generate next 7 days for the date bar
//   const today = new Date();
//   const nextDays = Array.from({ length: 7 }).map((_, index) => {
//     const date = addDays(today, index);
//     return {
//       date,
//       day: format(date, "EEE"),
//       label: isToday(date) ? "Today" : isTomorrow(date) ? "Tomorrow" : format(date, "MMM d"),
//     };
//   });

//   return (
//     <Card className="hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
//       <CardHeader className="pb-3">
//         <div className="flex justify-between items-center">
//           <div>
//             <CardTitle>Upcoming Events</CardTitle>
//             <CardDescription>Your schedule for the next few days</CardDescription>
//           </div>
//           <CalendarCheck className="h-5 w-5 text-primary" />
//         </div>
//       </CardHeader>
      
//       {/* Date Bar */}
//       <div className="px-6 border-b border-gray-100 pb-3">
//         <div className="flex justify-between">
//           {nextDays.map((day) => (
//             <div 
//               key={day.label} 
//               className={`text-center cursor-pointer px-3 py-2 rounded-lg transition-colors duration-200 ${
//                 day.label === "Today" ? "bg-primary text-white" : "hover:bg-gray-100"
//               }`}
//             >
//               <p className="text-xs font-medium">{day.label}</p>
//               <p className="text-lg font-semibold mt-1">{day.day}</p>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <CardContent className="space-y-4 pt-3">
//         {upcomingEvents.map((event) => (
//           <div 
//             key={event.id}
//             className="flex justify-between items-center border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200"
//           >
//             <div>
//               <h4 className="font-medium">{event.title}</h4>
//               <p className="text-sm text-gray-500">
//                 {format(event.date, "EEE, MMM d • h:mm a")}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {event.duration} min • {event.client}
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               {event.status === "pending" ? (
//                 <>
//                   <Button 
//                     size="sm" 
//                     variant="ghost"
//                     className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <Button 
//                     size="sm"
//                     variant="ghost"
//                     className="h-8 w-8 p-0 rounded-full text-green-500 hover:text-green-700 hover:bg-green-50"
//                   >
//                     <Check className="h-4 w-4" />
//                   </Button>
//                 </>
//               ) : (
//                 <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                   Confirmed
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </CardContent>
//       <CardFooter>
//         <Button variant="ghost" className="w-full text-primary hover:bg-primary/5 transition-colors duration-200" size="sm">
//           View Full Calendar
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default UpcomingEvents;




import { useState, useEffect } from "react";
import { Check, X, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import bookingService from "../../services/bookingService";

// Date utility functions
  const formatDate = (date, format) => {
  const d = new Date(date);
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const fullDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const dayOfWeek = d.getDay();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  
  if (format === "EEE") {
    return dayNames[dayOfWeek];
  } else if (format === "MMM d") {
    return `${monthNames[month]} ${day}`;
  } else if (format === "EEE, MMM d • h:mm a") {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${dayNames[dayOfWeek]}, ${monthNames[month]} ${day} • ${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  return d.toLocaleDateString();
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
};

const isTomorrow = (date) => {
  const tomorrow = addDays(new Date(), 1);
  return date.getDate() === tomorrow.getDate() && 
         date.getMonth() === tomorrow.getMonth() && 
         date.getFullYear() === tomorrow.getFullYear();
};

const UpcomingEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Generate next 7 days for the date bar
  const today = new Date();
  const nextDays = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(today, index);
    return {
      date,
      day: formatDate(date, "EEE"),
      label: isToday(date) ? "Today" : isTomorrow(date) ? "Tomorrow" : formatDate(date, "MMM d"),
    };
  });

  // Calculate booking duration in minutes
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = Number(end) - Number(start);
    return Math.round(diffMs / (1000 * 60));
  };

  // Format bookings data for display
  const formatBookingData = (bookingData) => {
    if (!Array.isArray(bookingData)) return [];
    
    return bookingData.map(booking => {
      if (!booking) return null;
      
      // Ensure start_time and end_time are valid
      const startTime = booking.start_time ? booking.start_time : null;
      const endTime = booking.end_time ? booking.end_time : null;
      
      return {
        id: booking.id || `temp-${Math.random().toString(36).substring(2, 9)}`,
        title: booking.service_name || booking.title || "Appointment",
        date: startTime ? new Date(startTime) : new Date(),
        duration: (startTime && endTime) ? calculateDuration(startTime, endTime) : 30,
        client: booking.customer_name || booking.client || "Guest",
        status: booking.status || "pending",
        notes: booking.notes || ""
      };
    }).filter(Boolean); // Remove any null items
  };

  // Filter bookings for the selected date
  const getFilteredBookings = () => {
    return bookings.filter(booking => {
      if (!booking || !booking.date) return false;
      const bookingDate = new Date(booking.date);
      return bookingDate.getDate() === selectedDate.getDate() &&
             bookingDate.getMonth() === selectedDate.getMonth() &&
             bookingDate.getFullYear() === selectedDate.getFullYear();
    });
  };

  // Fetch bookings from API
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const bookingsData = await bookingService.getProviderBookings();
      const formattedBookings = formatBookingData(bookingsData);
      setBookings(formattedBookings);
      setError("");
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load upcoming events");
    } finally {
      setLoading(false);
    }
  };

  // Handle booking status update
  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingService.updateBookingStatus(bookingId, newStatus);
      
      // Update local state to reflect the change
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus } 
            : booking
        )
      );
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert("Failed to update booking status");
    }
  };

  // Fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = getFilteredBookings();

  return (
    <Card className="hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </div>
          <CalendarCheck className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      
      {/* Date Bar */}
      <div className="px-6 border-b border-gray-100 pb-3">
        <div className="flex justify-between">
          {nextDays.map((day) => (
            <div 
              key={day.label} 
              className={`text-center cursor-pointer px-3 py-2 rounded-lg transition-colors duration-200 ${
                (isToday(selectedDate) && day.label === "Today") || 
                (isTomorrow(selectedDate) && day.label === "Tomorrow") ||
                (!isToday(selectedDate) && !isTomorrow(selectedDate) && 
                 day.date.getDate() === selectedDate.getDate() &&
                 day.date.getMonth() === selectedDate.getMonth())
                  ? "bg-primary text-white" 
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedDate(day.date)}
            >
              <p className="text-xs font-medium">{day.label}</p>
              <p className="text-lg font-semibold mt-1">{day.day}</p>
            </div>
          ))}
        </div>
      </div>
      
      <CardContent className="space-y-4 pt-3">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-gray-400">Loading events...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No events scheduled for this day</p>
          </div>
        ) : (
          filteredBookings.map((event) => (
            <div 
              key={event.id}
              className="flex justify-between items-center border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200"
            >
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-500">
                  {formatDate(event.date, "EEE, MMM d • h:mm a")}
                </p>
                <p className="text-xs text-gray-500">
                  {event.duration} min • {event.client}
                </p>
                {event.notes && <p className="text-xs italic text-gray-400 mt-1">{event.notes}</p>}
              </div>
              <div className="flex items-center gap-2">
                {event.status === "pending" ? (
                  <>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleStatusUpdate(event.id, "cancelled")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-full text-green-500 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleStatusUpdate(event.id, "confirmed")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </>
                ) : event.status === "confirmed" ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Confirmed
                  </span>
                ) : (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          className="text-primary hover:bg-primary/5 transition-colors duration-200" 
          size="sm"
          onClick={fetchBookings}
        >
          Refresh
        </Button>
        <Button 
          variant="ghost" 
          className="text-primary hover:bg-primary/5 transition-colors duration-200" 
          size="sm"
          onClick={() => window.location.href = "/calendar"}
        >
          View Full Calendar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingEvents;