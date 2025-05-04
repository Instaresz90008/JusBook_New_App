
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate("/")}
      className="flex items-center gap-1 cursor-pointer"
    >
      <div className="flex items-center justify-center bg-primary text-white font-semibold rounded-md px-2 py-1 text-xs">
        <span>Tara</span>
      </div>
      <span className="text-xs font-medium bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
        AI Assistant
      </span>
    </div>
  );
};

export default Logo;
