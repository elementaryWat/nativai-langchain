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
          <MenuItem value="greetings">Greetings and Introductions</MenuItem>
          <MenuItem value="family-friends">Family and Friends</MenuItem>
          <MenuItem value="work-studies">Work and Studies</MenuItem>
          <MenuItem value="travels">Travels and Tourism</MenuItem>
          <MenuItem value="culture">Culture and Entertainment</MenuItem>
          <MenuItem value="news">Current Events and News</MenuItem>
          <MenuItem value="hobbies">Hobbies and Interests</MenuItem>
          <MenuItem value="wellness">Health and Wellness</MenuItem>
          <MenuItem value="tech">Technology and Science</MenuItem>
          <MenuItem value="environment">
            Environment and Sustainability
          </MenuItem>
        </StyledSelect>
      </StyledFormControl>
    </PageContainer>
  );
};

export default TopicSelect;
