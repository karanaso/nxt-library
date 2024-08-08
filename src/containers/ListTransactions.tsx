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
import { useIntl } from "react-intl";

export const ListTransactions = () => {
  const intl = useIntl();
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
    if (!members) return intl.formatMessage({ id: 'loading' });
    const member: TMember | undefined = members.find((m: TMember) => m.id === id);
    if (member) {
      return member.firstName + ' ' + member.lastName;
    } else {
      return 'Not found';
    }
  };

  const findBookById = ({ id }: { id: string }) => {
    if (!books) return intl.formatMessage({ id: 'loading' });
    const book: TBook | undefined = books.find((book: TBook) => book.id === id);
    if (book) {
      return book.title;
    } else {
      return intl.formatMessage({ id: 'notFound' })
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
          <h1>
            {intl.formatMessage({ id: 'listTransactions' })}
            <span style={{
              fontSize: '10pt',
              marginLeft: '1rem'
            }}>
              (
                {intl.formatMessage({ id: 'total' })}
                &nbsp;
                {transactions.length}
              )
            </span>
          </h1>
          <Box>
            <Button
              onClick={() => setPendingItemsOnly(!pendingItemsOnly)}
            >
              {intl.formatMessage({ id: 'pending' })}
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
            isReturned: t.isReturned 
              ? intl.formatMessage({ id: 'Yes' }) 
              : intl.formatMessage({ id: 'No' }),
          }))}
          columns={[
            {
              field: 'memberName',
              headerName: intl.formatMessage({id: 'Member'}),
              width: 230,
              renderCell: (params) => (
                <span>
                  <Link to={'/members/' + params.row.memberId}>
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
              headerName: intl.formatMessage({id: 'Book'}),
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
              headerName: intl.formatMessage({id: 'DateOfReturn'}),
              width: 180
            },
            { 
              field: 'dateOfTransaction', 
              headerName: intl.formatMessage({id: 'DateOfTransaction'}),
              width: 130
            },
            { 
              field: 'isReturned', 
              headerName: intl.formatMessage({id: 'isReturned'}),
              width: 130
            },
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