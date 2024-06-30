import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { TMember, TMembers } from "../types/members";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const ListMembers = () => {
  const [members, setMembers] = useState<TMembers>([]);

  useEffect(() => {
    fetch('http://localhost:3000/library/members')
      .then(response => response.json())
      .then(data => setMembers(data))
  }, []);

  console.log(members);

  return (
    <div>
      <h1>List Members (total: {members.length})</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {members.map((member: TMember) => (
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
              <div>{member.firstName}</div>
              <div>{member.lastName}</div>
              <div>{member.phoneNumber}</div>
              <div>{member.email}</div>
            </Box>
            <Box>
              <Link to={`/members/${member._id}`}>
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