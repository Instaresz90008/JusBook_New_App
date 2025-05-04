
import React from "react";

interface ApiStatusIndicatorProps {
  status?: "connected" | "disconnected" | "error";
}

const ApiStatusIndicator: React.FC<ApiStatusIndicatorProps> = ({ 
  status = "connected" 
}) => {
  return (
    <div className="flex items-center mb-4 text-xs">
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${
          status === "connected" ? "bg-green-500" : 
          status === "error" ? "bg-red-500" : "bg-yellow-500"
        } mr-1`}></div>
        <span className={`${
          status === "connected" ? "text-green-400 dark:text-green-300" : 
          status === "error" ? "text-red-400 dark:text-red-300" : "text-yellow-400 dark:text-yellow-300"
        }`}>API Connection: http://localhost:4000</span>
      </div>
    </div>
  );
};

export default ApiStatusIndicator;
