import { useEffect, useState } from "react";
import { DatePicker } from "../components/DatePicker"
import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TMembers } from "../types/members";
import { TBooks } from "../types/books";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  members as membersHttp,
  books as booksHttp,
  transactions as transactionsHttp,
} from "../helpers/http";
import dayjs from "dayjs";
import { links } from "../helpers/links";
import { useSnackbar } from "../components/SnackbarComponent";

let navigatePage = '/transactions';

export const EditTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { showSnackbar, setIsLoading } = useSnackbar();

  const [members, setMembers] = useState<TMembers>([]);
  const [books, setBooks] = useState<TBooks>([]);

  const [dateOfTransaction, setDateOfTransaction] = useState(new Date().toISOString());
  const [dateOfReturn, setDateOfReturn] = useState(new Date().toISOString());
  const [memberId, setMemberId] = useState('');;
  const [bookId, setBookId] = useState('');
  const [isReturned, setIsReturned] = useState(false);

  const cancel = () => navigate(-1);

  const load = async ({ id }: { id: string }) => {
    setIsLoading(true);
    try {
      let _transaction = await transactionsHttp.getById(id);
      let _members = await membersHttp.fetch();
      let _books = await booksHttp.fetch();

      setMembers(_members);
      setBooks(_books);

      setBookId(_transaction.bookId);
      setMemberId(_transaction.memberId);
      setDateOfTransaction(_transaction.dateOfTransaction);
      setDateOfReturn(_transaction.dateOfReturn);
      setIsReturned(_transaction.isReturned);

    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const save = () => transactionsHttp.save({
    id: params.id, data: {
      bookId,
      memberId,
      dateOfTransaction,
      dateOfReturn,
      isReturned,
    }
  }).then(() => {
    showSnackbar('Transaction successfully updated');
    navigate(navigatePage)
  });

  useEffect(() => {
    if ((params.id) && (params.id !== 'new')) load({ id: params.id })
  }, [params.id])


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
            <MenuItem
              key={m.id}
              value={m.id}
            >
              {m.firstName} {m.lastName}
            </MenuItem>
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
            <MenuItem key={b.id} value={b.id}>
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

      <div>
        <Checkbox
          onChange={e => setIsReturned(e.target.checked)}
          checked={isReturned}
        />
        <span>Is Returned</span>
      </div>

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