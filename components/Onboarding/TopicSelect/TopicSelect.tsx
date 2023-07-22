import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { PageContainer, StyledRadioButtonTopic } from "../styled";
import { useChat } from "../../../store/chatbot/useChat";
import { TOPICS } from "../../../utils/const";
import FamilyIcon from "@mui/icons-material/FamilyRestroom";
import WorkIcon from "@mui/icons-material/Work";
import TravelIcon from "@mui/icons-material/Flight";
import CultureIcon from "@mui/icons-material/TheaterComedy";
import HobbiesIcon from "@mui/icons-material/SportsEsports";
import HealthIcon from "@mui/icons-material/LocalHospital";
import TechIcon from "@mui/icons-material/Devices";
import EnvironmentIcon from "@mui/icons-material/Nature";
import styled from "styled-components";

const StyledTypographH4 = styled(Typography)`
  color: #fff; 
  margin-bottom: 1rem;
  text-align: center;
  background-color:#643453;
  padding:1rem 2rem;
  border-radius: 20px;
  font-weight: bold;
`;



const StyledGrid = styled(Grid)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  // justify-content: stretch;
  justify-content: center;
  // align-items: center;
`;

const TopicSelect: React.FC = () => {
  const { topicConversation, setTopicConversation } = useChat();
  const TOPIC_ICONS = {
    "family-and-friends": <FamilyIcon />,
    "work-and-studies": <WorkIcon />,
    "travel-and-tourism": <TravelIcon />,
    "culture-and-entertainment": <CultureIcon />,
    "hobbies-and-interests": <HobbiesIcon />,
    "health-and-wellbeing": <HealthIcon />,
    "technology-and-science": <TechIcon />,
    "environment-and-sustainability": <EnvironmentIcon />,
  };

  return (
    <PageContainer flexDirection="column"  borderRadius='50px' >
      <StyledTypographH4 >
        Elige un tema
      </StyledTypographH4>
      <StyledGrid container>
        {Object.keys(TOPICS).map((topicKey) => (
          <StyledRadioButtonTopic
            key={topicKey}
            selected={topicConversation === topicKey}
            onClick={() => setTopicConversation(topicKey)}
          >
            <Box>
              {TOPIC_ICONS[topicKey]}
              <Typography variant="body1" textTransform="none">
                {TOPICS[topicKey]}
              </Typography>
            </Box>
          </StyledRadioButtonTopic>
        ))}
      </StyledGrid>
    </PageContainer>
  );
};

export default TopicSelect;
