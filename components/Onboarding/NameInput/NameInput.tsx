import React from "react";
import { PageContainer, StyledTextField } from "../styled";
import { useUserData } from "../../../store/user/useUserData";

const NameInput: React.FC = () => {
  const { username, setUserData } = useUserData();

  return (
    <PageContainer flexDirection="column" borderRadius="50px">
      <StyledTextField
        id="name"
        label="Your name"
        value={username}
        onChange={(event) => setUserData({ name: event.target.value })}
      />
    </PageContainer>
  );
};

export default NameInput;
