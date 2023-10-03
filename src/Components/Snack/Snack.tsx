import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ISnackBar {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  type: "error" | "warning" | "info" | "success";
}

const Snack: React.FC<ISnackBar> = ({ isOpen, onClose, text, type }) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
        <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Snack;
