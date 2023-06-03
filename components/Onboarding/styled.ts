import styled from "styled-components";
import { Button, FormControl, Grid, InputLabel, Select } from "@mui/material";

export const PageContainer = styled(Grid)<{ background?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  background: ${({ background }) => background || "transparent"};
`;

export const StyledInputLabel = styled(InputLabel)`
  && {
    color: #bcbcbd;
    top: -1rem;
    font-size: 1.8rem;
  }
`;

export const StyledSelect = styled(Select)`
  &.MuiInputBase-root {
    color: #bcbcbd;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
  padding-bottom: 2rem;
  & {
    color: white;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 20px;
  padding: 1rem;
  font-size: 1.2rem;
  background-color: #3f51b5;
  color: white;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #303f9f;
  }
`;
