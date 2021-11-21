import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { apiURL } from "../api/backend";
import { redirectAfterLogin } from "../api/backend";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {Notification} from '../components/Notification/Notification';

const LoginPage = (props) => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const emailInputChangeHandler = (e) => {
    setEmailInputValue(e.target.value);
  };

  const passwordInputChangeHandler = (e) => {
    setPasswordInputValue(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    console.log("apiURL", apiURL);

    axios
      .post(apiURL + "/login", {
        username: emailInputValue,
        password: passwordInputValue
      })
      .then((data) => {
        console.log("login.data", data);
        props.saveUserInformation(data.data.access_token);
        // console.log('localStorage', localStorage.getItem('user'));
        props.setUserLoggedIn('login component called');
      })
      .catch((e) =>{
        console.log('e', 'there is an error while you tried to logged in');
        Notification('Your username or password is wrong', 'danger', 'Error');
      });
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
    >
      {localStorage.getItem("userToken") === null ? (
        <form>
          <TextField
            id="standard-basic"
            label="email"
            value={emailInputValue}
            variant="standard"
            onChange={emailInputChangeHandler}
          />
          <TextField
            onChange={passwordInputChangeHandler}
            value={passwordInputValue || ""}
            id="standard-basic"
            label="password"
            variant="standard"
            type="password"
          />
          <div style={{ marginTop: "30px" }}>
            <Button variant="contained" type="submit" onClick={loginHandler}>
              Login
            </Button>
          </div>
        </form>
      ) : (
        <Redirect to={redirectAfterLogin} />
      )}
    </Box>
  );
};

export default LoginPage;
