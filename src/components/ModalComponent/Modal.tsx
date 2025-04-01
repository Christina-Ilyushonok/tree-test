import React from "react";
import { Modal, Button, Box, Typography } from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  cancelText: string;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 1,
          boxShadow: 24,
          minWidth: 300,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Box>{children}</Box>
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose} color="secondary">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} variant="contained" color="primary">
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;