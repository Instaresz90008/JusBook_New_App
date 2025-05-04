
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SlotCard from "./SlotCard";
import QRCodeDialog from "./QRCodeDialog";
import SlotSearch from "./SlotSearch";
import { Slot } from "@/types/slot";
import { Service } from "@/types/service";
import slotService from "@/services/slotService";
import serviceService from "@/services/serviceService";
import { toast } from "sonner";

// Format the slot data for display
interface DisplaySlot {
  id: string;
  name: string;
  service: string;
  serviceCost: number;
  days: Record<string, boolean>;
  startTime: string;
  endTime: string;
  createdAt: string;
  bookingLink: string;
}

const SlotManagement = () => {
  const [slots, setSlots] = useState<DisplaySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<DisplaySlot | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get services first
        const services = await serviceService.getUserServices();
        if (services.length === 0) {
          setLoading(false);
          return;
        }
        
        // For each service, get its slots
        const allSlots: DisplaySlot[] = [];
        
        for (const service of services) {
          try {
            const serviceSlots = await slotService.getServiceSlots(service.id);
            
            // Group slots by date
            const slotsByDate = serviceSlots.reduce<Record<string, Slot[]>>((acc, slot) => {
              if (!acc[slot.slot_date]) {
                acc[slot.slot_date] = [];
              }
              acc[slot.slot_date].push(slot);
              return acc;
            }, {});
            
            // Create display slots
            Object.entries(slotsByDate).forEach(([date, dateSlots]) => {
              // Get the earliest and latest times for this date group
              const startTime = dateSlots.reduce((earliest, slot) => 
                slot.start_time < earliest ? slot.start_time : earliest, 
                dateSlots[0].start_time
              );
              
              const endTime = dateSlots.reduce((latest, slot) => 
                slot.end_time > latest ? slot.end_time : latest, 
                dateSlots[0].end_time
              );
              
              // Create a days object (only the dates with slots are true)
              const days: Record<string, boolean> = {
                Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false
              };
              
              // Mark the day of week for this date as true
              const dayOfWeek = new Date(date).toLocaleString('en-us', {weekday: 'short'});
              days[dayOfWeek.substring(0, 3)] = true;
              
              // Create the display slot
              allSlots.push({
                id: dateSlots[0].id, // Use the first slot ID as the group ID
                name: `${service.name} - ${new Date(date).toLocaleDateString()}`,
                service: service.name,
                serviceCost: service.cost_factor,
                days,
                startTime,
                endTime,
                createdAt: dateSlots[0].created_at,
                bookingLink: dateSlots[0].booking_link || `slot-${service.id}-${date}`
              });
            });
          } catch (error) {
            console.error(`Error fetching slots for service ${service.id}:`, error);
          }
        }
        
        setSlots(allSlots);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load slot data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Function to show QR code dialog
  const showQRCode = (slot: DisplaySlot) => {
    setSelectedSlot(slot);
    setIsQRDialogOpen(true);
  };

  // Filter slots based on search term
  const filteredSlots = searchTerm 
    ? slots.filter(slot => 
        slot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.service.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : slots;

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Saved Slot Configurations</h3>
        <SlotSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Loading slot configurations...</p>
            </CardContent>
          </Card>
        ) : filteredSlots.length > 0 ? (
          filteredSlots.map((slot) => (
            <SlotCard 
              key={slot.id} 
              slot={slot} 
              onShowQRCode={showQRCode} 
            />
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? 'No slots found matching your search.' : 'No slots have been created yet.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* QR Code Dialog */}
      <QRCodeDialog 
        selectedSlot={selectedSlot} 
        open={isQRDialogOpen} 
        onOpenChange={setIsQRDialogOpen} 
      />
    </div>
  );
};

export default SlotManagement;
