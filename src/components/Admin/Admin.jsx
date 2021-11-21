import Sidebar from "./Sidebar/Sidebar";
import "./Admin.css";
import Page from "../../Pages/Page";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Slide from "@mui/material/Slide";

const Admin = () => {
  const [userLoggedIn, setUserLoggedIn] = useState('admin default'); // never used, just for rerender and redirect!

  const [adminActiveMenu, setAdminActiveMenu] = useState({});
  const adminActiveMenuHandler = (activeMenu) => {
    // console.log("activeMenuIdFromAdmin", activeMenu);
    setAdminActiveMenu(activeMenu);
  };

  const [hideSidebar, setHideSidebar] = useState(false);

  const [sidebarTransitionStyle, setSidebarTransitionStyle] = useState({
    gridTemplateColumns: "280px 1fr"
  });

  const sidebarTransitionStyleHandler = () => {
    if (!hideSidebar) {
      setTimeout(() => {
        setSidebarTransitionStyle({ gridTemplateColumns: "0 1fr" });
      }, 100);
    } else {
      setSidebarTransitionStyle({ gridTemplateColumns: "280px 1fr" });
    }
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
        <Slide direction="right" in={!hideSidebar} mountOnEnter unmountOnExit>
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
