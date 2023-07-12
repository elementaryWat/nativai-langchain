import { Box, Container } from "@mui/material";
import { styled, keyframes } from "@mui/system";

export const StyledMessagesContainer = styled(Container)`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

export const MessageBubble = styled(Box)(
  ({ role }: { role: "user" | "system" | "assistant" }) => ({
    display: "flex",
    justifyContent: "space-between",
    background: role === "user" ? "#f1f1f1" : "#6e45ff",
    padding: "10px 20px",
    borderRadius: "20px",
    color: role === "user" ? "black" : "white",
    marginBottom: "10px",
    width: "80%",
  })
);

export const MessageContainer = styled(Box)(
  ({ role }: { role: "user" | "system" | "assistant" }) => ({
    display: "flex",
    justifyContent: role === "user" ? "flex-end" : "flex-start",
    width: "100%",
  })
);

const loadingAnimation = keyframes`
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`;

export const LoadingDots = styled("div")`
  display: inline-block;
  position: relative;
  width: 24px;
  height: 8px;

  & div {
    position: absolute;
    top: 0;
    width: 8px;
    height: 8px;
    background-color: currentColor;
    border-radius: 50%;
    animation: ${loadingAnimation} 1.4s infinite;
  }

  & div:nth-child(2) {
    left: 8px;
    animation-delay: -1.1s;
  }

  & div:nth-child(3) {
    left: 16px;
    animation-delay: -0.8s;
  }
`;
