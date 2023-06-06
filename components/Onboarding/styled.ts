import styled from "styled-components";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";

export const PageContainer = styled(Grid)<{ background?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  background: ${({ background }) => background || "transparent"};
`;

export const StyledTextField = styled(TextField)`
  && {
    margin: 10px;
    width: 100%;
    color: #bcbcbd;
    padding-bottom: 3rem;
    .MuiInputBase-root {
      color: #bcbcbd;
      border-radius: 1rem;
    }
    .MuiFormLabel-root {
      color: #bcbcbd;
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: #8a2be2;
    }
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const StyledFormControl = styled(FormControl)`
  && {
    margin: 10px;
    width: 100%;
    color: #bcbcbd;
    padding-bottom: 3rem;
  }
`;

export const StyledInputLabel = styled(InputLabel)`
  && {
    color: #bcbcbd;
    top: -0.5rem;
    font-size: 1.2rem;
  }
`;

export const StyledSelect = styled(Select)`
  && {
    color: #bcbcbd;
    .MuiInputBase-root {
      color: #bcbcbd;
      border-radius: 16px; // Add border-radius
    }
    .MuiFormLabel-root {
      color: #bcbcbd;
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: #8a2be2; // Add border color
    }
    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border-color: #8a2be2; // Add border color on hover
    }
    .Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #8a2be2; // Add border color when the input is focused
    }
    .Mui-focused .MuiFormLabel-root {
      color: #8a2be2; // Add label color when the input is focused
    }
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
