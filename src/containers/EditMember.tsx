import { Box, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { conf } from "../helpers/http";

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

  const load = ({ id }: { id: string }) => fetch(conf.membersUrl + `/${id}`)
    .then(r => r.ok && r.json())
    .then(d => {
      console.log('----', d);
      setFirstName(d.data.attributes.firstName);
      setLastName(d.data.attributes.lastName);
      setPhoneNumber(d.data.attributes.phoneNumber);
      setEmail(d.data.attributes.email);
    })

  const save = () => {
    let url = conf.membersUrl;
    let method = 'POST';

    if (params.id) {
      url += `/${params.id}`;
      method = 'PUT';
    }

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          firstName,
          lastName,
          phoneNumber,
          email
        }
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