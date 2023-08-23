import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import { useRouter } from "next/router";

const AppBottomBar: React.FC = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = React.useState(0);

  useEffect(() => {
    switch (router.pathname) {
      case "/":
        setCurrentTab(0);
        break;
      case "/profile":
        setCurrentTab(1);
        break;
      default:
        setCurrentTab(0);
        break;
    }
  }, [router.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <AppBar position="fixed" color="default" sx={{ top: "auto", bottom: 0 }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab
          icon={<ChatIcon />}
          label="Chat"
          value={0}
          component="a"
          href="/"
        />
        <Tab
          icon={<PersonIcon />}
          label="Profile"
          value={1}
          component="a"
          href="/profile"
        />
      </Tabs>
    </AppBar>
  );
};

export default AppBottomBar;
