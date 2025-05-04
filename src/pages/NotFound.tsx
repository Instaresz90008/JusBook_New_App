
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import BackgroundAnimation from "@/components/theme/BackgroundAnimation";
import { useTheme } from "@/components/theme/ThemeProvider";

const NotFound = () => {
  const location = useLocation();
  const { animationEnabled } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100/80 backdrop-blur-[2px]">
      <BackgroundAnimation />
      <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-gray-700 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <a 
          href="/" 
          className="text-primary hover:text-primary/90 underline transition-colors font-medium"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
