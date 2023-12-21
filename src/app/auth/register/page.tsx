"use client"
import yup from "@/helpers/validation";
import { UsersService } from "@/services/api/users.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Container, CssBaseline, Link, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Data = {
  username: string,
  email: string,
  password: string
}

const schema = yup.object({
  username: yup.string().max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

export default function AuthLogin() {
  const { handleSubmit, register, formState: { errors } } = useForm<Data>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSubmit = async (data: Data) => {
    try {
      setLoading(true)
      await UsersService.create(data.username, data.email, data.password)

      toast.success('Account created successfully!')
      router.push('/auth/login')
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Account cannot be created.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper elevation={3} component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='h5' fontWeight='bold'>Register</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TextField label='Username' error={!!errors.username} helperText={errors.username?.message} {...register("username")} />
            <TextField label='Email' error={!!errors.email} helperText={errors.email?.message} {...register("email")} />
            <TextField type='password' error={!!errors.password} helperText={errors.password?.message} label='Password' {...register("password")} />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', mt: 4, mb: 2 }}>
            <Button type="submit" variant='outlined' disabled={loading} sx={{ width: '100%', height: "56px" }}>{loading ? <CircularProgress size={20} /> : "Register"}</Button>
          </Box>
          <Link href='/auth/login' variant='subtitle2' underline='none'>Already have an account? Login</Link>
        </Paper>
      </Container>
      <Typography variant="caption" sx={{ color: 'gray' }} mt={4}>New Frontiers Team © 2022</Typography>
    </Box>
  )
}
