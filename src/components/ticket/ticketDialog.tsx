"use client"
import yup from "@/helpers/validation";
import { TicketService } from "@/services/api/ticket.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Data = {
  title: string,
  description: string
}

interface Props {
  isOpen: boolean;
  onClose: () => void
}

const schema = yup.object({
  title: yup.string().max(40).required(),
  description: yup.string().required()
})

export default function TicketDialog({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { handleSubmit, register, formState: { errors } } = useForm<Data>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: ""
    }
  })

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
    <Dialog open={isOpen} onClose={onClose} component='form' onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Ticket</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter some information below to have your ticket opened.</DialogContentText>
        <TextField label="Title" margin="dense" variant="filled" fullWidth error={!!errors.title} helperText={errors.title?.message} {...register("title")} />
        <TextField label="Description" margin="dense" variant="filled" fullWidth multiline rows={3} error={!!errors.description} helperText={errors.description?.message} {...register("description")} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={loading}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}