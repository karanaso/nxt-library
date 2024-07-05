import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TBook, TBooks } from "../types/books";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const ListBooks = () => {
  const [books, seTBooks] = useState<TBooks>([]);

  useEffect(() => {
    fetch('http://localhost:3000/library/books')
      .then(response => response.json())
      .then(data => seTBooks(data))
  }, []);

  return (
    <div>
      <h1>List books (total: {books.length})</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {books.map((book: TBook) => (
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 'auto',
            width: '90%',
            gap: 2,
            border: "1px solid black",
            padding: 2,
          }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <div>{book.title}</div>
              <div>{book.authors}</div>
              <div>{book.dateOfPublish}</div>
              <div>{book.pages}</div>
            </Box>
            <Box>
              <Link to={`/books/${book._id}`}>
                <IconButton>
                  <Edit />
                </IconButton>
              </Link>
              <IconButton>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        )
        )}
      </Box>
    </div>
  );
}