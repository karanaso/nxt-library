import { Alert, Box, Button, FormGroup, IconButton, Snackbar, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "../components/DatePicker";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";

let url = 'http://localhost:3000/library/books';
let navigatePage = '/books';

export const EditBook = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [dateOfPublish, setDateOfPublish] = useState(new Date().toISOString());
  const [pages, setPages] = useState(0);
  const [snackBarOpen, setSnackBarOpen] = useState(true);

  const action = () => alert('should do something')
  const handleSnackBarClose = () => setSnackBarOpen(false)

  useEffect(() => {
    if ((params.id) && (params.id !== 'new')) load({ id: params.id })
  }, [params.id])

  const load = ({ id }: { id: string }) => fetch(`${url}/${id}`)
    .then(r => r.ok && r.json())
    .then(d => {
      setTitle(d[0].title);
      setAuthors(d[0].authors);
      setDateOfPublish(d[0].dateOfPublish);
      setPages(d[0].pages);
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
        title,
        authors,
        dateOfPublish,
        pages
      })
    }).then(() => {
      setSnackBarOpen(true);
      navigate(navigatePage)
    });
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
      <h1>Edit/Add Book</h1>
      <TextField
        id="outlined-basic"
        value={title}
        label="Title"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        value={authors}
        label="Authors"
        variant="outlined"
        onChange={(e) => setAuthors(e.target.value)}
      />
      <DatePicker
        date={dayjs(dateOfPublish) || dayjs()}
        setDate={date => setDateOfPublish(date)}
        label="Publish Date"
      />
      <TextField
        id="outlined-basic"
        value={dateOfPublish}
        label="Publish Date"
        variant="outlined"
        type="datetime"
        onChange={(e) => {
          console.log(e.target);
          // setDateOfPublish(new Date(e.target.value))
        }}
      />
      <TextField
        id="outlined-basic"
        value={pages}
        label="pages"
        variant="outlined"
        onChange={(e) => setPages(parseFloat(e.target.value))}
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
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={60000}
        color="success"
        onClose={handleSnackBarClose}
        message="Succesfully saved"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackBarClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  )
}