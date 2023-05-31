import React from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import {
  PageContainer,
  StyledButton,
  StyledFormControl,
  Title,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLevel } from "../../store/chatbot-config/chatbotConfigSlice";

const LevelSelect: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const level = useSelector((state: RootState) => state.chatbotConfig.level);

  const handleLevelChange = (event) => {
    const selectedLevel = event.target.value as string;
    setLevel(selectedLevel);
    dispatch(setLevel(selectedLevel));
  };

  return (
    <PageContainer>
      <Title>Choose your English level</Title>
      <StyledFormControl variant="standard">
        <InputLabel id="demo-simple-select-standard-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={level}
          onChange={handleLevelChange}
          label="Level"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"B1"}>B1 - Intermediate</MenuItem>
          <MenuItem value={"B2"}>B2 - Upper intermediate</MenuItem>
          <MenuItem value={"C1"}>C1 - Advanced</MenuItem>
          <MenuItem value={"C2"}>C2 - Proficient</MenuItem>
        </Select>
        {level && (
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => router.push("/chat")}
          >
            Start Conversation
          </StyledButton>
        )}
      </StyledFormControl>
    </PageContainer>
  );
};

export default LevelSelect;
