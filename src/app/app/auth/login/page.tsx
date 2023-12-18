"use client"
import api from "@/helpers/api";
import { AuthService } from "@/services/api/auth.service";
import { Box, Button, Container, CssBaseline, Link, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Data = {
  email: string,
  password: string
}

export default function AuthLogin() {
  const { handleSubmit, register } = useForm<Data>()

  const onSubmit = async (data: Data) => {
    try {
      const response = await AuthService.login(data.email, data.password)
      localStorage.setItem("access-token", response.accessToken)
    } catch (error) {
      console.error(error)
      toast.error('Usuário ou senha incorreto.')
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='h5' fontWeight='bold'>Sign In</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TextField required label='Email' {...register("email")} />
            <TextField required type='password' label='Password' {...register("password")} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', width: '100%', mt: 0.8, mb: 3 }}>
            <Link href='#' variant='subtitle2' underline='none'>Forgot password?</Link>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
            <Button type="submit" variant='outlined' sx={{ width: '100%' }}>Login</Button>
          </Box>
          <Link href='#' variant='subtitle2' underline='none'>Create Account</Link>
        </Paper>
      </Container>
      <Typography variant="caption" sx={{ color: 'gray' }} mt={4}>New Frontiers Team © 2022</Typography>
    </Box>
  )
}
