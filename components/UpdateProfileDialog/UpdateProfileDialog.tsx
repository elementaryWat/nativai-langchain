import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (username: string, level: string) => void;
  defaultUsername: string;
  defaultLevel: string;
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({
  open,
  onClose,
  onUpdate,
  defaultUsername,
  defaultLevel,
}) => {
  const [updatedUsername, setUpdatedUsername] = React.useState(defaultUsername);
  const [updatedLevel, setUpdatedLevel] = React.useState(defaultLevel);

  const handleUpdate = () => {
    onUpdate(updatedUsername, updatedLevel);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Details</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
        />
        <Select
          fullWidth
          value={updatedLevel}
          onChange={(e) => setUpdatedLevel(e.target.value)}
        >
          <MenuItem value={"Beginner"}>Beginner</MenuItem>
          <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
          <MenuItem value={"Expert"}>Expert</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
