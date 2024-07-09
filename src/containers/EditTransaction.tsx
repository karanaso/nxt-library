import { useEffect, useState } from "react";
import { DatePicker } from "../components/DatePicker"
import dayjs from "dayjs";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TMembers } from "../types/members";
import { TBooks } from "../types/books";
import { useNavigate, useParams } from "react-router-dom";

let url = 'http://localhost:3000/library/transactions';
let navigatePage = '/transactions';

export const EditTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [members, setMembers] = useState<TMembers>([]);
  const [books, setBooks] = useState<TBooks>([]);

  const [dateOfTransaction, setDateOfTransaction] = useState(new Date().toISOString());
  const [dateOfReturn, setDateOfReturn] = useState(new Date().toISOString());
  const [memberId, setMemberId] = useState('');;
  const [bookId, setBookId] = useState('');

  const cancel = () => navigate(-1);

  useEffect(() => {
    if ((params.id) && (params.id !== 'new')) load({ id: params.id })
  }, [params.id])

  const load = ({ id }: { id: string }) => fetch(`${url}/${id}`)
    .then(r => r.ok && r.json())
    .then(d => {
      setBookId(d[0].bookId);
      setMemberId(d[0].memberId);
      setDateOfTransaction(d[0].dateOfTransaction);
      setDateOfReturn(d[0].dateOfReturn);
    })

  const save = () => {
    let myUrl = url;
    let method = 'POST';

    if ((params.id) && (params.id !== 'new')) {
      myUrl += `/${params.id}`;
      method = 'PUT';
    }

    fetch(myUrl, {
      method,
      body: JSON.stringify({
        bookId,
        memberId,
        dateOfTransaction,
        dateOfReturn
      })
    }).then(() => {
      // setSnackBarOpen(true);
      navigate(navigatePage)
    });
  }



  useEffect(() => {
    fetch('http://localhost:3000/library/members')
      .then(r => r.ok && r.json())
      .then(d => setMembers(d))

    fetch('http://localhost:3000/library/books')
      .then(r => r.ok && r.json())
      .then(d => setBooks(d))
  }, []);

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
      <h1>Edit/Add Transaction</h1>

      <DatePicker
        label="Transaction Date"
        date={dayjs(dateOfTransaction) || dayjs()}
        setDate={date => setDateOfTransaction(date)}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select a member</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={memberId}
          label="Select a member"
          onChange={e => setMemberId(e.target.value)}
        >
          {members.map(m => (
            <MenuItem value={m._id}>{m.firstName} {m.lastName}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select a book</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bookId}
          label="Select a book"
          onChange={e => setBookId(e.target.value)}
        >
          {books.map(b => (
            <MenuItem value={b._id}>
              {b.title}
              {b.authors}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DatePicker
        label="Return date"
        date={dayjs(dateOfReturn) || dayjs()}
        setDate={date => setDateOfReturn(date)}
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
          onClick={cancel}
          variant="contained"
          color="warning"
        >
          Cancel
        </Button>
        <Button
          onClick={save}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Box>

    </Box>
  )
}