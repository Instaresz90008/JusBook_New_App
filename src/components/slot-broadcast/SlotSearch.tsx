
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SlotSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SlotSearch = ({ searchTerm, onSearchChange }: SlotSearchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Input 
          placeholder="Search slots..." 
          className="pl-8" 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
      </div>
      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SlotSearch;
