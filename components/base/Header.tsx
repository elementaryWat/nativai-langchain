import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Face4Icon from "@mui/icons-material/Face4";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { ANALYTICS_EVENTS, trackEvent } from "@/utils/analyticsMethods";
interface ChatMenuBarProps {
  interactionsRemaining: number;
  handleStopChat: () => void;
}

const ChatMenuBar: React.FC<ChatMenuBarProps> = ({
  interactionsRemaining,
  handleStopChat,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickStopChat = () => {
    handleStopChat();
    handleClose();
    trackEvent(ANALYTICS_EVENTS.END_CONVERSATION_BTN);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Face4Icon />
          <Typography variant="h6" component="div" ml={1} sx={{ flexGrow: 1 }}>
            Nati
          </Typography>
          <div>
            <IconButton size="large" color="inherit">
              <ElectricBoltIcon /> {interactionsRemaining}
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClickStopChat}>
                Detener conversacion
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatMenuBar;
