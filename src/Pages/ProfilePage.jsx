import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const ProfilePage = () => {

  let fullURL = window.location.href;
  let domain = fullURL.slice(0, fullURL.indexOf('/', 8));
  
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
    >
      <form>
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          inputProps={{ readOnly: true }}
        />
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          type="password"
        />
        <TextField
          id="standard-basic"
          label="password confirm"
          variant="standard"
          type="password"
        />
        <FormControl component="fieldset" style={{ marginTop: "30px" }}>
          <FormLabel component="legend">Account type</FormLabel>
          <RadioGroup
            aria-label="account-type"
            defaultValue="public"
            name="account-type"
          >
            <Tooltip title="Nobody can see your page" placement="right">
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </Tooltip>
            <Tooltip title="Every body can see your page" placement="right">
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
            </Tooltip>
          </RadioGroup>
          <Tooltip
            title="If your account is public, people can see your content with through link:"
            placement="bottom"
          >
            <a
              style={{ fontSize: "12px" }}
              href={domain + "/?user=" + localStorage.getItem('userId')}
            >
              {domain + "/?user=" + localStorage.getItem('userId')}
            </a>
          </Tooltip>
        </FormControl>
        <div style={{ marginTop: "30px" }}>
          <Button variant="contained">Update</Button>
        </div>
      </form>
    </Box>
  );
};

export default ProfilePage;
