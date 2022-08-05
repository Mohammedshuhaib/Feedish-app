import React, { useState } from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { GOOGLE_CLIENT_ID } from '../../../config';
import { gapi } from 'gapi-script'
import { EmailRounded } from '@mui/icons-material';


function Login(props) {

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.onChange()
  };

  gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId: GOOGLE_CLIENT_ID,
      plugin_name: 'chat',
    });
  });

  const handleFailure = (result) => {
    console.log(result);
  };

  const handleLogin = async (googleData) => {
    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:2000/google_signup',
        data: {
          token: googleData.tokenId,
        },
      });
      console.log(res);
     
      if (res) {
        handleClose();
        props.setUserLogin(true);
        localStorage.setItem('login',true)
      }

      
    } catch (err) {
      handleClose();
      localStorage.setItem('login',true)
      props.setUserLogin(true);
    }
  };

  return (
    <div>
      <Dialog className='FormContaier' open={open} maxWidth={'xs'} onClose={handleClose}>
      <DialogTitle>Signin</DialogTitle>
      <DialogContent >
        <TextField className='inputField'
         id="outlined-multiline-flexible"
        maxRows={4}
          margin="dense"
          label="Phone number"
          type="number"
          fullWidth
        />
        <div className="signupButton">
        <Button variant='contained'>Send one time password</Button>
        </div>
        <div className="orContainer">
            <p>or</p>
        </div>
        <div className="emailLogin">
          <EmailRounded/>
          <p className="emailLoginText">Continue with Email</p>
        </div>
        <div className="googleSignup">   
                <GoogleLogin
                  className="googleButton"
                  clientId={GOOGLE_CLIENT_ID}
                buttonText = 'Continue with Google'
                onSuccess = {handleLogin}
                onFailure = {handleFailure}
                cookiePolicy='single_host_origin'>  

                </GoogleLogin>
        </div>
        <div className="goToGoogle">
            <p>
              Not registered yet ?
              <span > Please Register</span>
            </p>
          </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default Login
