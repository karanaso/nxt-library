import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TTransactions, TTransaction } from "../types/transactions";
import { Add, CheckBox, Delete, Edit } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
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
  const params = useParams();
  console.log(params);
  const [transactions, setTransactions] = useState<TTransactions>([]);
  const [pendingItemsOnly, setPendingItemsOnly] = useState(false);

  const _transactions = useQuery({
    queryKey: ['transactions'],
    queryFn: () => {
      if (params.memberOrBook === 'member') {
        return transactionHttp.query(
          `?filters[memberId][$eq]=${params.id}`
        )
      }
      if (params.memberOrBook === 'book') {
        return transactionHttp.query(
          `?filters[bookId][$eq]=${params.id}`
        )
      }
      if (pendingItemsOnly) {
        return transactionHttp.query('?filters[isReturned][$eq]=false')
      }
      return transactionHttp.fetch()
    }
  },);

  const books = useQuery({
    queryKey: ['books'],
    queryFn: booksHttp.fetch
  });

  const members = useQuery({
    queryKey: ['members'],
    queryFn: memberHttp.fetch
  });

  useEffect(() => {
    if (_transactions.data) setTransactions(_transactions.data);
  }, [_transactions.data]);

  useEffect(() => {
    _transactions.refetch();
  }, [pendingItemsOnly]);

  useEffect(() => {
    _transactions.refetch();
  }, [params])


  const findMemberById = ({ id }: { id: string }) => {
    if (!members.data) return 'Loading...';
    const member: TMember = members.data.find((m: TMember) => m.id === id);
    if (member) {
      return member.firstName + ' ' + member.lastName;
    } else {
      return 'Not found';
    }
  };

  const findBookById = ({ id }: { id: string }) => {
    if (!books.data) return 'Loading...';
    const book: TBook = books.data.find((book: TBook) => book.id === id);
    if (book) {
      return book.title;
    } else {
      return 'Not found'
    }
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