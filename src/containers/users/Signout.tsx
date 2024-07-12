import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { links } from '../../helpers/links';


export const Signout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate(links.user.signin);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress color="primary" />
      <Typography sx={{ mt: 3, fontSize: 'h6.fontSize' }}>
        Sad to see you leave.
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, fontSize: 'h6.fontSize' }}>
        Please wait, while signing you out
      </Typography>
    </Box>
  );
};
