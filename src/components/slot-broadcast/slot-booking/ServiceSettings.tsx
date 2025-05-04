
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DateSelector from "../date/DateSelector";

interface ServiceSettingsProps {
  date: Date;
  setDate: (date: Date) => void;
  service: string;
  setService: (service: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  email: string;
  setEmail: (email: string) => void;
  serviceOptions: { id: string; name: string }[];
  durations: string[];
  hideEmail?: boolean;
}

const ServiceSettings = ({
  date,
  setDate,
  service,
  setService,
  duration,
  setDuration,
  email,
  setEmail,
  serviceOptions,
  durations,
  hideEmail = false
}: ServiceSettingsProps) => {
  return (
    <>
      {/* Date picker */}
      <DateSelector date={date} setDate={setDate} />

      {/* Service selector */}
      <Select value={service} onValueChange={setService}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select service" />
        </SelectTrigger>
        <SelectContent>
          {serviceOptions.map(option => (
            <SelectItem key={option.id} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Duration */}
      <Select value={duration} onValueChange={setDuration}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          {durations.map(time => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Email - only show if not hidden */}
      {!hideEmail && (
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white"
        />
      )}
    </>
  );
};

export default ServiceSettings;
