import { Alert, AlertColor, Snackbar } from "@mui/material"
import { createContext, ReactNode, useContext, useState } from "react";

export const SnackbarContext = createContext<any|null|undefined>(1);

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('aaaaa');
  const [severity, setSeverity] = useState('success');

  const handleClose = () => setOpen(false);

  const showSnackbar = (message: string, severity: AlertColor = 'success') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar open={open} autoHideDuration={60000} onClose={handleClose}>
        <Alert onClose={handleClose} >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider >
  );
};

const useSnackbar = () => useContext(SnackbarContext);

export { SnackbarProvider, useSnackbar };