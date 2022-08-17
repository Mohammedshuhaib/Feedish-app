import React from 'react'
import Grid from '@mui/material/Grid';
import './AdminLogin.css'
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

function AdminLogin() {
  return (
    <Grid className='loginOuterPage'container>
        <Grid className='loginPageContainer' sx={{ borderRadius: 5, boxShadow: 1 }} item md={4} >
          <form>
          <Grid sx={{ mt:4, mx:3}}>
            <h1 >Login</h1>
            </Grid>
            <Grid sx={{ mt:3, mx:3}}>
            <TextField fullWidth id="standard-basic" label="Standard" variant="standard" />
            </Grid>
            <Grid sx={{ mt:3, mx:3}}>
            <TextField fullWidth id="standard-basic" label="Standard" variant="standard" />
            </Grid>
            <Grid sx={{ mx:3, mt:3 }}>
                <Box sx={{textAlign:'right'}} className='forgotPassword'>Forgot password ?</Box>
            </Grid>
            <Grid sx={{ mt:3, mb:5,mx:5}}>
              <Button fullWidth variant={'contained'}>Login now</Button>
            </Grid>
          </form>
            
        </Grid>
    </Grid>
  )
}

export default AdminLogin