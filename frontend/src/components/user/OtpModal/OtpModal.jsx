import React,{useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OTPInput, { ResendOTP } from "otp-input-react";
import { Button } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../../config';

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
    try{
      await axios({
        url:`${SERVER_URL}/submitOtp`,
        method:'post',
        data:{
          OTP,
          data:props.data
        }
      })
      handleClose()
    }catch(err) {
      setErr('Invalid otp')
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
        <ResendOTP className='resentOtpButton' renderButton={renderButton} renderTime={renderTime} onResendClick={() => console.log("Resend clicked")} />
        </div>
        <div className='submitOtp'>
          <p className='errorMessage'>{err}</p>
          <Button variant={'contained'} onClick={submitOtp} color={'success'}>Verify</Button>
        </div>
       
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OtpModal
