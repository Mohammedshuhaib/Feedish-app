import React,{useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OTPInput, { ResendOTP } from "otp-input-react";
import { Button } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../../config/config';

function OtpModal(props) {
  const [open, setOpen] = React.useState(true); 
  const [OTP, setOTP] = useState("");
  const [err, setErr] = useState('')

  const handleClose = () => {
    setOpen(false);
    props.onAction();
  };

  const renderButton = (buttonProps) => {
    return (
      <button className='otpTimer' {...buttonProps}>
        {buttonProps.remainingTime !== 0 ? `Please wait for ${buttonProps.remainingTime} sec` : "Resend"}
      </button>
    ); 
  };
  const renderTime = () => React.Fragment;

  const submitOtp = async() => {
    if(!OTP) {
      setErr('Cannot left empty')
    }else {
      try{
        await axios({
           url:`${SERVER_URL}/submitEmailOtp`,
           method:'post',
           data:{
             OTP,
             email:props.email
           },
           withCredentials: true
         })
         handleClose()
         props.onChange()
         localStorage.setItem('login', true);
       }catch(err) {
         if(err.response.status === 401) {
           setErr('otp doesnt match')
         }else if( err.response.status === 403) {
           setErr('otp expired please resend')
         }
       }
    }
   
  }

  const resendOtp = async() => {
    if(!OTP) {
      setErr('Cannot left empty')
    }else {
      try{
        await axios({
          method:'post',
          url:`${SERVER_URL}/resendEmailOtp `,
          data:{email: props.email},
        },{withCredentials:true})
      }catch(err) {
       setErr('Network error')
      }
    }
   

  }
  return (
    <div>
       <Dialog
        className="FormContaier"
        open={open}
        maxWidth={'xs'}
        onClose={handleClose}
      >
         <DialogTitle>Enter otp</DialogTitle>
        <DialogContent>
        <OTPInput value={OTP} onChange={setOTP}  tabIndex="0" autoFocus OTPLength={6} otpType="any" disabled={false}  />
        <div className='resentOtpContainer'>
        <ResendOTP className='resentOtpButton' renderButton={renderButton} renderTime={renderTime} onResendClick={resendOtp} />
        </div>
        <div className="errorContainer">
        <p className='errorMessage'>{err}</p>
        </div>
        <div className='submitOtp'>
          
          <Button variant={'contained'} onClick={submitOtp} color={'success'}>Verify</Button>
        </div>
       
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OtpModal
