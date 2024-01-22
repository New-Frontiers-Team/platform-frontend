"use client"
import { TicketService } from "@/services/api/ticket.service";
import { Box, Button, CircularProgress, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, useForkRef } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const columns: GridColDef[] = [
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
    field: 'createdAt',
    width: 120,
    headerName: 'Date',
    valueFormatter(params) {
      return params.value ? (new Date(params.value)).toLocaleDateString() : ''
    },
  }
];

type Data = {
  title: string,
  description: string
}

export default function SystemTickets() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tickets, setTickets] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 5
  })
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const tickets = await TicketService.findTickets(pagination.page + 1, pagination.pageSize)

        setTickets(tickets.data)
        setTotal(tickets.meta.total)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [pagination])

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
      toast.success('Ticket created successfully!')
    } catch (e) {
      toast.error('Something went wrong!')
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
          {total ? <Button variant="outlined" size="large" onClick={handleClickOpen}>Create</Button> : null}
        </Box>
        {total ?
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <DataGrid
                rows={tickets}
                loading={loading}
                columns={columns}
                paginationMode="server"
                pageSizeOptions={[5, 10, 15, 20, 25]}
                paginationModel={pagination}
                onPaginationModelChange={setPagination}
                rowCount={total}
                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      user: false
                    }
                  }
                }}
              />
            </Box>
          </Box> :
          <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant="h4">You do not have any tickets at the moment</Typography>
            <Typography variant="overline">You can create a ticket for our team to resolve your issue!</Typography>
            <Button variant="outlined" size="large" onClick={handleClickOpen} sx={{mt: 2}}>Create ticket</Button>
          </Box>
        }
      </Paper>
      <Dialog open={open} onClose={handleClose} component='form' onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter some information below to have your ticket opened.</DialogContentText>
          <TextField autoFocus required label="Title" margin="dense" variant="filled" fullWidth {...register("title")} />
          <TextField autoFocus required label="Description" margin="dense" variant="filled" fullWidth multiline rows={3} {...register("description")} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? <CircularProgress size={20} /> : "Create"}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
