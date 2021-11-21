import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ForgotPasswordPage = () => {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
    >
      <form>
        <TextField id="standard-basic" label="email" variant="standard" />
        <div style={{ marginTop: "30px" }}>
          <Button variant="contained" type="submit">
            Send Email
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default ForgotPasswordPage;
