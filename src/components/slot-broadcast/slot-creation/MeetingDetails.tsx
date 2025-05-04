
import { Video, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface MeetingDetailsProps {
  meetingType: string;
  setMeetingType: (type: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  showCommentBox: boolean;
  setShowCommentBox: (show: boolean) => void;
  emailVisibility: boolean;
  setEmailVisibility: (visible: boolean) => void;
}

const MeetingDetails = ({
  meetingType,
  setMeetingType,
  duration,
  setDuration,
  showCommentBox,
  setShowCommentBox,
  emailVisibility,
  setEmailVisibility
}: MeetingDetailsProps) => {
  const meetingTypes = ["Video", "In Person", "Phone Call", "Google Meet", "Zoom", "Microsoft Teams"];
  const durations = ["15 Mins", "30 Mins", "45 Mins", "60 Mins", "90 Mins", "120 Mins"];

  return (
    <div className="bg-white rounded-lg border p-5">
      <h3 className="font-medium text-lg mb-4">Meeting Details</h3>
      
      {/* Meeting Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
        <Select value={meetingType} onValueChange={setMeetingType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select meeting type" />
          </SelectTrigger>
          <SelectContent>
            {meetingTypes.map((type) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-gray-500" />
                  {type}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Duration */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {durations.map((time) => (
              <SelectItem key={time} value={time}>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  {time}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Checkboxes for options */}
      <div className="flex flex-col space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="showCommentBox" 
            checked={showCommentBox} 
            onCheckedChange={(checked) => setShowCommentBox(checked as boolean)}
          />
          <label htmlFor="showCommentBox" className="text-sm">Show Comment Box</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="emailVisibility" 
            checked={emailVisibility} 
            onCheckedChange={(checked) => setEmailVisibility(checked as boolean)}
          />
          <label htmlFor="emailVisibility" className="text-sm">Email visibility to the public</label>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
