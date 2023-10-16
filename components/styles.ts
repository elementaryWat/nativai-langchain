import { styled, keyframes } from "@mui/system";
import Fab from "@mui/material/Fab";

export const ChatContainer = styled("div")`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 92);
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

export const StyledFab = styled(Fab)(
  ({ theme, isRecording }: { theme: any; isRecording: boolean }) => ({
    "&.MuiFab-root": {
      // backgroundColor: theme.palette.secondary.main,
      backgroundColor: "#65236B",
      position: "absolute",
      top: "-50px",
      width: "100px",
      height: "100px",
    },

    ...(isRecording && {
      animation: `${pulseAnimation} 1s infinite`,
    }),
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  })
);
