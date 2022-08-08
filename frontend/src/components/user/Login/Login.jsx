import React, { useState } from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { gapi } from "gapi-script";
import { EmailRounded, PhoneAndroid } from "@mui/icons-material";
import { GOOGLE_CLIENT_ID, SERVER_URL } from "../../../config/config";
import OtpModal from "../OtpModal/OtpModal";

function Login(props) {
  const [open, setOpen] = React.useState(true);
  const [openEmail, setOpenEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [openOtpModal, setOtpModal] = React.useState(false)
  const [err, setErr] = useState("");

  const handleClose = () => {
    setOpen(false);
    props.onChange();
  };

  let handleCloseOtpModal = () => setOtpModal(false)

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: GOOGLE_CLIENT_ID,
      plugin_name: "chat",
    });
  });

  const handleFailure = (result) => {
    console.log(result);
  };

  const handleLogin = async (googleData) => {
    try {
      const res = await axios({
        method: "post",
        url: `${SERVER_URL}/google_signup`,
        data: {
          token: googleData.tokenId,
        },
      });
      console.log(res);

      if (res) {
        handleClose();
        props.setUserLogin(true);
        localStorage.setItem("login", true);
      }
    } catch (err) {
      handleClose();
      localStorage.setItem("login", true);
      props.setUserLogin(true);
    }
  };

  const submitEmail = () => {
    console.log(email);
  };

  const submitMobile = async () => {
    try {
      await axios({
        method: "post",
        url: `${SERVER_URL}/loginMobile`,
        data: {
          mobileNumber,
        },
      });
      setOtpModal(true)
    } catch (err) {
      if (err.response.status === 401) {
        setErr("Mobile number not exists please register");
      }
    }
  };

  return (
    <div>
      <Dialog
        className="FormContaier"
        open={open}
        maxWidth={"xs"}
        onClose={handleClose}
      >
        <DialogTitle>Signin</DialogTitle>
        <DialogContent>
          {openEmail === false && (
            <TextField
              className="inputField"
              id="outlined-multiline-flexible"
              maxRows={4}
              margin="dense"
              label="Phone number"
              type="number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              fullWidth
            />
          )}
          {openEmail && (
            <TextField
              className="inputField"
              id="outlined-multiline-flexible"
              maxRows={4}
              margin="dense"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          )}
          <div className="errorContainer">
            <p className="errorMessage">{err ? err : ""}</p>
          </div>
          <div className="signupButton">
            <Button
              onClick={openEmail ? submitEmail : submitMobile}
              variant="contained"
            >
              Send one time password
            </Button>
          </div>
          <div className="orContainer">
            <p>or</p>
          </div>
          {openEmail === false ? (
            <div
              className="emailLogin"
              onClick={() => {
                setOpenEmail(true);
              }}
            >
              <EmailRounded />
              <p className="emailLoginText">Continue with Email</p>
            </div>
          ) : (
            <div
              className="emailLogin"
              onClick={() => {
                setOpenEmail(false);
              }}
            >
              <PhoneAndroid />
              <p className="emailLoginText">Continue with Mobile number</p>
            </div>
          )}
          <div className="googleSignup">
            <GoogleLogin
              className="googleButton"
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Continue with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy="single_host_origin"
            ></GoogleLogin>
          </div>
          <div className="goToGoogle">
            <p>
              Not registered yet ?<span> Please Register</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
      {openOtpModal && <OtpModal onChange={handleClose} number={mobileNumber} onAction={handleCloseOtpModal}/>}
    </div>
  );
}

export default Login;
