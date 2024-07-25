import { Alert, AlertColor, Snackbar } from "@mui/material"
import { createContext, ReactNode, useContext, useState } from "react";
import { LoadingState } from "./LoadingBackdrop";

export const SnackbarContext = createContext<any|null|undefined>(1);

const MultiProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('aaaaa');
  const [severity, setSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false); 
  const handleClose = () => setOpen(false);

  const showSnackbar = (message: string, severity: AlertColor = 'success') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, setIsLoading }}>
      {isLoading && <LoadingState />}
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

export { MultiProvider, useSnackbar };