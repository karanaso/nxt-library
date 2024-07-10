import { useQuery } from '@tanstack/react-query'
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TMembers } from "../types/members";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataTable } from "../components/DataTable";
import { members as membersHttp } from '../helpers/http';
import { LoadingState } from '../components/LoadingBackdrop';

export const ListMembers = () => {
  const [members, setMembers] = useState<TMembers>([]);
  
  const {isPending, isError, data, error} = useQuery({
    queryKey: ['members'],
    queryFn: membersHttp.fetch
  });

  useEffect(() => {
    if (data) setMembers(data);
  }, [data]);

  if (isPending) return <LoadingState />

  if (isError) {
    return <span>Error: {error.message}</span>
  }

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
          <Link to="/members/new">
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
            { field: 'firstName', headerName: 'First name', width: 130 },
            { field: 'lastName', headerName: 'Last name', width: 130 },
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
                  <Link to={`/members/${params.row.id}`}>
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