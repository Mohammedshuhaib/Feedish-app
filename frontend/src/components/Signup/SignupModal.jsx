import React, { useState,useEffect } from 'react'
import './Signup.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleLogin from 'react-google-login'
import { useCookies } from 'react-cookie'
import axios from 'axios'
function Signup(props) {
    const [cookies, setCookies] = useCookies()
    const [open, setOpen] = React.useState(true);
    const [signupData , setSignupData] = useState(
        cookies.signupData ? cookies.signupData : null
    )
    const handleClose = () => {
      setOpen(false);
      props.onChange()
    };

    const handleFailure= (result) => {
        console.log(result)
    }

    const handleLogin = async (googleData) => {
       const res = await axios({
        method:'post',
        url:'http://localhost:3000/google_signup',
        data:{
            token:googleData.tokenId
        }
       })
       console.log(res)
       setSignupData(res)
       setCookies('signupData',res, {path:'/'})
    }
  return (
    <div>
    <Dialog className='FormContaier' open={open} maxWidth={'xs'} onClose={handleClose}>
      <DialogTitle>Signup</DialogTitle>
      <DialogContent >
      <TextField className='inputField'
       id="outlined-multiline-flexible"
       maxRows={4}
          label="Name"
          type="text"
          fullWidth
          mt={4}
        />
        <TextField className='inputField'
         id="outlined-multiline-flexible"
        maxRows={4}
          margin="dense"
          label="Phone number"
          type="number"
          fullWidth
        />
        <TextField className='inputField'
         id="outlined-multiline-flexible"
        maxRows={4}
          margin="dense"
          label="Email"
          type="email"
          fullWidth
        />
        <div className="signupButton">
        <Button variant='contained'>Send one time password</Button>
        </div>
        <div className="orContainer">
            <p>or</p>
        </div>
        <div className="googleSignup">
            {
               signupData ? (
                props.setUserLogin(true)
               )
               :
               (
                <GoogleLogin
                clientId = {'1098827480635-579qqn6hu6bguptra87qbqlt6bearsk5.apps.googleusercontent.com'}
                buttonText = 'Signup with Google'
                onSuccess = {handleLogin}
                onFailure = {handleFailure}
                cookiePolicy='single_host_origin'>  
                </GoogleLogin>
               )
            }
           
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default Signup
