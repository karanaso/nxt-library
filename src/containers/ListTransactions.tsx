import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TTransactions, TTransaction } from "../types/transactions";
import { Add, CheckBox, Delete, Edit } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { TMember, TMembers } from "../types/members";
import { TBook, TBooks } from "../types/books";
import { DataTable } from "../components/DataTable";
import {
  members as membersHttp,
  books as booksHttp,
  transactions as transactionHttp,
} from "../helpers/http";
import { links } from "../helpers/links";
import { useSnackbar } from "../components/SnackbarComponent";

import dayjs from "dayjs";
import 'dayjs/locale/el';

export const ListTransactions = () => {
  const params = useParams();
  const { setIsLoading } = useSnackbar();

  const [transactions, setTransactions] = useState<TTransactions>([]);
  const [pendingItemsOnly, setPendingItemsOnly] = useState(false);
  const [members, setMembers] = useState<TMembers>([]);
  const [books, setBooks] = useState<TBooks>([]);


  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      membersHttp.fetch(),
      booksHttp.fetch(),
      transactionHttp.fetch(),
    ]).then(([members, books, transactions]) => {
      setMembers(members);
      setBooks(books);
      setTransactions(transactions);
      setIsLoading(false);
    })
  }, []);

  
  const findMemberById = ({ id }: { id: string }) => {
    if (!members) return 'Loading...';
    const member: TMember | undefined = members.find((m: TMember) => m.id === id);
    if (member) {
      return member.firstName + ' ' + member.lastName;
    } else {
      return 'Not found';
    }
  };

  const findBookById = ({ id }: { id: string }) => {
    if (!books) return 'Loading...';
    const book: TBook | undefined = books.find((book: TBook) => book.id === id);
    if (book) {
      return book.title;
    } else {
      return 'Not found'
    }
  };

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
          <Box>
            <Button
              onClick={() => setPendingItemsOnly(!pendingItemsOnly)}
            >
              Σε εκρεμμότητα
              {pendingItemsOnly && <CheckBox />}
            </Button>
            <Link to={links.transactions.new}>
              <IconButton>
                <Add />
              </IconButton>
            </Link>
          </Box>
        </Box>
        <DataTable
          rows={transactions.map((t: TTransaction) => ({
            id: t.id,
            bookId: t.bookId,
            memberId: t.memberId,
            bookName: findBookById({ id: t.bookId }),
            memberName: findMemberById({ id: t.memberId }),
            dateOfReturn: dayjs(t.dateOfReturn).format('DD-MM-YYYY'),
            dateOfTransaction: dayjs(t.dateOfTransaction).format('DD-MM-YYYY'),
            isReturned: t.isReturned ? 'Yes' : 'No',
          }))}
          columns={[
            {
              field: 'memberName',
              headerName: 'Member',
              width: 230,
              renderCell: (params) => (
                <span>
                  <Link to={'/members/' + params.row.bookId}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>
                  <Link to={links.transactions.byBemberId(
                    'member',
                    params.row.memberId
                  )}>
                    {params.row.memberName}
                  </Link>                  
                </span>
              )
            },
            {
              field: 'bookName',
              headerName: 'Book',
              width: 130,
              renderCell: (params) => (
                <span>
                  <Link to={'/books/' + params.row.bookId}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>
                  <Link to={links.transactions.byBemberId(
                    'book',
                    params.row.bookId
                  )}>
                    {params.row.bookName}
                  </Link>                  
                </span>
              )
            },
            {
              field: 'dateOfReturn',
              headerName: 'Date of return',
              width: 130
            },
            { field: 'dateOfTransaction', headerName: 'Date of Transaction', width: 130 },
            { field: 'isReturned', headerName: 'Returned', width: 130 },
            {
              field: 'options',
              headerName: '',
              headerAlign: 'right',
              flex: 1,
              align: 'right',
              minWidth: 130,
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