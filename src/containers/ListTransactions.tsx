import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TTransactions, TTransaction } from "../types/transactions";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const ListTransactions = () => {
  const [transactions, setTransactions] = useState<TTransactions>([]);

  useEffect(() => {
    fetch('http://localhost:3000/library/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
  }, []);

  console.log(transactions);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 'auto',
          width: '90%',
          gap: 2,
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
          <h1>List transactions (total: {transactions.length})</h1>
          <Link to="/transactions/new">
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        </Box>
        {transactions.map((transaction: TTransaction) => (
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            border: "1px solid black",
            padding: 2,
          }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <div>{transaction.bookId}</div>
              <div>{transaction.memberId}</div>
              <div>{transaction.dateOfReturn}</div>
              <div>{transaction.dateOfTransaction}</div>
            </Box>
            <Box>
              <Link to={`/transactions/${transaction._id}`}>
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