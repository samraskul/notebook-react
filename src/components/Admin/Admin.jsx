import Sidebar from "./Sidebar/Sidebar";
import "./Admin.css";
import Page from "../../Pages/Page";
import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Slide from "@mui/material/Slide";
import {get, apiURL} from '../../api/backend';
import {Notification} from '../Notification/Notification';

const Admin = () => {
  const [userLoggedIn, setUserLoggedIn] = useState("admin default"); // never used, just for rerender and redirect!

  const [adminActiveMenu, setAdminActiveMenu] = useState({});
  const adminActiveMenuHandler = (activeMenu) => {
    // console.log("activeMenuIdFromAdmin", activeMenu);
    setAdminActiveMenu(activeMenu);
  };

  // let sidebarTimeout = 0;
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  let sidebarTimeout = 100;
  useEffect(() => {
    
    console.log('1adskfjlaj');
    

    get(apiURL + "/check")
    .then((data) => {
      //console.log('sslaksjdflkajsdlf', localStorage.getItem("userToken").length > 0);
    })
    .catch((e) =>{
      console.log(e);
      if(localStorage.getItem("userToken").length > 0){
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userType");
        Notification('Your cookie has wrong token, please log in again', 'danger', 'Error');
      }
      console.log('e', 'there is an error while you tried to logged in');
    });
   
    sidebarTimeout = 0;
    handleWindowSizeChange();
    sidebarTransitionStyleHandler();
  }, []);
  let isMobile = width <= 768 ? true : false;

  const [hideSidebar, setHideSidebar] = useState(isMobile);

  const [sidebarTransitionStyle, setSidebarTransitionStyle] = useState({
    gridTemplateColumns: "280px 1fr"
  });

  const sidebarTransitionStyleHandler = () => {
    console.log("runned in useEffect");
    setHideSidebar(!hideSidebar);
    if (hideSidebar) {
      setTimeout(() => {
        setSidebarTransitionStyle({ gridTemplateColumns: "0 1fr" });
      }, sidebarTimeout);
    } else {
      setSidebarTransitionStyle({ gridTemplateColumns: "280px 1fr" });
    }
    // sidebarTimeout = 100;
  };

  return (
    <div
      className="admin-container"
      //style={{ gridTemplateColumns: hideSidebar ? "0 1fr" : "280px 1fr" }}
      style={sidebarTransitionStyle}
    >
      <div className="admin-container-navbar">
        <Navbar
          hideSidebar={hideSidebar}
          setHideSidebar={setHideSidebar}
          sidebarTransitionStyleHandler={sidebarTransitionStyleHandler}
        />
      </div>
      <div className="admin-container-sidebar">
        <Slide direction="right" in={hideSidebar} mountOnEnter unmountOnExit>
          <div>
            <Sidebar
              adminActiveMenuHandler={adminActiveMenuHandler}
              userLoggedIn={userLoggedIn}
              setUserLoggedIn={setUserLoggedIn}
            />
          </div>
        </Slide>
      </div>
      <Page
        setUserLoggedIn={setUserLoggedIn}
        className="admin-container-page"
        adminActiveMenu={adminActiveMenu}
      />
    </div>
  );
};

export default Admin;
