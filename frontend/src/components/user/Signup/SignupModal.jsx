import React from 'react';
import './Signup.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { gapi } from 'gapi-script';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../validationschema/SignupSchema';
import OtpModal from '../OtpModal/OtpModal';
import { GOOGLE_CLIENT_ID, SERVER_URL } from '../../../config/config';


function Signup(props) {
  const [open, setOpen] = React.useState(true);
  const [err, setErr] = React.useState('')
  const [openOtpModal, setOtpModal] = React.useState(false)
  const [verificationData, setVerificationData] = React.useState('')

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClose = () => {
    setOpen(false);
    props.onChange();
  };

  const submitForm = async (data,e) => {
    setVerificationData(data)
    e.preventDefault()
    try {
      await axios({
        url: `${SERVER_URL}/signup`,
        method: 'post',
        data: {
          Email:data.Email,
          MobileNumber:data.MobileNumber,
          Name:data.Name
        },
 
      },{withCredentials:true});
      setOtpModal(true)
      // handleClose()

    } catch (err) {
      if(err.response.status === 409) {
        setErr('Email address or Mobile number already exist')
      }else{
        setErr('Network error')
      }
    }
  };

  // handle close otp modal

   let handleCloseOtpModal = () => setOtpModal(false)

  gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId: GOOGLE_CLIENT_ID,
      plugin_name: 'chat',
    });
  });
  const handleFailure = (result) => {
   setErr('Some error occure')
  };

// google signup handler  

  const handleLogin = async (googleData) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${SERVER_URL}/google_signup`,
        data: {
          token: googleData.tokenId,
        },
      });

      if (res) {
        handleClose();
        localStorage.setItem('login', true);
      }
    } catch (err) {
      handleClose();
      localStorage.setItem('login', true);
    }
  };
  return (
    <div>
      <Dialog
        className="FormContaier"
        open={open}
        maxWidth={'xs'}
        onClose={handleClose}
      >
        <DialogTitle>Signup</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(submitForm)}>
            <TextField
              className="inputField"
              id="outlined-multiline-flexible"
              maxRows={4}
              label="Name"
              type="text"
              name="Name"
              fullWidth
              mt={4}
              {...register('Name')}
            />
            <p className="errorMessage">{formState.errors.Name?.message}</p>
            <TextField
              className="inputField"
              id="outlined-multiline-flexible"
              maxRows={4}
              margin="dense"
              label="Phone number"
              name="MobileNumber"
              type="number"
              fullWidth
              {...register('MobileNumber')}
            />
            <p className="errorMessage">
              {formState.errors.MobileNumber?.message}
            </p>
           
            <TextField
              className="inputField"
              id="outlined-multiline-flexible"
              maxRows={4}
              margin="dense"
              label="Email"
              name="Email"
              type="email"
              fullWidth
              {...register('Email')}
            />
            <p className="errorMessage">{formState.errors.Email?.message}</p>
            <div className="errorContainer">
            <p className='errorMessage'>{err ? err : ''}</p>
            </div>
            <div className="signupButton">
              <Button type="submit" variant="contained">
                Send one time password
              </Button>
            </div>
          </form>

          <div className="orContainer">
            <p>or</p>
          </div>
          <div className="googleSignup">
            <GoogleLogin
              className="googleButton"
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Signup with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy="single_host_origin"
            ></GoogleLogin>
          </div>
          <div className="goToGoogle">
            <p>
              Already have an account ?<span onClick={props.onAction}> Please login</span>
            </p>
          </div>
        </DialogContent>
        
      </Dialog>
      {openOtpModal && <OtpModal onChange={handleClose} data={verificationData} onAction={handleCloseOtpModal}/>}
      
    </div>
  );
}

export default Signup;
