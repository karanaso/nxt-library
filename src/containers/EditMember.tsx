import { Box, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditMember = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (params.id) load({ id: params.id })
  }, [params.id])

  const load = ({id}:{id:string}) => fetch(`http://localhost:3000/library/members/${id}`)
    .then(r => r.ok && r.json())
    .then(d => {
      setFirstName(d[0].firstName);
      setLastName(d[0].lastName);
      setPhoneNumber(d[0].phoneNumber);
      setEmail(d[0].email);
    })

  const save = () => {
    let url = 'http://localhost:3000/library/members';
    let method = 'POST';
    
    if (params.id) {
      url += `/${params.id}`;
      method = 'PUT';
    }

    fetch(url, {
      method,
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email
      })
    }).then(() => navigate('/members'));
  }

  const cancel = () => navigate(-1);

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
          justifyContent: 'end',

        }}
      >
        <Button variant="contained" color="warning" onClick={cancel}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={save}>Save</Button>
      </Box>
    </Box>
  )
}