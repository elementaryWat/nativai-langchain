import { styled, keyframes } from "@mui/system";

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
