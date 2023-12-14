import { Avatar, Box, Container, CssBaseline, Paper, Typography } from "@mui/material";
import StarsIcon from '@mui/icons-material/Stars';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function SystemProfile() {
  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: 5 }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 5 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5
        }}>
          <Avatar alt="Profile Avatar" src="/logo.png" sx={{
            width: 96,
            height: 96,
            mb: 1
          }} />
          <Typography variant="h4">Frooszy</Typography>
          <Typography variant="caption" color="text.secondary">Founder</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 0,
            gap: 1
          }}>
            <Paper sx={{
              display: 'flex',
              padding: '10px 16px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography color="text.secondary" variant="overline" fontSize="small" mr={1}>Status:</Typography>
              <Typography variant="overline" >Active account</Typography>
            </Paper>
            <Paper sx={{
              display: 'flex',
              minWidth: 230,
              flexDirection: 'column',
              padding: '10px 16px'
            }}>
              <Typography color="text.secondary" variant="overline" fontSize='small'>Player statistics</Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 0.5
                }}>
                  <AccessTimeFilledIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">95.2 hours played</Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 0.5
                }}>
                  <StarsIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Level 254</Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 0.5
                }}>
                  <HowToRegIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Registered in 12/12/2023</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <Paper sx={{ display: 'flex', height: '100%', width: '100%', padding: '10px 16px', justifyContent: 'center', alignItems: 'center' }}>
              <Typography fontSize={64} variant="button" color="text.secondary">Cooming soon</Typography>
            </Paper>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
