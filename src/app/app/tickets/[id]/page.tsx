"use client"
import { Box, Container, Paper } from "@mui/material";

export default function SystemTicketChat({ params }: { params: { id: string }}) {
  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: 5 }}>
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 5 }}>
        <Box>
          <p>Ticket Id: {params.id}</p>
        </Box>
      </Paper>
    </Container>
  )
}
