
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle: string;
  iconBackground?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  subtitle,
  iconBackground = "bg-primary/10"
}: StatCardProps) => {
  return (
    <div className="stat-card hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-white to-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`${iconBackground} p-2 rounded-md`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
