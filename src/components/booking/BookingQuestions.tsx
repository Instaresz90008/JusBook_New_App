
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Mock questions - in a real app, these would be fetched based on the service
const MOCK_QUESTIONS = [
  {
    id: "q1",
    type: "text",
    question: "What topics would you like to discuss during our call?",
    required: true
  },
  {
    id: "q2",
    type: "radio",
    question: "How did you hear about us?",
    options: ["Social Media", "Search Engine", "Referral", "Other"],
    required: false
  },
  {
    id: "q3",
    type: "checkbox",
    question: "Which of our products are you interested in?",
    options: ["Product A", "Product B", "Product C", "Not sure yet"],
    required: false
  }
];

const BookingQuestions = () => {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleTextAnswer = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleRadioAnswer = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleCheckboxAnswer = (questionId: string, option: string, checked: boolean) => {
    const currentSelections = answers[questionId] || [];
    let newSelections;
    
    if (checked) {
      newSelections = [...currentSelections, option];
    } else {
      newSelections = currentSelections.filter((item: string) => item !== option);
    }
    
    setAnswers({
      ...answers,
      [questionId]: newSelections
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-medium">Additional Information</h2>
      <p className="text-gray-600">
        Please provide some additional information to help prepare for your meeting.
      </p>

      <div className="space-y-6">
        {MOCK_QUESTIONS.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label className="text-base">
              {question.question}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            {question.type === "text" && (
              <Textarea
                placeholder="Type your answer here..."
                value={answers[question.id] || ""}
                onChange={(e) => handleTextAnswer(question.id, e.target.value)}
                className="min-h-[100px]"
              />
            )}

            {question.type === "radio" && (
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleRadioAnswer(question.id, value)}
              >
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                      <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {question.type === "checkbox" && (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option}`}
                      checked={(answers[question.id] || []).includes(option)}
                      onCheckedChange={(checked) => 
                        handleCheckboxAnswer(question.id, option, checked === true)
                      }
                    />
                    <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingQuestions;
