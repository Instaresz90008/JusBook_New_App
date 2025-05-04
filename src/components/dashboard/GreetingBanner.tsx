
import { Sun, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GreetingBanner = () => {
  const [greeting, setGreeting] = useState("Good day");
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    // In a real app, fetch the user's name from API or context
    setUserName("Anilkumar");
  }, []);
  
  const handleCreateService = () => {
    navigate("/service-creation");
  };
  
  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-200">
      <div className="flex items-center">
        <Sun className="text-yellow-500 h-6 w-6 mr-3" />
        <h2 className="text-lg font-medium">{`${greeting} ${userName}!`}</h2>
      </div>
      
      <div className="flex items-center">
        <div className="hidden md:flex items-center mr-3 text-sm text-muted-foreground">
          <PlusCircle className="h-4 w-4 mr-1 text-primary" />
          <span>Ready to broadcast your services?</span>
        </div>
        <Button 
          onClick={handleCreateService} 
          size="sm"
          className="whitespace-nowrap"
        >
          Create Services
        </Button>
      </div>
    </div>
  );
};

export default GreetingBanner;
