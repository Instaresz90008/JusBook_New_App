
import { Bell, Mic, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import HeaderSearch from "./HeaderSearch";
import HeaderNav from "./HeaderNav";
import HeaderActions from "./HeaderActions";
import { useToast } from "@/hooks/use-toast";

const Header = ({ title, children }: { title: string; children?: ReactNode }) => {
  const { toast } = useToast();

  const handleMicClick = () => {
    toast({
      title: "Tara",
      description: "Tara is coming soon!",
    });
  };

  return (
    <header className="flex items-center justify-between bg-card px-4 py-2 border-b border-border h-12">
      <div className="flex items-center space-x-2.5">
        {children}
        <h1 className="text-sm font-medium text-foreground">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <HeaderNav />
        <HeaderSearch />
        <HeaderActions onMicClick={handleMicClick} />
      </div>
    </header>
  );
};

export default Header;
