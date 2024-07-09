import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TBook, TBooks } from "../types/books";
import { Add, Delete, Edit, PlusOne } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataTable } from "../components/DataTable";
import { fetchBooks } from "../helpers/http";
import { useQuery } from "@tanstack/react-query";

export const ListBooks = () => {
  const [books, setBooks] = useState<TBooks>([]);

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks
  });

  useEffect(() => {
    if (data) setBooks(data);
  }, [data]);

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const handleRowClick = (params:any) => {
    const clickedRowId = params.id;
    const clickedRowData = params.row;
  
    // Perform your desired action here based on the clicked row data
    console.log("Row clicked:", clickedRowId, clickedRowData);
    // You can navigate to another page, open a modal, etc.
  };

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
          <h1>List books (total: {books.length})</h1>
          <Link to="/books/new">
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        </Box>
        <DataTable
          rows={books.map(m => ({
            id: m._id,
            title: m.title,
            authors: m.authors,
            dateOfPublish: m.dateOfPublish,
            pages: m.pages,
          }))}
          columns={[
            { field: 'title', headerName: 'Title', width: 130 },
            { field: 'authors', headerName: 'Authors', width: 130 },
            { field: 'dateOfPublish', headerName: 'Date of publish', width: 130 },
            { field: 'pages', headerName: 'No. Pages', width: 130 },
            {
              field: 'options',
              headerName: 'Options',
              renderCell: (params) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                  }}
                >
                  <Link to={`/books/${params.row.id}`}>
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
          onRowClick={handleRowClick}
        />
      </Box>
    </div>
  );
}