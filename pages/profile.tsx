import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import TopicSelect from "../components/Onboarding/TopicSelect/TopicSelect";

const StyledButton = styled(Button)`
  padding: 1rem;
  border-radius: 30px;
`;

const ProfilePage: React.FC = () => {
  return (
    <Grid
      container
      py={4}
      height="calc(var(--vh, 1vh) * 95)"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      flexWrap="nowrap"
    >
      <Grid item>
        <Typography>This is the profile page</Typography>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
