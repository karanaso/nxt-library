import { AccessAlarm } from '@mui/icons-material';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { configurations } from '../../helpers/http';



export const Configuration = () => {
  const [mailGunAPIKey, setMailGunAPIKey] = useState('');
  const [configurationId, setConfigurationId] = useState('');

  const fetchConfiguration = async () => {
    try {
      const data = await configurations.fetch();
      if (data.length > 0) {
        setMailGunAPIKey(data[0].mailGunAPIKey);
        setConfigurationId(data[0].id);
      } else {
        setConfigurationId('new');
        alert('new configuration created');
      }

    } catch (e) {
      console.error(e)
      alert('error');
    }
  };

  const updateConfiguration = async () => {
    try {
      const data = await configurations.save({
        id: configurationId,
        data: {
          mailGunAPIKey
        }
      })
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchConfiguration()
  }, [])

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <AccessAlarm />
      </Avatar>
      <Typography component="h1" variant="h5">
        Configuration options
      </Typography>
      <Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="mailgunAPIKey"
          label="Mailgun API Key"
          name="mailgunAPIKey"
          autoFocus
          helperText="Please enter your Mailgun API Key to send free emails."
          value={mailGunAPIKey}
          onChange={e => setMailGunAPIKey(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="mailgunAPIKey"
          label="Mailgun API Key"
          name="mailgunAPIKey"
          autoFocus
          helperText="Please enter your Mailgun API Key to send free emails."
          value={mailGunAPIKey}
          onChange={e => setMailGunAPIKey(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={updateConfiguration}
        >
          Save your configuration options
        </Button>
      </Box>
    </Box>
  );
}