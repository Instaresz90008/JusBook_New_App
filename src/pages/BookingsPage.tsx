
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { logger } from "@/utils/logger";

interface Booking {
  id: string;
  customerName: string;
  serviceTitle: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // This would be replaced with actual API calls
  useEffect(() => {
    if (isAuthenticated) {
      // Mock data for demonstration
      const mockBookings: Booking[] = [
        {
          id: "1",
          customerName: "John Doe",
          serviceTitle: "Consultation Call",
          date: "2025-05-05",
          time: "10:00 AM",
          status: "confirmed"
        },
        {
          id: "2",
          customerName: "Jane Smith",
          serviceTitle: "Strategy Session",
          date: "2025-05-10",
          time: "2:00 PM",
          status: "pending"
        }
      ];
      
      setBookings(mockBookings);
      logger.info("Bookings page loaded, fetched mock bookings", { 
        module: "pages",
        data: { count: mockBookings.length }
      });
    }
  }, [isAuthenticated]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Bookings">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid gap-4">
              {bookings.length > 0 ? (
                bookings
                  .filter(booking => booking.status !== 'cancelled')
                  .map(booking => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{booking.serviceTitle}</CardTitle>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Customer</p>
                            <p className="font-medium">{booking.customerName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">{booking.date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-medium">{booking.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="destructive" size="sm">Cancel</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No upcoming bookings found</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No past bookings found</p>
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No cancelled bookings found</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BookingsPage;
