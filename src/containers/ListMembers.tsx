import { useQuery } from '@tanstack/react-query'
import { Box, IconButton } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { TMembers } from "../types/members";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataTable } from "../components/DataTable";
import { members as membersHttp } from '../helpers/http';
import { LoadingState } from '../components/LoadingBackdrop';
import { links } from '../helpers/links';
import { SnackbarContext, useSnackbar } from '../components/SnackbarComponent';


export const ListMembers = () => {
  const [members, setMembers] = useState<TMembers>([]);
  const { showSnackbar, setIsLoading } = useSnackbar();
  
  useEffect(() => {
    showSnackbar('loading');
    setIsLoading(true);
    membersHttp.fetch()
      .then(d => console.log(d))
      .then(() => setIsLoading(false))
    showSnackbar('data succesfully loaded');
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
          <h1>List members (total: {members.length})</h1>
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
              headerName: 'First name',
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
            { field: 'phoneNumber', headerName: 'Phone number', width: 130 },
            { field: 'email', headerName: 'E-mail', width: 230 },
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