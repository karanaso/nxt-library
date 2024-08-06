import { Box, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { members as membersHttp } from "../helpers/http";
import { links } from "../helpers/links";
import { useSnackbar } from "../components/SnackbarComponent";
import { useIntl } from "react-intl";

export const EditMember = () => {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if ((params.id) && (params.id !== 'new')) load({ id: params.id })
  }, [params.id])

  const load = ({ id }: { id: string }) => membersHttp.getById(id)
    .then(d => {
      if (d.error) {
        showSnackbar(d.error.message);
        navigate(links.members.list)
      }
      setFirstName(d.firstName);
      setLastName(d.lastName);
      setPhoneNumber(d.phoneNumber);
      setEmail(d.email);
    })

  const save = () => membersHttp.save({
    id: params.id, data: {
      firstName,
      lastName,
      phoneNumber,
      email
    }
  }).then(() => {
    showSnackbar(intl.formatMessage({id: 'MemberSuccessfullyUpdated' }));
    navigate('/members')
  });

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
        label={intl.formatMessage({id: "firstName" })}
        variant="outlined"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        value={lastName}
        label={intl.formatMessage({id: "lastName" })}
        variant="outlined"
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        value={phoneNumber}
        label={intl.formatMessage({id: "phoneNumber" })}
        variant="outlined"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        value={email}
        label={intl.formatMessage({id: "email" })}
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
        <Button
          variant="contained"
          color="warning"
          onClick={cancel}
        >
          {intl.formatMessage({ id: 'cancel' })}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={save}
        >
          {intl.formatMessage({ id: 'save' })}
        </Button>
      </Box>
    </Box>
  )
}