
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaraVoiceAssistant from "@/components/voice-assistant/TaraVoiceAssistant";

const VoiceAssistant = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout title="Tara">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          onClick={goBack} 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <TaraVoiceAssistant />
      </div>
    </Layout>
  );
};

export default VoiceAssistant;
