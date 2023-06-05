import { TextField, IconButton, Grid } from "@mui/material";
import { Send } from "@mui/icons-material";
import AudioRecorder from "./AudioRecorder";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
interface InputProps {
  onSubmit: (message: string) => void;
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    onSubmit(message);
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </Grid>
      <Grid item>
        <AudioRecorder onStopRecording={handleStopRecording} />
      </Grid>
      <Grid item>
        <IconButton onClick={handleSubmit} disabled={message === ""}>
          <Send />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Input;
