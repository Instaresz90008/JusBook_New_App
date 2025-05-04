
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/routes/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import Calendar from "@/pages/Calendar";
import SlotBroadcast from "@/pages/SlotBroadcast";
import Settings from "@/pages/Settings";
import EventManagement from "@/pages/EventManagement";
import BookingPage from "@/pages/BookingPage";
import ServiceCreation from "@/pages/ServiceCreation";
import UpgradePage from "@/pages/UpgradePage";
import VoiceAssistant from "@/pages/VoiceAssistant";
import History from "@/pages/History";
import Help from "@/pages/Help";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ConversationHistory from "@/pages/ConversationHistory";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import BookingsPage from "@/pages/BookingsPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light-purple" storageKey="ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Register />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/slot-broadcast/*" 
              element={
                <ProtectedRoute>
                  <SlotBroadcast />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings/*" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/event-management" 
              element={
                <ProtectedRoute>
                  <EventManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/booking" 
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings" 
              element={
                <ProtectedRoute>
                  <BookingsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/service-creation" 
              element={
                <ProtectedRoute>
                  <ServiceCreation />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/upgrade" 
              element={
                <ProtectedRoute>
                  <UpgradePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/voice-assistant" 
              element={
                <ProtectedRoute>
                  <VoiceAssistant />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/conversations" 
              element={
                <ProtectedRoute>
                  <ConversationHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/help" 
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
