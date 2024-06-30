import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";

export const EditMember = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const save = () => {
    console.log(firstName, lastName, phoneNumber, email);

    fetch('http://localhost:3000/library/members', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email
      })
    })
  }
  
  const cancel = () => alert('You clicked cancel');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '80%',
        margin: 'auto',
      }}
    >
      <h1>Edit Member</h1>
      <TextField
        id="outlined-basic"
        value={firstName} 
        label="First Name"
        variant="outlined"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        value={lastName} 
        label="Last Name"
        variant="outlined"
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        value={phoneNumber} 
        label="Phone number"
        variant="outlined"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        value={email} 
        label="email" 
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          justifyContent:'end',

        }}
      >
        <Button variant="contained" color="primary" onClick={save}>Save</Button>
        <Button variant="contained" color="warning" onClick={cancel}>Cancel</Button>
      </Box>
    </Box>
  )
}