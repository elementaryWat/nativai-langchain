import { TextField, IconButton, Grid } from "@mui/material";
import { Send } from "@mui/icons-material";
import AudioRecorder from "./AudioRecorder";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
interface InputProps {
  onSubmit: (message: string, language: string) => void;
  loadingMessage: boolean;
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Input: React.FC<InputProps> = ({ onSubmit, loadingMessage }) => {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("");
  const handleSubmit = () => {
    onSubmit(message, language);
    setMessage("");
  };

  const handleStopRecording = async (audioFile: File) => {
    const formData = new FormData();
    formData.append("audio", audioFile, "audio.mp3");
    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setMessage(data.transcription);
      setLanguage(data.language);
    } catch (error) {
      console.error("Error transcribing audio: ", error);
    }
  };
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs>
        <TextField
          fullWidth
          value={message}
          label="Type your message"
          multiline
          onChange={(e) => setMessage(e.target.value)}
        />
      </Grid>
      <Grid item>
        <AudioRecorder onStopRecording={handleStopRecording} />
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleSubmit}
          disabled={message === "" || loadingMessage}
        >
          <Send />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Input;
