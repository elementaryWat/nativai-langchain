import React from "react";
import { MenuItem } from "@mui/material";
import {
  PageContainer,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "../styled";

const TopicSelect: React.FC = () => {
  return (
    <PageContainer>
      <StyledFormControl>
        <StyledInputLabel id="level">Choose a topic</StyledInputLabel>
        <StyledSelect defaultValue="" placeholder="Choose a topic">
          <MenuItem value="">Choose a topic for conversation</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="music">Music</MenuItem>
          <MenuItem value="movies">Movies</MenuItem>
        </StyledSelect>
      </StyledFormControl>
    </PageContainer>
  );
};

export default TopicSelect;
