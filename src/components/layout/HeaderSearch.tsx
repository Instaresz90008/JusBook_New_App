
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const HeaderSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={cn(
      "relative hidden md:block transition-all duration-200",
      isFocused ? "w-72" : "w-64"
    )}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input 
        type="text" 
        placeholder="Search..." 
        className="pl-10 pr-4 py-2 h-9 border rounded-full"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default HeaderSearch;
