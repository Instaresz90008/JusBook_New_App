
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Search,
  Edit,
  Trash2,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock event data
const EVENTS = [
  {
    id: "EV-10000",
    serviceName: "Legal Advice",
    clientName: "Client 1",
    contactNumber: "(838) 863-8835",
    appointmentDate: "30-04-2025",
    startTime: "19:00 PM",
    endTime: "19:30 PM",
    meetingType: "Review",
    clientTimeZone: "UTC-8 (PST)",
    status: "No-Show",
  },
  {
    id: "EV-10001",
    serviceName: "Legal Advice",
    clientName: "Client 2",
    contactNumber: "(400) 436-4116",
    appointmentDate: "08-05-2025",
    startTime: "19:30 PM",
    endTime: "18:00 PM",
    meetingType: "Follow-up",
    clientTimeZone: "UTC+0 (GMT)",
    status: "Scheduled",
  },
  {
    id: "EV-10002",
    serviceName: "Legal Advice",
    clientName: "Client 3",
    contactNumber: "(733) 298-5796",
    appointmentDate: "11-05-2025",
    startTime: "18:00 PM",
    endTime: "18:30 PM",
    meetingType: "Follow-up",
    clientTimeZone: "UTC-8 (PST)",
    status: "Cancelled",
  },
  {
    id: "EV-10003",
    serviceName: "Financial Planning",
    clientName: "Client 4",
    contactNumber: "(662) 619-1021",
    appointmentDate: "02-05-2025",
    startTime: "18:30 PM",
    endTime: "17:00 PM",
    meetingType: "Initial Assessment",
    clientTimeZone: "UTC+8 (CST)",
    status: "Cancelled",
  },
  {
    id: "EV-10004",
    serviceName: "Technical Support",
    clientName: "Client 5",
    contactNumber: "(105) 735-7109",
    appointmentDate: "11-05-2025",
    startTime: "17:00 PM",
    endTime: "17:30 PM",
    meetingType: "Initial Assessment",
    clientTimeZone: "UTC+0 (GMT)",
    status: "Cancelled",
  },
];

const EventManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filter events based on search query
  const filteredEvents = EVENTS.filter((event) => {
    const searchString = searchQuery.toLowerCase();
    return (
      event.id.toLowerCase().includes(searchString) ||
      event.serviceName.toLowerCase().includes(searchString) ||
      event.clientName.toLowerCase().includes(searchString) ||
      event.status.toLowerCase().includes(searchString)
    );
  });
  
  const totalPages = Math.ceil(filteredEvents.length / rowsPerPage);
  
  return (
    <Layout title="Event Management Dashboard">
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 justify-between mb-4">
            <div className="flex gap-2">
              <Button variant="outline">
                All <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              
              <Button variant="outline">
                Open Availability History <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                MORE FILTER
              </Button>
            </div>
            
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
          
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="whitespace-nowrap">
                    Event ID <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Service Name <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Client Name <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Contact Number <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Appointment Date <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Start Time <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    End Time <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Meeting Type <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Client Time Zone <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Status <ArrowDown className="inline-block h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id} className="hover:bg-gray-50">
                    <TableCell className="whitespace-nowrap font-medium">{event.id}</TableCell>
                    <TableCell className="whitespace-nowrap">{event.serviceName}</TableCell>
                    <TableCell className="whitespace-nowrap">{event.clientName}</TableCell>
                    <TableCell className="whitespace-nowrap">{event.contactNumber}</TableCell>
                    <TableCell className="whitespace-nowrap">{event.appointmentDate}</TableCell>
                    <TableCell className="whitespace-nowrap">{event.startTime}</TableCell>
                    <TableCell className="whitespace-nowrap">{event.endTime}</TableCell>
                    <TableCell className="whitespace-nowrap">{event.meetingType}</TableCell>
                    <TableCell className="whitespace-nowrap">{event.clientTimeZone}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span 
                        className={`status-badge ${
                          event.status === "Scheduled" ? "status-scheduled" :
                          event.status === "Cancelled" ? "status-cancelled" :
                          event.status === "Completed" ? "status-completed" :
                          "status-no-show"
                        }`}
                      >
                        {event.status}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
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
                  onClick={() => 
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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

// Helper component for dropdown icon
const ChevronDown = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className}
  >
    <path 
      fillRule="evenodd" 
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
      clipRule="evenodd" 
    />
  </svg>
);

export default EventManagement;
