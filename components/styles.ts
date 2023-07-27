import styled, { keyframes, css } from "styled-components";
import Fab from "@mui/material/Fab";

export const ChatContainer = styled("div")`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 90);
`;

export const FixedInputContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #9D37A7;
  border-top: 1px solid #ccc;
  height:15vh;
  position: relative;
`;

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

export const RecordingFab = styled(Fab)<{ isRecording: boolean }>`
  background-color:"#65236B",
  position: "absolute",
  top:"-50px",
  width:"100px",
  height:"100px",
  ${({ isRecording }) =>
    isRecording &&
    css`
      animation: ${pulseAnimation} 1s infinite;
    `}
`;
