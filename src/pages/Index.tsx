
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import GreetingBanner from "@/components/dashboard/GreetingBanner";
import AvailabilityCard from "@/components/dashboard/AvailabilityCard";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import { Calendar, Clock, Bell, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
  return (
    <Layout title="Event Hub Dashboard">
      <div className="space-y-5">
        {/* Greeting Banner with CTA */}
        <GreetingBanner />
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <StatCard 
            title="Total Bookings" 
            value="0" 
            icon={<Calendar className="h-4 w-4 text-primary" />} 
            subtitle="This week"
            iconBackground="bg-primary/10"
          />
          <StatCard 
            title="Available Hours" 
            value="48h" 
            icon={<Clock className="h-4 w-4 text-blue-500" />} 
            subtitle="Out of 40h this week"
            iconBackground="bg-blue-100"
          />
          <StatCard 
            title="Unique Clients" 
            value="0" 
            icon={<Users className="h-4 w-4 text-green-500" />} 
            subtitle="This month"
            iconBackground="bg-green-100"
          />
          <StatCard 
            title="Pending Requests" 
            value="0" 
            icon={<Bell className="h-4 w-4 text-yellow-500" />} 
            subtitle="Needs attention"
            iconBackground="bg-yellow-100"
          />
          <StatCard 
            title="Slots Booked" 
            value="14%" 
            icon={<DollarSign className="h-4 w-4 text-purple-500" />} 
            subtitle="This week"
            iconBackground="bg-purple-100"
          />
        </div>
        
        {/* Charts Section */}
        <DashboardCharts />
        
        {/* Calendar and availability */}
        <div className="space-y-5">
          {/* Availability Overview */}
          <AvailabilityCard />
        </div>
        
        {/* Upcoming Events at the bottom */}
        <div className="mt-5">
          <UpcomingEvents />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
