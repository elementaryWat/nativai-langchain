import { styled, keyframes } from "@mui/system";
import Fab from "@mui/material/Fab";

export const ChatContainer = styled("div")`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 90);
`;

export const FixedInputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  backgroundColor: theme.palette.secondary.light,
  borderTop: `1px solid ${theme.palette.divider}`,
  height: "8vh",
  position: "relative",
}));

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const RecordingFab = styled(Fab)(
  ({ theme, isRecording }: { theme: any; isRecording: boolean }) => ({
    "&.MuiFab-root": {
      backgroundColor: theme.palette.secondary.main,
      position: "absolute",
      top: "-2.5rem",
      width: "5rem",
      height: "5rem",
    },

    ...(isRecording && {
      animation: `${pulseAnimation} 1s infinite`,
    }),
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  })
);
