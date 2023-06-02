import styled from "styled-components";

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
