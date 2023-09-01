import React, { useEffect, useState } from "react";
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
import {
  ENGLISH_LEVELS,
  OBJECTIVES,
  UserLevel,
  UserObjective,
} from "@/types/User";

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (
    username: string,
    level: UserLevel,
    objective: UserObjective,
    emailMP: string
  ) => void;
  defaultUsername: string;
  defaultLevel: UserLevel | "";
  defaultObjective: UserObjective | "";
  defaultEmailMercadoPago: string | "";
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({
  open,
  onClose,
  onUpdate,
  defaultUsername,
  defaultLevel,
  defaultObjective,
  defaultEmailMercadoPago,
}) => {
  const [updatedUsername, setUpdatedUsername] = useState(defaultUsername);
  const [updatedLevel, setUpdatedLevel] = useState(defaultLevel);
  const [updatedObjective, setUpdatedObjective] = useState(defaultObjective);
  const [updatedEmailMercadoPago, setUpdatedEmailMercadoPago] = useState(
    defaultEmailMercadoPago
  );

  const handleUpdate = () => {
    onUpdate(
      updatedUsername || defaultUsername,
      updatedLevel || defaultLevel,
      updatedObjective || defaultObjective,
      updatedEmailMercadoPago || defaultEmailMercadoPago
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Actualizar datos</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={updatedUsername || defaultUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email Mercado Pago"
          value={updatedEmailMercadoPago || defaultEmailMercadoPago}
          onChange={(e) => setUpdatedEmailMercadoPago(e.target.value)}
        />
        <Select
          fullWidth
          value={updatedLevel || defaultLevel}
          onChange={(e) => setUpdatedLevel(e.target.value as UserLevel)}
        >
          {Object.keys(ENGLISH_LEVELS).map((key) => (
            <MenuItem key={key} value={ENGLISH_LEVELS[key]}>
              {ENGLISH_LEVELS[key]}
            </MenuItem>
          ))}
        </Select>
        <Select
          fullWidth
          style={{ marginTop: 10 }}
          value={updatedObjective || defaultObjective}
          onChange={(e) => setUpdatedObjective(e.target.value as UserObjective)}
        >
          {Object.keys(OBJECTIVES).map((key) => (
            <MenuItem key={key} value={key}>
              {OBJECTIVES[key]}
            </MenuItem>
          ))}
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
