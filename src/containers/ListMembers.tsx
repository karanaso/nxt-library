import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TMembers } from "../types/members";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataTable } from "../components/DataTable";
import { members as membersHttp } from '../helpers/http';
import { links } from '../helpers/links';
import { useSnackbar } from '../components/SnackbarComponent';
import { useIntl } from "react-intl";


export const ListMembers = () => {
  const intl = useIntl();
  const [members, setMembers] = useState<TMembers>([]);
  const { setIsLoading } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    membersHttp.fetch()
      .then(d => setMembers(d))
      .then(() => setIsLoading(false))
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: '90%',
          margin: 'auto',
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
            {intl.formatMessage({ id: 'listMembers' })}
            <span style={{
              fontSize: '10pt',
              marginLeft: '1rem'
            }}>
              (
                {intl.formatMessage({ id: 'total' })}
                &nbsp;
                {members.length}
              )
            </span>
          </h1>
          <Link to={links.members.new}>
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        </Box>
        <DataTable
          rows={members.map(m => ({
            id: m.id,
            firstName: m.firstName,
            lastName: m.lastName,
            phoneNumber: m.phoneNumber,
            email: m.email,
          }))}
          columns={[
            {
              field: 'firstName',
              headerName: intl.formatMessage({id: 'fullName'}),
              width: 230,
              renderCell: (params) => (
                <Link to={links.transactions.byBemberId(
                  'member',
                  params.row.id
                )}>
                  {params.row.firstName} {params.row.lastName}
                </Link>
              )
            },
            { 
              field: 'phoneNumber', 
              headerName: intl.formatMessage({id: 'phoneNumber'}),
              width: 130
            },
            { 
              field: 'email', 
              headerName: intl.formatMessage({id: 'email'}),
              width: 230
            },
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
                  <Link to={links.members.edit(params.row.id)}>
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