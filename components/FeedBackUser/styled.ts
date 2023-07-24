import styled from "styled-components";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

export const FeedbackContainer = styled(Grid)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const FeedbackSection = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  & h6 {
    margin-bottom: 10px;
  }

  & p {
    margin-top: 10px;
  }
`;

export const FeedbackButton = styled(Button)`
  margin-top: 20px;
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #303f9f;
  }
`;

export const EmojiButton = styled.button`
  font-size: 2rem;
  display: flex;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const EmojiDescription = styled.p`
  font-size: 0.8rem;
  color: grey;
  text-align: center;
`;
