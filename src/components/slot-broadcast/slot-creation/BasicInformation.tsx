
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BasicInformationProps {
  tag: string;
  setTag: (tag: string) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const BasicInformation = ({
  tag,
  setTag,
  title,
  setTitle,
  description,
  setDescription,
}: BasicInformationProps) => {
  return (
    <div className="bg-white rounded-lg border p-5">
      <h3 className="font-medium text-lg mb-4">Basic Information</h3>
      
      {/* Tag field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tag {tag.length}/50 Characters</label>
        <Input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter a tag"
          maxLength={50}
          className="w-full"
        />
      </div>
      
      {/* Title field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title {title.length}/50 Characters</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g., Sales Call - 30 min"
          maxLength={50}
          className="w-full"
        />
      </div>
      
      {/* Description field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description {description.length}/255 Characters</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
          maxLength={255}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default BasicInformation;
