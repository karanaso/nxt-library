import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TTransactions, TTransaction } from "../types/transactions";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchBooks, fetchMembers, fetchTransactions } from "../helpers/http";
import { useQuery } from "@tanstack/react-query";
import { TMember } from "../types/members";
import { TBook } from "../types/books";
import dayjs from "dayjs";
import 'dayjs/locale/el';
import { DataTable } from "../components/DataTable";
import { LoadingState } from "../components/LoadingBackdrop";

export const ListTransactions = () => {
  const [transactions, setTransactions] = useState<TTransactions>([]);

  const _transactions = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  const books = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks
  });

  const members = useQuery({
    queryKey: ['members'],
    queryFn: fetchMembers
  });

  useEffect(() => {
    if (_transactions.data) setTransactions(_transactions.data);
  }, [_transactions.data]);
  

  const findMemberById = ({id}:{id: string}) => {
    const member:TMember = members.data.find((member:TMember) => member._id === id);
    return member.firstName+' '+member.lastName;
  };

  const findBookById = ({id}:{id: string}) => {
    const book:TBook = books.data.find((book:TBook) => book._id === id);
    return book.title;
  };

  const handleRowClick = (params:any) => {
    const clickedRowId = params.id;
    const clickedRowData = params.row;
  
    // Perform your desired action here based on the clicked row data
    console.log("Row clicked:", clickedRowId, clickedRowData);
    // You can navigate to another page, open a modal, etc.
  };

  if (_transactions.isPending) return <LoadingState />;
  
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
        <DataTable
          rows={transactions.map((t:TTransaction) => ({
            id: t._id,
            bookName: findBookById({ id: t.bookId }),
            memberName: findMemberById({ id: t.memberId }),
            dateOfReturn: dayjs(t.dateOfReturn).format('DD-MM-YYYY'),
            dateOfTransaction: dayjs(t.dateOfTransaction).format('DD-MM-YYYY'),
          }))}
          columns={[
            { field: 'bookName', headerName: 'Book', width: 130 },
            { field: 'memberName', headerName: 'Member', width: 130 },
            { field: 'dateOfReturn', headerName: 'Date of return', width: 130 },
            { field: 'dateOfTransaction', headerName: 'Date of Transaction', width: 130 },
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
                    alignItems: "center",
                    justifyContent: 'flex-end',
                    width: '100%',
                    gap: 1,
                  }}
                >
                  <Link to={`/transactions/${params.row.id}`}>
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