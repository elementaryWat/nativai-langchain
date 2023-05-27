import React from "react";
import { LoadingDots } from "./styled";

const LoadingMessage: React.FC = () => {
  return (
    <LoadingDots>
      <div />
      <div />
      <div />
    </LoadingDots>
  );
};

export default LoadingMessage;
