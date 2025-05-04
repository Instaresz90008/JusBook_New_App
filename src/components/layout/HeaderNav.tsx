
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { label: "Calendar", path: "/calendar" },
    { label: "Tasks", path: "/event-management" },
    { label: "Analytics", path: "/history" },
  ];
  
  return (
    <div className="hidden md:flex items-center gap-1">
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          size="sm"
          className={`text-[10px] rounded-full px-2.5 py-0.5 h-6 ${location.pathname === item.path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default HeaderNav;
