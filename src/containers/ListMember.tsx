import { Box } from "@mui/material";
import { useEffect, useState } from "react";


export const ListMembers = () => {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/library/members')
      .then(response => response.json())
      .then(data => setMembers(data))
  }, []);

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
        {members.map(member => (
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            margin: 'auto',
            width: '90%',
            gap: 2,
            border: "1px solid black",
            padding: 2,
          }}>
            <div>{member.firstName}</div>
            <div>{member.lastName}</div>
            <div>{member.phoneNumber}</div>
            <div>{member.email}</div>
          </Box>
        ))}
      </Box>
    </div>
  );
}