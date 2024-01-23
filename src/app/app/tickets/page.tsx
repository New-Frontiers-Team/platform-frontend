"use client"
import AuthContext from "@/contexts/auth";
import { isAdmin } from "@/helpers/authorization";
import { TicketService } from "@/services/api/ticket.service";
import { Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import ChatIcon from '@mui/icons-material/Chat';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TicketDialog from "@/components/ticketDialog";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useRouter } from "next/navigation";
import { Ticket } from "@/models/ticket.model";

export default function SystemTickets() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10
  })
  const [total, setTotal] = useState(0)
  const [view, setView] = useState(true)

  const { user } = useContext(AuthContext)
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1
    },
    {
      field: 'user',
      headerName: 'User',
      width: 150,
      valueFormatter(params) {
        return params.value.username
      },
    },
    {
      field: 'responsible',
      headerName: 'Responsible',
      width: 150,
      valueFormatter(params) {
        return params.value ? params.value.username : ''
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,

      renderCell(params) {
        const status = params.value

        let icon, text;
        switch (status) {
          case 'new':
            icon = <ConfirmationNumberIcon />
            text = 'Opened'
            break
          case 'assumed':
            icon = <WorkHistoryIcon />
            text = 'Assumed'
            break;
          case 'closed':
            icon = <CheckCircleIcon />
            text = 'Closed'
            break
          default:
            icon = undefined
        }

        return (
          <div className="flex justify-center">
            {icon}
            <Typography sx={{ ml: 1 }}>{text}</Typography>
          </div>
        )
      },
    },
    {
      field: 'createdAt',
      width: 120,
      headerName: 'Date',
      valueFormatter(params) {
        return params.value ? (new Date(params.value)).toLocaleDateString() : ''
      },
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<ChatIcon />} label="Chat" onClick={() => { router.push(`/app/tickets/${params.id}`) }} />,
        <GridActionsCellItem icon={<PersonAddIcon />} onClick={() => handleAssume(params.row.id)} label="Assume Ticket" disabled={!!params.row.responsible} showInMenu />,
        <GridActionsCellItem icon={<CheckCircleIcon />} label="Close Ticket" showInMenu />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete Ticket" showInMenu />
      ]
    }
  ];

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const tickets = await TicketService.findTickets(pagination.page + 1, pagination.pageSize)

        setTickets(tickets.data)
        setTotal(tickets.meta.total)

        if (user) {
          if (!tickets.meta.total) {
            if (!isAdmin(user.role)) {
              setView(false)
            }
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [pagination])

  const handleAssume = async (id: string) => {
    const ticket = await TicketService.assumeTicket(id)

    setTickets((values) => {
      const tickets = [...values]
      const index = tickets.findIndex((value) => value.id === ticket.id)

      if (index !== -1) {
        tickets[index] = ticket
      }

      return tickets
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: 5 }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4">Tickets</Typography>
          {user ? isAdmin(user.role) ? null : <Button variant="outlined" size="large" onClick={handleClickOpen}>Create</Button> : null}
        </Box>
        {view ?
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
                pageSizeOptions={[10, 20, 30, 40]}
                paginationModel={pagination}
                onPaginationModelChange={setPagination}
                rowCount={total}

                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      user: user ? isAdmin(user.role) : false,
                      actions: user ? isAdmin(user.role) : false,
                    }
                  }
                }}
              />
            </Box>
          </Box> :
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h4">You do not have any tickets at the moment</Typography>
            <Typography variant="overline">You can create a ticket for our team to resolve your issue!</Typography>
            <Button variant="outlined" size="large" onClick={handleClickOpen} sx={{ mt: 2 }}>Create ticket</Button>
          </Box>
        }
      </Paper>
      <TicketDialog isOpen={open} onClose={handleClose} />
    </Container>
  )
}