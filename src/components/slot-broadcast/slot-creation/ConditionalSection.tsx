
import React from "react";

interface ConditionalSectionProps {
  show: boolean;
  children: React.ReactNode;
}

const ConditionalSection: React.FC<ConditionalSectionProps> = ({ show, children }) => {
  if (!show) return null;
  return <>{children}</>;
};

export default ConditionalSection;
