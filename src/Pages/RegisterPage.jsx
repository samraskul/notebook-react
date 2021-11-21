import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { apiURL } from "../api/backend";
import { redirectAfterLogin } from "../api/backend";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {Notification} from '../components/Notification/Notification';

const RegisterPage = (props) => {

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [typeInput, setTypeInput] = useState('public');

  const emailInputChangeHandler = (e)=>{
    setEmailInput(e.target.value);
  };

  const passwordInputChangeHandler = (e)=>{
    setPasswordInput(e.target.value);
  };

  const passwordConfirmInputChangeHandler = (e)=>{
    setPasswordConfirmInput(e.target.value);
  };

  const typeInputChangeHandler = (type)=>{
    setTypeInput(type);
  };

  const registerHandler = ()=>{
    axios.post(apiURL + '/register', {
      'username': emailInput,
      'password': passwordInput,
      'passwordConfirm': passwordConfirmInput,
      'type': typeInput,
    }).then(data=>{
      console.log('register data', data);
      props.saveUserInformation(data.data.access_token);
      // localStorage.setItem("userToken", data.data.access_token);
      props.setUserLoggedIn('register component called RegisterPage.jsx');
    }).catch(e=>{
      console.log('e', 'there is an error while you tried to logged in');
      Notification('There is a problem with your registration. Either you have been registered before and your password is wrong OR this account does not belongs to you. try with different email address. thank you!', 'danger', 'Error');
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
          <TextField id="standard-basic" label="email" variant="standard" value={emailInput} onChange={emailInputChangeHandler} />
          <TextField
            id="standard-basic"
            label="password"
            value={passwordInput}
            variant="standard"
            type="password"
            onChange={passwordInputChangeHandler}
          />
          <TextField
            id="standard-basic"
            label="password confirm"
            variant="standard"
            type="password"
            value={passwordConfirmInput}
            onChange={passwordConfirmInputChangeHandler}
          />
          <FormControl component="fieldset" style={{ marginTop: "30px" }}>
            <FormLabel component="legend">Account type</FormLabel>
            <RadioGroup
              aria-label="account-type"
              defaultValue="public"
              name="account-type"
            >
              <Tooltip title="Every body can see your page" placement="right">
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                  onClick={()=>typeInputChangeHandler('public')}
                />
              </Tooltip>
              <Tooltip title="Nobody else can see your page" placement="right">
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private"
                  onClick={()=>typeInputChangeHandler('private')}
                />
              </Tooltip>
            </RadioGroup>
          </FormControl>
          <div style={{ marginTop: "30px" }}>
            <Button variant="contained" onClick={registerHandler}>Register</Button>
          </div>
        </form>
        ) : (
          <Redirect to={redirectAfterLogin} />
        )}
    </Box>
  );
};

export default RegisterPage;
