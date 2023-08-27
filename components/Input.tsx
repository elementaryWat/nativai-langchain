import { Grid } from "@mui/material";
import AudioRecorder from "./AudioRecorder";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
interface InputProps {
  onSubmit: (message: string) => void;
  loadingMessage: boolean;
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Input: React.FC<InputProps> = ({ onSubmit, loadingMessage }) => {
  const [transcribing, setTranscribing] = useState(false);
  const handleStopRecording = async (audioFile: File) => {
    const formData = new FormData();
    formData.append("audio", audioFile, "audio.mp3");
    try {
      setTranscribing(true);
      const response = await fetch("/api/chat/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTranscribing(false);
      if (data.transcription !== "") {
        onSubmit(data.transcription);
      }
    } catch (error) {
      console.error("Error transcribing audio: ", error);
    }
  };
  return (
    <Grid container justifyContent="center" spacing={1}>
      <AudioRecorder
        onStopRecording={handleStopRecording}
        loadingMessage={transcribing || loadingMessage}
      />
    </Grid>
  );
};

export default Input;
