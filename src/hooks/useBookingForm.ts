
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import bookingService from '@/services/bookingService';

export const useBookingForm = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [timezone, setTimezone] = useState('America/New_York');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // Validation configuration
  const nameCharLimit = 100;
  const purposeCharLimit = 250;
  
  // Constants
  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];
  
  const countryCodes = [
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+61', country: 'AU' },
    { code: '+86', country: 'CN' },
    { code: '+49', country: 'DE' },
    { code: '+81', country: 'JP' },
  ];
  
  // Form navigation
  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, totalSteps]);
  
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);
  
  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!name || !email || !selectedDate || !selectedTime || !selectedService) {
      toast.error('Please complete all required fields before submitting');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const bookingData = {
        customerName: name,
        customerEmail: email,
        customerPhone: `${countryCode}${phoneNumber}`,
        purpose,
        serviceId: selectedService,
        date: selectedDate?.toISOString().split('T')[0],
        time: selectedTime,
        timezone,
        additionalInfo
      };
      
      // Call the booking service to create a booking
      const booking = await bookingService.createBooking(bookingData);
      
      toast.success('Booking created successfully!');
      nextStep(); // Move to confirmation step
      
      return booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    name, email, phoneNumber, countryCode, purpose,
    selectedService, selectedDate, selectedTime, timezone,
    additionalInfo, nextStep
  ]);
  
  return {
    // Form fields
    name, setName,
    email, setEmail,
    purpose, setPurpose,
    phoneNumber, setPhoneNumber,
    countryCode, setCountryCode,
    timezone, setTimezone,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    selectedService, setSelectedService,
    additionalInfo, setAdditionalInfo,
    
    // Step management
    currentStep, setCurrentStep,
    totalSteps,
    nextStep, prevStep,
    
    // Submission
    handleSubmit,
    isSubmitting,
    
    // Configuration
    nameCharLimit,
    purposeCharLimit,
    timezones,
    countryCodes
  };
};

export default useBookingForm;
