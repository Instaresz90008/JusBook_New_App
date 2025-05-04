
import React from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { ChartPie, TrendingUp, DollarSign } from "lucide-react";
import { format, subDays } from "date-fns";

// Sample data for the weekly trends chart
const generateWeeklyData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      date: format(date, "MMM dd"),
      bookings: Math.floor(Math.random() * 8) + 1,
      inquiries: Math.floor(Math.random() * 5) + 1
    };
  });
};

// Sample data for the payment chart
const PAYMENT_DATA = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 900 },
  { name: 'Wed', revenue: 1500 },
  { name: 'Thu', revenue: 1800 },
  { name: 'Fri', revenue: 2400 },
  { name: 'Sat', revenue: 1300 },
  { name: 'Sun', revenue: 800 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];

const DashboardCharts = () => {
  const weeklyData = generateWeeklyData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Weekly Booking Trends Chart */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Weekly Booking Trends</h3>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weeklyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#9b87f5" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
                name="Bookings"
              />
              <Line 
                type="monotone" 
                dataKey="inquiries" 
                stroke="#7E69AB" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
                name="Inquiries"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Revenue Chart */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center mb-4">
          <DollarSign className="h-5 w-5 text-green-500 mr-2" />
          <h3 className="text-lg font-semibold">Payment Revenue</h3>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={PAYMENT_DATA}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Revenue']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
              />
              <Bar dataKey="revenue" fill="#4ade80">
                {PAYMENT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
