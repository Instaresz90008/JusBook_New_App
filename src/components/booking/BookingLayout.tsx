
import { ReactNode, useEffect } from "react";
import { Globe, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BookingHeader from "./BookingHeader";
import BookingMetadata from "./BookingMetadata";
import BackgroundAnimation from "@/components/theme/BackgroundAnimation";
import { useTheme } from "@/components/theme/ThemeProvider";

interface BookingLayoutProps {
  children: ReactNode;
  title: string;
  timezones: string[];
  timezone: string;
  setTimezone: (timezone: string) => void;
  serviceProviderName: string;
  serviceName: string;
  serviceSubtitle: string;
  currentStep: number;
  serviceData: {
    duration: string;
    additionalInfo: string;
  };
}

const BookingLayout = ({ 
  children, 
  title,
  timezones,
  timezone,
  setTimezone,
  serviceProviderName,
  serviceName,
  serviceSubtitle,
  currentStep,
  serviceData
}: BookingLayoutProps) => {
  const navigate = useNavigate();
  const { animationEnabled } = useTheme();
  
  // Effect to set body classes based on animation state
  useEffect(() => {
    if (animationEnabled) {
      document.body.classList.add('has-animations');
    } else {
      document.body.classList.remove('has-animations');
    }
    return () => {
      document.body.classList.remove('has-animations');
    };
  }, [animationEnabled]);

  return (
    <div className="flex min-h-screen bg-gray-50 antialiased">
      <BackgroundAnimation />
      {/* Left sidebar */}
      <div className="hidden md:block w-[280px] lg:w-[320px] bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="h-full flex flex-col p-6">
          <BookingHeader
            serviceProviderName={serviceProviderName}
            serviceName={serviceName}
            serviceSubtitle={serviceSubtitle}
          />
          
          <div className="bg-white/20 h-px w-full my-5" />
          
          <BookingMetadata
            duration={serviceData.duration}
            additionalInfo={serviceData.additionalInfo}
          />

          {/* Step indicator (only visible on larger screens) */}
          <div className="mt-auto">
            <div className="flex items-center justify-between px-3 py-2.5 bg-blue-700/30 backdrop-blur-sm rounded-lg">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    currentStep === step
                      ? "bg-white text-blue-700 font-medium ring-4 ring-white/30"
                      : currentStep > step 
                      ? "bg-white text-blue-700 font-medium"
                      : "bg-blue-500/40 text-white/70"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] mt-1.5 px-2 text-blue-200">
              <span>Details</span>
              <span>Information</span>
              <span>Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 flex justify-between items-center border-b border-gray-200 py-3 px-4 md:px-6 bg-white/80 backdrop-blur-sm shadow-sm">
          {/* Back button and mobile logo */}
          <div className="flex items-center gap-2.5">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-8 w-8" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center md:hidden">
              <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white mr-2.5">
                <span className="text-base font-bold">EH</span>
              </div>
              <h2 className="text-base font-medium">{serviceName}</h2>
            </div>
          </div>
          
          <h2 className="text-base font-medium hidden md:block">{title}</h2>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Globe className="h-3.5 w-3.5" />
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="border-0 p-0 h-auto bg-transparent w-auto text-xs">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz} className="text-xs">{tz.replace('_', ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 pb-14 bg-gray-50/80 backdrop-blur-[2px]">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingLayout;
