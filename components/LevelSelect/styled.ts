import styled from "styled-components";
import { Button, FormControl } from "@mui/material";

export const PageContainer = styled.div`
  display: flex;
  padding: 2rem;
  margin-top: 10rem;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  gap: 1rem;
`;

export const Title = styled.h1`
  color: #3f51b5;
`;

export const StyledFormControl = styled(FormControl)`
  && {
    width: 80%;
    height: 80px;
    .MuiInputBase-root {
      border-radius: 4px;
      background-color: white;
      &:hover {
        border-color: #303f9f;
      }
    }
  }
`;

export const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    padding: 0.5rem;
    font-size: 1.2rem;
    background-color: #3f51b5;
    color: white;
    width: 100%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #303f9f;
    }
  }
`;
