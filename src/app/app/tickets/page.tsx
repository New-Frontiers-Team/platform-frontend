"use client"
import { TicketService } from "@/services/api/ticket.service";
import { Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, useForkRef } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    flex: 1
  },
  {
    field: 'user',
    headerName: 'User',
  },
  {
    field: 'status',
    headerName: 'Status',
  },
  {
    field: 'date',
    headerName: 'Date',
  }
];

const rows = [
  { id: 1, title: 'Game script bug', status: 'Pending', date: '12/12/2023' },
  { id: 2, title: 'Help on pucharse', status: 'Resolved', date: '01/04/2023' },
  { id: 3, title: 'Game script bug', status: 'Pending', date: '01/04/2023' },
  { id: 4, title: 'Game script bug', status: 'Resolved', date: '01/04/2023' },
  { id: 5, title: 'Game script bug test', status: 'Pending', date: '01/04/2023' },
];

type Data = {
  title: string,
  description: string
}

export default function SystemTicket() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { handleSubmit, register } = useForm<Data>({
    defaultValues: {
      title: "",
      description: ""
    }
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (data: Data) => {
    try {
      setLoading(true)
      const ticket = await TicketService.create(data.title, data.description)
      router.push(`/app/tickets/${ticket.id}`)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: 5 }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4">Tickets</Typography>
          <Button variant="outlined" size="large" onClick={handleClickOpen}>Create</Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField type="search" placeholder="Search" fullWidth />
            <FormControl sx={{ width: '20%' }} >
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue={1}>
                <MenuItem value={1}>All</MenuItem>
                <MenuItem value={2}>Pending</MenuItem>
                <MenuItem value={3}>Resolved</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  user: false
                }
              }
            }}
          />
        </Box>
      </Paper>
      <Dialog open={open} onClose={handleClose} component='form' onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter some information below to have your ticket opened.</DialogContentText>
          <TextField autoFocus required label="Title" margin="dense" variant="filled" fullWidth {...register("title")} />
          <TextField autoFocus required label="Description" margin="dense" variant="filled" fullWidth multiline rows={3} {...register("description")} disabled={loading} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
