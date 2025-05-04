
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { format, addDays, startOfWeek } from "date-fns";

// interface DayProps {
//   date: Date;
//   day: string;
//   totalSlots: number;
//   bookedSlots: number;
//   availableSlots: number;
// }

// const AvailabilityCard = () => {
//   // Generate all 7 days of the current week
//   const today = new Date();
//   const weekStart = startOfWeek(today);
  
//   const days: DayProps[] = Array.from({ length: 7 }).map((_, index) => {
//     const date = addDays(weekStart, index);
//     return {
//       date,
//       day: format(date, "EEEE"),
//       totalSlots: 3,
//       bookedSlots: index === 3 || index === 5 ? 1 : 0, // Just for demo: add some booked slots
//       availableSlots: index === 3 || index === 5 ? 2 : 3,
//     };
//   });

//   return (
//     <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200">
//       <div className="flex justify-between items-center mb-5">
//         <h3 className="text-lg font-semibold">Your Availability Overview</h3>
//         <div className="flex space-x-1">
//           <button className="p-1 rounded-md hover:bg-gray-100">
//             <ArrowLeft className="h-5 w-5" />
//           </button>
//           <button className="p-1 rounded-md hover:bg-gray-100">
//             <ArrowRight className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-7 gap-2 w-full">
//         {days.map((day) => (
//           <div key={day.day} className="border rounded-lg p-3 transition-all hover:shadow-md hover:bg-gray-50">
//             <p className="text-xs text-gray-500">{format(day.date, "MMM dd")}</p>
//             <p className="font-medium text-sm">{day.day.substring(0, 3)}</p>
            
//             <div className="mt-3 text-sm">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-xs font-medium">{day.totalSlots} Slots</span>
//               </div>
              
//               {/* Availability visualizer */}
//               <div className="w-full bg-gray-100 h-2 rounded-full mt-1.5 mb-2.5 overflow-hidden">
//                 <div 
//                   className="bg-primary h-full rounded-full" 
//                   style={{ width: `${(day.bookedSlots / day.totalSlots) * 100}%` }}
//                 ></div>
//               </div>
              
//               <div className="flex justify-between mt-2">
//                 <div className="text-center">
//                   <p className="text-primary font-medium text-xs">{day.bookedSlots}</p>
//                   <p className="text-xs text-gray-500">Booked</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-green-500 font-medium text-xs">{day.availableSlots}</p>
//                   <p className="text-xs text-gray-500">Free</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="mt-4 text-sm text-center">
//         <button className="text-primary hover:underline">
//           Add more availability slots →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AvailabilityCard;




import { ArrowLeft, ArrowRight } from "lucide-react";
import { format, addDays, startOfWeek, endOfWeek, isEqual, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import slotService from "../../services/slotService";

interface Slot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  service_id: string;
}

interface DayData {
  date: Date;
  day: string;
  totalSlots: number;
  bookedSlots: number;
  availableSlots: number;
}

const AvailabilityCard = ({ serviceId = "" }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date()));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Calculate the end of the current week
  const currentWeekEnd = endOfWeek(currentWeekStart);

  // Format dates for API request
  const formatDateForApi = (date: Date) => format(date, "yyyy-MM-dd");

  // Fetch slots for the current week
  const fetchWeekSlots = async () => {
    setLoading(true);
    try {
      let fetchedSlots;
      
      if (serviceId) {
        // If serviceId is provided, fetch slots for that specific service
        fetchedSlots = await slotService.getServiceSlots(serviceId);
      } else {
        // Otherwise fetch by date range
        fetchedSlots = await slotService.getSlotsByDateRange(
          formatDateForApi(currentWeekStart),
          formatDateForApi(currentWeekEnd)
        );
      }
      
      setSlots(fetchedSlots);
      setError("");
    } catch (err) {
      console.error("Error fetching slots:", err);
      setError("Failed to load availability data");
    } finally {
      setLoading(false);
    }
  };

  // Handle week navigation
  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeekStart(prevWeek => {
      const days = direction === "next" ? 7 : -7;
      return addDays(prevWeek, days);
    });
  };

  // Process slots into day-based data
  const getDaysData = (): DayData[] => {
    const days: DayData[] = [];

    // Create array for all 7 days of the week
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(currentWeekStart, i);
      const dateString = format(currentDate, "yyyy-MM-dd");

      // Filter slots for this specific day
      const daySlots = slots.filter(slot => {
        // Extract the date part from the slot's date string
        const slotDateStr = slot.date || slot.start_time.split("T")[0];
        return slotDateStr.includes(dateString);
      });

      // Count available and booked slots
      const totalDaySlots = daySlots.length;
      const availableDaySlots = daySlots.filter(slot => slot.is_available).length;
      const bookedDaySlots = totalDaySlots - availableDaySlots;

      days.push({
        date: currentDate,
        day: format(currentDate, "EEEE"),
        totalSlots: totalDaySlots,
        bookedSlots: bookedDaySlots,
        availableSlots: availableDaySlots,
      });
    }

    return days;
  };

  // Fetch slots when component mounts or week/serviceId changes
  useEffect(() => {
    fetchWeekSlots();
  }, [currentWeekStart, serviceId]);

  // Get the processed days data
  const days = getDaysData();

  // Get week date range for display
  const weekDateRange = `${format(currentWeekStart, "MMM d")} - ${format(currentWeekEnd, "MMM d, yyyy")}`;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Your Availability Overview</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">{weekDateRange}</span>
          <div className="flex space-x-1">
            <button 
              onClick={() => navigateWeek("prev")} 
              className="p-1 rounded-md hover:bg-gray-100"
              aria-label="Previous week"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={() => navigateWeek("next")} 
              className="p-1 rounded-md hover:bg-gray-100"
              aria-label="Next week"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-gray-400">Loading availability...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <div className="grid grid-cols-7 gap-2 w-full">
          {days.map((day) => {
            // Calculate availability percentage for the progress bar
            const availabilityPercentage = day.totalSlots > 0 
              ? (day.bookedSlots / day.totalSlots) * 100
              : 0;
              
            const isToday = isEqual(
              new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()),
              new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            );

            return (
              <div 
                key={format(day.date, "yyyy-MM-dd")} 
                className={`border rounded-lg p-3 transition-all hover:shadow-md ${
                  isToday ? "ring-2 ring-primary ring-opacity-50 bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <p className="text-xs text-gray-500">{format(day.date, "MMM dd")}</p>
                <p className="font-medium text-sm">{day.day.substring(0, 3)}</p>
                
                <div className="mt-3 text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">{day.totalSlots} Slots</span>
                  </div>
                  
                  {/* Availability visualizer */}
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-1.5 mb-2.5 overflow-hidden">
                    {day.totalSlots > 0 ? (
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${availabilityPercentage}%` }}
                      ></div>
                    ) : (
                      <div className="bg-gray-300 h-full rounded-full w-full"></div>
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <div className="text-center">
                      <p className="text-primary font-medium text-xs">{day.bookedSlots}</p>
                      <p className="text-xs text-gray-500">Booked</p>
                    </div>
                    <div className="text-center">
                      <p className="text-green-500 font-medium text-xs">{day.availableSlots}</p>
                      <p className="text-xs text-gray-500">Free</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-4 flex justify-center">
        <button 
          onClick={fetchWeekSlots}
          className="text-sm text-primary hover:underline flex items-center"
        >
          Refresh availability
        </button>
        <span className="mx-2 text-gray-300">|</span>
        <button 
          className="text-sm text-primary hover:underline flex items-center"
          onClick={() => window.location.href = "/slots/manage"}
        >
          Add more availability slots
        </button>
      </div>
    </div>
  );
};

export default AvailabilityCard;
