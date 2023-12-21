"use client"
import AuthContext from "@/contexts/auth";
import { Box, Button, CircularProgress, Container, CssBaseline, Link, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Data = {
  email: string,
  password: string
}

export default function AuthLogin() {
  const { login } = useContext(AuthContext)

  const { handleSubmit, register } = useForm<Data>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Data) => {
    try {
      setLoading(true)
      await login({ email: data.email, password: data.password })
      toast.success('Logged in successfully!')
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong.')
      }
    } finally {
      setLoading(false)
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
          <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', mt: 0.8, mb: 3 }}>
            <Link href='#' variant='subtitle2' underline='none'>Forgot password?</Link>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
            <Button type="submit" variant='outlined' disabled={loading} sx={{ width: '100%', height: "56px"}}>{loading ? <CircularProgress size={20} /> : "Login"}</Button>
          </Box>
          <Link href='/auth/register' variant='subtitle2' underline='none'>Create Account</Link>
        </Paper>
      </Container>
      <Typography variant="caption" sx={{ color: 'gray' }} mt={4}>New Frontiers Team © 2022</Typography>
    </Box>
  )
}
