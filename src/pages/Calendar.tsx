
// import Layout from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
// import { useEffect, useState } from "react";

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [currentView, setCurrentView] = useState<"day" | "week" | "month">("month");
  
//   // Generate days for the calendar grid
//   const daysInMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0
//   ).getDate();
  
//   const firstDayOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1
//   ).getDay();
  
//   const days = [];
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
//   // Previous month days
//   for (let i = 0; i < firstDayOfMonth; i++) {
//     const prevMonthDays = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       0
//     ).getDate();
//     days.push({
//       day: prevMonthDays - firstDayOfMonth + i + 1,
//       isCurrentMonth: false,
//       hasEvents: false,
//     });
//   }
  
//   // Current month days
//   for (let i = 1; i <= daysInMonth; i++) {
//     days.push({
//       day: i,
//       isCurrentMonth: true,
//       isToday:
//         i === new Date().getDate() &&
//         currentDate.getMonth() === new Date().getMonth() &&
//         currentDate.getFullYear() === new Date().getFullYear(),
//       hasEvents: [10, 15, 20, 25].includes(i), // Mock event days
//     });
//   }
  
//   // Next month days
//   const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
//   for (let i = 1; i <= remainingDays; i++) {
//     days.push({
//       day: i,
//       isCurrentMonth: false,
//       hasEvents: false,
//     });
//   }
  
//   const prevMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };
  
//   const nextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };
  
//   const today = () => {
//     setCurrentDate(new Date());
//   };
  
//   return (
//     <Layout title="Calendar">
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={today}
//             >
//               Today
//             </Button>
//             <div className="flex items-center">
//               <Button variant="ghost" size="icon" onClick={prevMonth}>
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="icon" onClick={nextMonth}>
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//             <h2 className="text-xl font-semibold">
//               {currentDate.toLocaleDateString("en-US", {
//                 month: "long",
//                 year: "numeric",
//               })}
//             </h2>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <div className="border rounded-md overflow-hidden flex">
//               <Button 
//                 variant={currentView === "day" ? "default" : "ghost"}
//                 className={`rounded-none ${currentView === "day" ? "bg-primary text-white" : ""}`}
//                 onClick={() => setCurrentView("day")}
//               >
//                 Day
//               </Button>
//               <Button 
//                 variant={currentView === "week" ? "default" : "ghost"}
//                 className={`rounded-none ${currentView === "week" ? "bg-primary text-white" : ""}`}
//                 onClick={() => setCurrentView("week")}
//               >
//                 Week
//               </Button>
//               <Button 
//                 variant={currentView === "month" ? "default" : "ghost"}
//                 className={`rounded-none ${currentView === "month" ? "bg-primary text-white" : ""}`}
//                 onClick={() => setCurrentView("month")}
//               >
//                 Month
//               </Button>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl border shadow-sm">
//           <div className="grid grid-cols-7 gap-px bg-gray-200">
//             {daysOfWeek.map((day) => (
//               <div
//                 key={day}
//                 className="bg-gray-100 py-2 text-center text-sm font-medium"
//               >
//                 {day}
//               </div>
//             ))}
            
//             {days.map((day, index) => (
//               <div
//                 key={index}
//                 className={`min-h-[100px] p-1 relative ${
//                   day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"
//                 } ${day.isToday ? "bg-blue-50" : ""}`}
//               >
//                 <div className="flex justify-between">
//                   <span
//                     className={`text-sm font-medium ${
//                       day.isToday
//                         ? "bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center"
//                         : ""
//                     }`}
//                   >
//                     {day.day}
//                   </span>
                  
//                   {day.hasEvents && (
//                     <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
//                   )}
//                 </div>
                
//                 {day.hasEvents && day.isCurrentMonth && (
//                   <div className="mt-1">
//                     <div className="text-xs bg-primary/10 text-primary rounded p-1 mb-1">
//                       10:00 AM - Client Meeting
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Calendar;


import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import slotService from "../services/slotService";
import serviceService from "../services/serviceService";
import { Service } from "@/types/service";
import { Slot } from "../types/slot";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<"day" | "week" | "month">("month");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [servicesLoading, setServicesLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [servicesError, setServicesError] = useState<string | null>(null);


  console.log(services);
  
  // Generate days for the calendar grid
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  
  // Load services
  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      setServicesError(null);
      
      try {
        const servicesData = await serviceService.getUserServices();
        setServices(servicesData);
        
        // Auto-select the first service if none is selected
        if (servicesData.length > 0 && !selectedServiceId) {
          setSelectedServiceId(servicesData[0].id);
        }
      } catch (err) {
        setServicesError("Failed to load services. Please try again.");
        console.error(err);
      } finally {
        setServicesLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Load slots for the current month
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedServiceId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Calculate first and last day of the displayed calendar
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // Add extra days to include the days from previous and next month that appear in the calendar
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 10);
        
        // Format dates as expected by the API
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        
        const slotsData = await slotService.getServiceSlots(selectedServiceId);
        
        // Filter slots for the current date range
        const filteredSlots = slotsData.filter(slot => {
          const slotDate = new Date(slot.start_time).toISOString().split('T')[0];
          return slotDate >= formattedStartDate && slotDate <= formattedEndDate;
        });
        
        setSlots(filteredSlots);
      } catch (err) {
        setError("Failed to load slots. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSlots();
  }, [currentDate, selectedServiceId]);
  
  // Group slots by date
  const getSlotsForDay = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day).toISOString().split('T')[0];
    return slots.filter(slot => {
      const slotDate = new Date(slot.start_time).toISOString().split('T')[0];
      return slotDate === date;
    });
  };
  
  // Prepare calendar days array
  const days = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Add days from previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    prevMonthDate.setDate(prevMonthDate.getDate() - (firstDayOfMonth - i - 1));
    
    const prevMonthDay = prevMonthDate.getDate();
    const prevMonthSlots = getSlotsForDay(
      prevMonthDate.getFullYear(),
      prevMonthDate.getMonth(),
      prevMonthDay
    );
    
    days.push({
      day: prevMonthDay,
      date: new Date(prevMonthDate),
      isCurrentMonth: false,
      hasEvents: prevMonthSlots.length > 0,
      slots: prevMonthSlots,
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const currentMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const daySlots = getSlotsForDay(currentDate.getFullYear(), currentDate.getMonth(), i);
    
    days.push({
      day: i,
      date: currentMonthDate,
      isCurrentMonth: true,
      isToday:
        i === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear(),
      hasEvents: daySlots.length > 0,
      slots: daySlots,
    });
  }
  
  // Next month days
  const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
    const nextMonthSlots = getSlotsForDay(
      nextMonthDate.getFullYear(),
      nextMonthDate.getMonth(),
      nextMonthDate.getDate()
    );
    
    days.push({
      day: i,
      date: nextMonthDate,
      isCurrentMonth: false,
      hasEvents: nextMonthSlots.length > 0,
      slots: nextMonthSlots,
    });
  }
  
  // Navigation functions
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };
  
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  
  const today = () => {
    setCurrentDate(new Date());
  };
  
  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };
  
  // Toggle slot availability
  const toggleSlotAvailability = async (slotId: string, currentAvailability: boolean) => {
    try {
      await slotService.updateSlotAvailability(slotId, !currentAvailability);
      
      // Update local state
      setSlots(prevSlots => 
        prevSlots.map(slot => 
          slot.id === slotId 
            ? { ...slot, is_available: !currentAvailability } 
            : slot
        )
      );
    } catch (err) {
      setError("Failed to update slot availability. Please try again.");
      console.error(err);
    }
  };
  
  // Render day view
  const renderDayView = () => {
    const today = new Date(currentDate);
    const daySlots = getSlotsForDay(today.getFullYear(), today.getMonth(), today.getDate());
    
    return (
      <div className="bg-white rounded-xl border shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4">
          {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h3>
        
        {daySlots.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No slots available for this day.</p>
        ) : (
          <div className="space-y-2">
            {daySlots.map(slot => (
              <div 
                key={slot.id} 
                className={`p-3 rounded border ${slot.is_available ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</p>
                    {/* {services.name && <p className="text-sm text-gray-600">{services.name}</p>} */}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleSlotAvailability(slot.id, slot.is_available)}
                  >
                    {slot.is_available ? 'Mark Unavailable' : 'Mark Available'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // Render week view
  const renderWeekView = () => {
    // Get first day of the week (Sunday)
    const firstDayOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    firstDayOfWeek.setDate(currentDate.getDate() - day);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      
      const daySlots = getSlotsForDay(date.getFullYear(), date.getMonth(), date.getDate());
      weekDays.push({
        date,
        slots: daySlots,
        isToday: 
          date.getDate() === new Date().getDate() &&
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear()
      });
    }
    
    return (
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className={`p-2 text-center ${day.isToday ? 'bg-blue-50' : 'bg-white'}`}
            >
              <p className="font-medium">{daysOfWeek[index]}</p>
              <p className={`text-sm ${day.isToday ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''}`}>
                {day.date.getDate()}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200 min-h-[400px]">
          {weekDays.map((day, index) => (
            <div key={index} className="bg-white p-1 overflow-y-auto max-h-[400px]">
              {day.slots.length > 0 ? (
                <div className="space-y-1">
                  {day.slots.map(slot => (
                    <div 
                      key={slot.id} 
                      className={`p-1 text-xs rounded ${slot.is_available ? 'bg-green-50' : 'bg-gray-50'}`}
                    >
                     <p className="font-medium">{`${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`}</p>
                      {slot.title && <p className="truncate">{slot.title}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center mt-2">No slots</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render month view
  const renderMonthView = () => (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="bg-gray-100 py-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-1 relative ${
              day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"
            } ${day.isToday ? "bg-blue-50" : ""}`}
          >
            <div className="flex justify-between">
              <span
                className={`text-sm font-medium ${
                  day.isToday
                    ? "bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center"
                    : ""
                }`}
              >
                {day.day}
              </span>
              
              {day.hasEvents && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              )}
            </div>
            
            {day.slots.length > 0 && day.isCurrentMonth && (
              <div className="mt-1 space-y-1 overflow-y-auto max-h-[70px]">
                {day.slots.slice(0, 2).map(slot => (
                  <div 
                    key={slot.id} 
                    className={`text-xs ${slot.is_available ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'} rounded p-1`}
                  >
                    {formatTime(slot.start_time)} {slot.title ? `- ${slot.title}` : ''}
                  </div>
                ))}
                {day.slots.length > 2 && (
                  <div className="text-xs text-gray-500 px-1">
                    +{day.slots.length - 2} more
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
  // Service selection handler
  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    
    // Reset slots while loading new service data
    setSlots([]);
    
    // If no service is selected, clear slots
    if (!serviceId) {
      return;
    }
  };
  
  // Render current view based on selection
  const renderCurrentView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
          <p>{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => {
              setError(null);
              // Re-trigger the useEffect
              setCurrentDate(new Date(currentDate));
            }}
          >
            Retry
          </Button>
        </div>
      );
    }
    
    switch (currentView) {
      case "day":
        return renderDayView();
      case "week":
        return renderWeekView();
      case "month":
      default:
        return renderMonthView();
    }
  };
  
  return (
    <Layout title="Calendar">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={today}
            >
              Today
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            {servicesLoading ? (
              <div className="flex items-center space-x-2">
                <Loader className="animate-spin h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Loading services...</span>
              </div>
            ) : servicesError ? (
              <div className="text-red-500 text-sm flex items-center space-x-2">
                <span>{servicesError}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setServicesError(null);
                    setServicesLoading(true);
                    serviceService.getUserServices()
                      .then(data => {
                        setServices(data);
                        if (data.length > 0) setSelectedServiceId(data[0].id);
                      })
                      .catch(err => setServicesError("Failed to load services."))
                      .finally(() => setServicesLoading(false));
                  }}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <select 
                className="border rounded-md px-2 py-1 text-sm"
                value={selectedServiceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                disabled={services.length === 0}
              >
                {services.length === 0 ? (
                  <option>No services available</option>
                ) : (
                  <>
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            )}
            
            <div className="border rounded-md overflow-hidden flex">
              <Button 
                variant={currentView === "day" ? "default" : "ghost"}
                className={`rounded-none ${currentView === "day" ? "bg-primary text-white" : ""}`}
                onClick={() => setCurrentView("day")}
              >
                Day
              </Button>
              <Button 
                variant={currentView === "week" ? "default" : "ghost"}
                className={`rounded-none ${currentView === "week" ? "bg-primary text-white" : ""}`}
                onClick={() => setCurrentView("week")}
              >
                Week
              </Button>
              <Button 
                variant={currentView === "month" ? "default" : "ghost"}
                className={`rounded-none ${currentView === "month" ? "bg-primary text-white" : ""}`}
                onClick={() => setCurrentView("month")}
              >
                Month
              </Button>
            </div>
          </div>
        </div>
        
        {renderCurrentView()}
      </div>
    </Layout>
  );
};

export default Calendar;