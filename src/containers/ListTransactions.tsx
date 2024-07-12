import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TTransactions, TTransaction } from "../types/transactions";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TMember } from "../types/members";
import { TBook } from "../types/books";
import dayjs from "dayjs";
import 'dayjs/locale/el';
import { DataTable } from "../components/DataTable";
import { LoadingState } from "../components/LoadingBackdrop";
import {
  members as memberHttp,
  books as booksHttp,
  transactions as transactionHttp,
} from "../helpers/http";
import { links } from "../helpers/links";

export const ListTransactions = () => {
  const [transactions, setTransactions] = useState<TTransactions>([]);

  const _transactions = useQuery({
    queryKey: ['transactions'],
    queryFn: transactionHttp.fetch
  });

  const books = useQuery({
    queryKey: ['books'],
    queryFn: booksHttp.fetch
  });

  const members = useQuery({
    queryKey: ['members'],
    queryFn: memberHttp.fetch
  });

  useEffect(() => {
    if (_transactions.data)setTransactions(_transactions.data);
  }, [_transactions.data]);


  const findMemberById = ({ id }: { id: string }) => {
    if (!members.data) return 'Loading...';
    const member: TMember = members.data.find((m: TMember) => m.id.toString() === id);    
    return member.firstName + ' ' + member.lastName;
  };

  const findBookById = ({ id }: { id: string }) => {
    if (!books.data) return 'Loading...';
    const book:TBook = books.data.find((book:TBook) => book.id.toString() === id);
    return book.title;
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
          <Link to={links.transactions.new}>
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        </Box>
        <DataTable
          rows={transactions.map((t: TTransaction) => ({
            id: t.id,
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
                  <Link to={links.transactions.edit(params.row.id)}>
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