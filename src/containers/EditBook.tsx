import { Box, Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "../components/DatePicker";
import { books as booksHttp } from "../helpers/http";
import dayjs from "dayjs";
import { links } from "../helpers/links";
import { useSnackbar } from "../components/SnackbarComponent";
import { useIntl } from "react-intl";

let navigatePage = '/books';

export const EditBook = () => {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [dateOfPublish, setDateOfPublish] = useState(new Date().toISOString());
  const [pages, setPages] = useState(0);

  useEffect(() => {
    if ((params.id) && (params.id !== 'new')) load({ id: params.id })
  }, [params.id])

  const load = ({ id }: { id: string }) => booksHttp.getById(id)
    .then(d => {
      if (d.error) {
        showSnackbar(d.error.message);

        navigate(links.books.list)
      }
      setTitle(d.title);
      setAuthors(d.authors);
      setDateOfPublish(d.dateOfPublish);
      setPages(d.pages);
    })

  const save = () => booksHttp.save({
    id: params.id, data: {
      title,
      authors,
      dateOfPublish,
      pages
    }
  }).then(() => {
    showSnackbar(intl.formatMessage({ id: 'BookSuccessfullyUpdated' }));
    navigate(navigatePage)
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
      <h1>Edit/Add Book</h1>
      <TextField
        id="outlined-basic"
        value={title}
        label={intl.formatMessage({ id: "Title" })}
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        value={authors}
        label={intl.formatMessage({ id: "Authors" })}
        variant="outlined"
        onChange={(e) => setAuthors(e.target.value)}
      />
      <DatePicker
        date={dayjs(dateOfPublish) || dayjs()}
        setDate={date => setDateOfPublish(date)}
        label={intl.formatMessage({ id: "DateOfPublish" })}
      />
      <TextField
        id="outlined-basic"
        value={pages}
        label={intl.formatMessage({ id: "NoPages" })}
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