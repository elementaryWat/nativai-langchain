import React from "react";
import { useTimer } from "react-timer-hook";
import Digit from "./Digit";
import styled from "styled-components";

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const SepartorContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 0 10px 0px;
`;

const Separator = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #404549;
  border-radius: 6px;
  margin: 5px 0px;
`;

function StopWatchTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <TimerContainer>
        <Digit value={hours} title="HORAS" />
        <SepartorContainer>
          <Separator />
          <Separator />
        </SepartorContainer>
        <Digit value={minutes} title="MINUTOS" />
        <SepartorContainer>
          <Separator />
          <Separator />
        </SepartorContainer>
        <Digit value={seconds} title="SEGUNDDS" />
      </TimerContainer>
    </div>
  );
}

export default StopWatchTimer;
