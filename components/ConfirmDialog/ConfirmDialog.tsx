import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

interface ConfirmDialogProps {
  openDialog: boolean;
  onCloseConfirmationDialog: () => void;
  onConfirmText: string;
  onConfirmAction: () => void;
  onConfirmTextAction: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  openDialog,
  onCloseConfirmationDialog,
  onConfirmAction,
  onConfirmText,
  onConfirmTextAction,
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={onCloseConfirmationDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Cancelar suscripción"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {onConfirmText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseConfirmationDialog} color="primary">
          No
        </Button>
        <Button onClick={onConfirmAction} color="primary" autoFocus>
          {onConfirmTextAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
