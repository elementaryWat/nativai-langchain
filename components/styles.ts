import styled, { keyframes, css } from "styled-components";
import Fab from "@mui/material/Fab";

export const ChatContainer = styled("div")`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
`;

export const FixedInputContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f5f5f5;
  border-top: 1px solid #ccc;
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
  ${({ isRecording }) =>
    isRecording &&
    css`
      animation: ${pulseAnimation} 1s infinite;
    `}
`;
