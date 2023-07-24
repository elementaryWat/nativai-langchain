import styled from "styled-components";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

export const FeedbackContainer = styled(Grid)`
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height:100vh;
  width:100vw:
`;

export const FeedbackSection = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  width:100%;
  height:auto;
  & h6 {
    margin-bottom: 10px;
  }

  & p {
    margin-top: 10px;
  }
`;

export const FeedbackButton = styled(Button)`
  background-color: #9D37A7 ;
  padding:.5rem 1rem;
  color: white;
  border-radius:30px;
  &:hover {
    background-color:#511854;
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

export const TextfieldButton = styled.button`
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
  font-size: .9rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;


export const ScoreDescription = styled.p`
  font-size: 1.1rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;
