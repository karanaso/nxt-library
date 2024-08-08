import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TBooks } from "../types/books";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataTable } from "../components/DataTable";
import { books as booksHttp } from "../helpers/http";
import { links } from "../helpers/links";
import { useSnackbar } from '../components/SnackbarComponent';
import { useIntl } from "react-intl";

export const ListBooks = () => {
  const intl = useIntl();
  const [books, setBooks] = useState<TBooks>([]);
  const { setIsLoading } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    booksHttp.fetch()
      .then(d => setBooks(d))
      .then(() => setIsLoading(false))
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          margin: 'auto',
          width: '90%',
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>
            {intl.formatMessage({ id: 'listBooks' })}
            <span style={{
              fontSize: '10pt',
              marginLeft: '1rem'
            }}>
              (
                {intl.formatMessage({ id: 'total' })}
                &nbsp;
                {books.length}
              )
            </span>
          </h1>
          <Link to={links.books.new}>
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        </Box>
        <DataTable
          rows={books.map(b => ({
            id: b.id,
            title: b.title,
            authors: b.authors,
            dateOfPublish: b.dateOfPublish,
            pages: b.pages,
          }))}
          columns={[
            { 
              field: 'title',
              headerName: intl.formatMessage({ id: 'Title' }),
              width: 130,
              renderCell: (params) => (
                <Link to={links.transactions.byBemberId(
                  'book',
                  params.row.id
                )}>
                  {params.row.title}
                </Link>
              )
            },
            { field: 'authors', headerName: intl.formatMessage({ id: 'Authors' }), width: 130 },
            { field: 'dateOfPublish', headerName: intl.formatMessage({ id:  'DateOfPublish' }), width: 130 },
            { field: 'pages', headerName: intl.formatMessage({ id: 'NoPages' }), align: 'center', headerAlign: 'center', width: 130 },
            {
              field: 'options',
              headerName: '',
              headerAlign: 'right',
              flex: 1,
              align: 'right',
              renderCell: (params) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'flex-end',
                    width: '100%',
                    gap: 1,
                  }}
                >
                  <Link to={links.books.edit(params.row.id)}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Box>
              )
            }
          ]}
        />
      </Box>
    </div>
  );
}