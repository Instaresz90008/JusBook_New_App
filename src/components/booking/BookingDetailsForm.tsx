
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, MessageSquare, Phone, Globe } from "lucide-react";

interface BookingDetailsFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  purpose: string;
  setPurpose: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  countryCode: string;
  setCountryCode: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  nameCharLimit: number;
  purposeCharLimit: number;
  timezones: string[];
  countryCodes: { code: string; country: string }[];
}

const BookingDetailsForm = ({
  name,
  setName,
  email,
  setEmail,
  purpose,
  setPurpose,
  phoneNumber,
  setPhoneNumber,
  countryCode,
  setCountryCode,
  timezone,
  setTimezone,
  nameCharLimit,
  purposeCharLimit,
  timezones,
  countryCodes
}: BookingDetailsFormProps) => {
  return (
    <div className="grid gap-6">
      <div>
        <label className="flex justify-between text-sm font-medium mb-1.5">
          <span className="flex items-center">
            <User className="h-4 w-4 mr-2 text-blue-600" />
            Name
          </span>
          <span className="text-xs text-gray-400">{name.length}/{nameCharLimit} Characters</span>
        </label>
        <Input 
          value={name} 
          onChange={(e) => setName(e.target.value.slice(0, nameCharLimit))} 
          placeholder="Your name" 
          className="w-full border-gray-200 focus-within:border-blue-400 transition-colors"
        />
      </div>

      <div>
        <label className="flex justify-between text-sm font-medium mb-1.5">
          <span className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
            Meeting Purpose
          </span>
          <span className="text-xs text-gray-400">{purpose.length}/{purposeCharLimit} Characters</span>
        </label>
        <Input 
          value={purpose} 
          onChange={(e) => setPurpose(e.target.value.slice(0, purposeCharLimit))} 
          placeholder="Brief description of meeting purpose" 
          className="w-full border-gray-200 focus-within:border-blue-400 transition-colors"
        />
      </div>

      <div>
        <label className="flex items-center text-sm font-medium mb-1.5">
          <Mail className="h-4 w-4 mr-2 text-blue-600" />
          Email
        </label>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="you@example.com" 
          className="w-full border-gray-200 focus-within:border-blue-400 transition-colors"
        />
      </div>

      <div>
        <label className="flex items-center text-sm font-medium mb-1.5">
          <Phone className="h-4 w-4 mr-2 text-blue-600" />
          Mobile Number
        </label>
        <div className="flex">
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger className="w-[100px] mr-2 border-gray-200">
              <SelectValue placeholder="Code" />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} ({c.country})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input 
            type="tel" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            placeholder="Phone number" 
            className="flex-1 border-gray-200 focus-within:border-blue-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium mb-1.5">
          <Globe className="h-4 w-4 mr-2 text-blue-600" />
          Timezone
        </label>
        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger className="w-full border-gray-200 focus-within:border-blue-400 transition-colors">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((tz) => (
              <SelectItem key={tz} value={tz}>{tz.replace('_', ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BookingDetailsForm;
