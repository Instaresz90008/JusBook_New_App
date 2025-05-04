
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  FileText,
} from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock history data
const HISTORY_DATA = [
  {
    id: "LOG-1001",
    date: "29-04-2025",
    time: "14:30:22",
    action: "Slot Created",
    details: "Created a new slot for Tuesday at 10:00 AM",
    user: "Anilkumar",
  },
  {
    id: "LOG-1002",
    date: "29-04-2025",
    time: "14:32:15",
    action: "Availability Updated",
    details: "Updated availability for May 1st-7th",
    user: "Anilkumar",
  },
  {
    id: "LOG-1003",
    date: "29-04-2025",
    time: "15:45:08",
    action: "Booking Confirmed",
    details: "Client booking confirmed for May 2nd at 2:00 PM",
    user: "System",
  },
  {
    id: "LOG-1004",
    date: "28-04-2025",
    time: "09:12:33",
    action: "Meeting Canceled",
    details: "Client canceled meeting scheduled for April 30th",
    user: "System",
  },
  {
    id: "LOG-1005",
    date: "28-04-2025",
    time: "10:05:17",
    action: "Email Notification",
    details: "Reminder email sent to clients for upcoming meetings",
    user: "System",
  },
];

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: new Date(new Date().setDate(new Date().getDate() - 7)),
    end: new Date(),
  });

  // Filter history data based on search query
  const filteredData = HISTORY_DATA.filter((item) => {
    const searchString = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(searchString) ||
      item.action.toLowerCase().includes(searchString) ||
      item.details.toLowerCase().includes(searchString) ||
      item.user.toLowerCase().includes(searchString)
    );
  });
  
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <Layout title="History">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Date Range:</span>
              <Button variant="outline" className="flex items-center text-sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Last 7 days
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Activity Type:</span>
              <Button variant="outline" className="flex items-center text-sm">
                All Activities
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export
            </Button>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-9 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="w-full">Details</TableHead>
                  <TableHead>User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {item.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {item.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {item.action}
                      </span>
                    </TableCell>
                    <TableCell>{item.details}</TableCell>
                    <TableCell>{item.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
            <div className="flex items-center">
              <span className="mr-2 text-sm">Rows per page:</span>
              <select
                className="border rounded p-1 text-sm"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="mr-4 text-sm">Page {currentPage} of {totalPages}</span>
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
