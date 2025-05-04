
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuestionsSectionProps {
  questions: string[];
  setQuestions: (questions: string[]) => void;
}

const QuestionsSection = ({ questions, setQuestions }: QuestionsSectionProps) => {
  const handleSelectQuestion = (value: string) => {
    if (!questions.includes(value)) {
      setQuestions([...questions, value]);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-5">
      <h3 className="font-medium text-lg mb-4">Questions</h3>
      
      {/* Questions */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Questions</label>
        <Select onValueChange={handleSelectQuestion}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select questions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">What's your name?</SelectItem>
            <SelectItem value="company">What company are you from?</SelectItem>
            <SelectItem value="purpose">What's the purpose of this meeting?</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {questions.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium mb-2">Selected Questions:</p>
          <ul className="list-disc pl-5">
            {questions.map((q, i) => (
              <li key={i} className="text-sm">{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionsSection;
