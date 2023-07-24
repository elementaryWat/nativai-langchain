import { useState } from "react";
import { Mic, Stop } from "@mui/icons-material";
import MicRecorder from "mic-recorder-to-mp3";
import { RecordingFab } from "./styles";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const AudioRecorder = ({ onStopRecording, loadingMessage }) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    if (Mp3Recorder && !isRecording) {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((error) => console.error(error));
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      Mp3Recorder.stop()
        .getMp3()
        .then(async ([buffer, blob]) => {
          setIsRecording(false);
          const file = new File([blob], "recording.mp3", {
            type: blob.type,
            lastModified: Date.now(),
          });

          onStopRecording(file);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <RecordingFab
      onClick={isRecording ? stopRecording : startRecording}
      color="primary"
      disabled={loadingMessage}
      aria-label="record"
      isRecording={isRecording}
    >
      {isRecording ? <Stop /> : <Mic />}
    </RecordingFab>
  );
};

export default AudioRecorder;
