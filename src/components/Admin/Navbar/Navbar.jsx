import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {Notification} from '../../Notification/Notification';

import { Link, Redirect } from "react-router-dom";

import "./Navbar.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userType");
    console.log('logout', localStorage.getItem('userToken'));
    Notification('You logged out successfully');
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {localStorage.getItem("userToken") === null ? (
        <div>
          <Link className="link-button" to="/login">
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link className="link-button" to="/register">
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </Link>
        </div>
      ) : (
        <div>
          <Link className="link-button" to="/forgot-password">
            <MenuItem onClick={handleMenuClose}>Forgot password</MenuItem>
          </Link>

          <Link className="link-button" to="/profile">
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          <Link className="link-button" to="/logout">
            <MenuItem
              onClick={() => {
                handleMenuClose();
                logoutHandler();
              }}
            >
              Logout
            </MenuItem>
          </Link>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {localStorage.getItem("userToken") === null ? (
        <div>
          <Link className="link-button" to="/login">
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link className="link-button" to="/register">
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </Link>
        </div>
      ) : (
        <div>
          <Link className="link-button" to="/forgot-password">
            <MenuItem onClick={handleMenuClose}>Forgot password</MenuItem>
          </Link>

          <Link className="link-button" to="/profile">
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          <Link className="link-button" to="/logout">
            <MenuItem 
              onClick={() => {
                handleMenuClose();
                logoutHandler();
              }}
            >Logout</MenuItem>
          </Link>
        </div>
      )}

      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <MailIcon />
        </IconButton>
        <p>Messagess</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
            <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  const [temp, setTemp ] = React.useState('');
  const setTempHandler = ()=>{
    setTimeout(()=>{
      setTemp(localStorage.getItem("userEmail"));
    }, 1000);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => {
              props.setHideSidebar(!props.hideSidebar);
              props.sidebarTransitionStyleHandler();
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Notebook
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {setTempHandler()}  
            
          { localStorage.getItem("userToken") !== null ? (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <span style={{fontSize:"14px"}}>{localStorage.getItem("userEmail")}</span>
              </IconButton>
            ) : null }
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {localStorage.getItem("userToken") !== null ? (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <span style={{fontSize:"12px"}}>{localStorage.getItem("userEmail")}</span>
              </IconButton>
            ) : null}
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
