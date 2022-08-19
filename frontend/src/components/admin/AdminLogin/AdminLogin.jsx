import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import "./AdminLogin.css";
import { Box } from "@mui/system";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../validationschema/adminLoginSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SERVER_URL } from '../../../config/config'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  let navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [err, setErr] = useState('')
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async(data) => {
    try{
      await axios({
        method: 'post',
        url: `${SERVER_URL}/admin/login`,
        data:{
          Email: data.Email,
          Password: data.Password
        }
      })
      navigate('/admin/adminHome')
    }catch(err) {
      console.log(err)
      if(err.response.data.status === 404) {
        setErr('Invalid credential')
      }else if(err.response.data.status === 401) {
        setErr('Invalid password')
      }
    }
  };
  return (
    <Grid className="loginOuterPage" container>
      <Grid
        className="loginPageContainer"
        sx={{ borderRadius: 5, boxShadow: 1 }}
        item
        md={4}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <Grid sx={{ mt: 4, mx: 3 }}>
            <h1>Login</h1>
          </Grid>
          <Grid sx={{ mt: 3, mx: 3 }}>
            <TextField
              fullWidth
              id="standard-basic"
              type={"text"}
              label="Email address"
              variant="standard"
              {...register("Email")}
              defaultValue='admin@gmail.com'
            />
            <p className="errorMessage">{formState.errors.Email?.message}</p>
          </Grid>
          <Grid sx={{ mt: 3, mx: 3 }}>
            <TextField
              fullWidth
              id="standard-basic"
              name="Password"
              label="Password"
              variant="standard"
              {...register("Password")}
              defaultValue='Admin@123'
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <p className="errorMessage">{formState.errors.Password?.message}</p>
          </Grid>
          <Grid sx={{ mx: 'auto', mt: 3 }}>
            <Box sx={{ textAlign: "center" }} className="errorMessage">
              {err ? err : ''}
            </Box>
          </Grid>
          <Grid sx={{ mt: 3, mb: 5, mx: 5 }}>
            <Button type="submit" fullWidth variant={"contained"}>
              Login now
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default AdminLogin;
