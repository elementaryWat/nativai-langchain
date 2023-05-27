import { TextField, IconButton, Grid } from "@mui/material";
import { Send } from "@mui/icons-material";
import AudioRecorder from "./AudioRecorder";
import { useState } from "react";
// import whisperApi from "../api/whisperApi";
interface InputProps {
  onSubmit: (message: string) => void;
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    onSubmit(message);
    setMessage("");
  };

  const handleStopRecording = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.mp3");

    // try {
    //   const response = await whisperApi.post("/api/transcribe", formData);
    //   setMessage(response.data.text);
    // } catch (error) {
    //   console.error("Error sending audio to the API:", error);
    // }
  };
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs>
        <TextField
          fullWidth
          value={message}
          label="Type your message"
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
        <IconButton onClick={handleSubmit}>
          <Send />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Input;
