import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Menu1 from "./partials/Menu1";
import { get } from "../../../api/backend";
import { post } from "../../../api/backend";
import { destroy } from "../../../api/backend";
import TextField from "@mui/material/TextField";
import "./Sidebar.css";

const Sidebar = (props) => {
  
  const [activeElementIds, setActiveElementIds] = useState([]);

  const [menuFromApi, setMenuFromApi] = useState([]);

  //   const menuFromApi = [
  //     {
  //       id: 1,
  //       name: "Dashboard-head",
  //       parentId: null,
  //       icon: null,
  //       link: "/dashboard"
  //   ];

  const location = useLocation();

  useEffect(() => {
    // console.log('location', location);
    const navbarData = get("/navbar-menus" + location.search );
    navbarData.then((data) => {
      setMenuFromApi([...data.data.data]);
      // props.setUserLoggedIn(5);
      // console.log('sidebar changed', props.userLoggedIn);
      // let m = {id:1};
      // setActiveElementIdsdddd(1);
      // props.setUserLoggedIn('sidebar component called');
    }).catch(e=>{
      console.log('Error (sidebar.jsx)::Failed to get menu content');
      setMenuFromApi([]);
    });
  }, [ props.userLoggedIn]);
  // }, [ localStorage.getItem('user')]);

  const activeElementIdHandler = (element) => {
    props.adminActiveMenuHandler(element);

    let elementId = element.id;
    let oldIds = [];
    let ids = [elementId];
    let parentIds = (elementId) => {
      let currentMenuFromApiItemParentId = null;
      menuFromApi.forEach((item) => {
        if (item.id === elementId) {
          currentMenuFromApiItemParentId = item.parentId;
        }
      });

      if (currentMenuFromApiItemParentId) {
        ids.push(currentMenuFromApiItemParentId);
        oldIds.push(currentMenuFromApiItemParentId);
        parentIds(currentMenuFromApiItemParentId);
      }
    };

    parentIds(elementId);

    if (JSON.stringify(activeElementIds) === JSON.stringify(ids)) {
      setActiveElementIds(oldIds);
    } else {
      setActiveElementIds(ids);
    }
  };

  const newMenuHandler = (
    parentId,
    name,
    isPost = null,
    icon = null,
    order = 1000
  ) => {
    let newEl = {
      name: name,
      parentId: parentId,
      icon: icon,
      link: isPost,
      order: order
    };

    console.log("newEl", newEl);

    let newMenu = [...menuFromApi, newEl];

    post("/navbar-menus", {
      data: [...newMenu]
    }).then((data) => {
      console.log("res", data.data.data);
      setMenuFromApi([...data.data.data]);
    });

    let newEl2 = {};
    let newMenu2 = [];
    newMenu.forEach((item) => {
      if (item.id >= 0) {
        newMenu2.push(item);
      } else {
        let tmpItem = {};
        tmpItem.name = item.name;
        tmpItem.parentId = item.parentId;
        tmpItem.icon = item.icon;
        tmpItem.link = item.link;
        tmpItem.order = item.order;
        tmpItem.id = newMenu.length;

        newEl2.name = item.name;
        newEl2.parentId = item.parentId;
        newEl2.icon = item.icon;
        newEl2.link = item.link;
        newEl2.order = item.order;
        newEl2.id = newMenu.length;

        newMenu2.push(tmpItem);
      }
    });
  };

  const editMenuHandler = (
    menuId,
    menuParentId,
    menuName,
    menuIcon = null,
    menuOrder = null
  ) => {
    let data = [];
    if (menuParentId === "currentParent") {
      data = [
        {
          name: menuName,
          icon: menuIcon,
          order: menuOrder
        }
      ];
    } else {
      data = [
        {
          parentId: menuParentId,
          name: menuName,
          icon: menuIcon,
          order: menuOrder
        }
      ];
    }
    post("/navbar-menus-edit/" + menuId, { data }).then((data) => {
      console.log("editMenuHandler menu id:" + menuId);
      setMenuFromApi([...data.data.data]);
    });
  };

  const deleteMenuHandler = (menuId) => {
    console.log("deleteMenuHandler menu id" + menuId);
    get("/navbar-menus-delete/" + menuId).then((data) => {
      console.log(data);
      setMenuFromApi([...data.data.data]);
    });
  };

  // start++++ add menu btn
  const menuInputsRef = useRef();
  const addMenuBtnHandler = () => {
    if (menuInputsRef.current.style.display === "none") {
      menuInputsRef.current.style.display = "block";
    } else {
      menuInputsRef.current.style.display = "none";
    }
    console.log("clicked parent menu btn");
  };
  const addSubMenuHandler = (e) => {
    e.preventDefault();
    let parentId = null;
    let subMenuName = e.target.children[0].value;
    let icon = e.target.children[1].value;
    if (icon.length == 0) {
      //default icon for menus
      icon = "fas fa-bars";
    }

    newMenuHandler(parentId, subMenuName, null, icon);

    e.target.children[0].value = "";
    e.target.children[1].value = "";
    if (menuInputsRef.current.style.display === "none") {
      menuInputsRef.current.style.display = "block";
    } else {
      menuInputsRef.current.style.display = "none";
    }
  };
  // end------ add menu btn

  const searchInputRef = useRef();
  const [searchInputValue, setSearchInputValue] = useState("");
  const searchInputChangeHandler = () => {
    setSearchInputValue(searchInputRef.current.value);
  };

  return (
    // <div>k</div>
    <div className="accordian">
      <div style={{ margin: "10px 5px" }}>
        <form action="">
          <TextField
            onChange={searchInputChangeHandler}
            value={searchInputValue}
            ref={searchInputRef}
            id="standard-basic"
            label="search in menus"
            variant="standard"
            InputLabelProps={{
              style: { fontSize: "12px" }
            }}
          />
        </form>
      </div>

      {((localStorage.getItem('userToken')) && (!useLocation().search.length)) ? <button
        className="menu-add-btn"
        onClick={() => {
          addMenuBtnHandler();
        }}
        style={{
          // marginLeft: "5px",
          marginBottom:"5px",
          padding: "3px",
          fontSize: "11px",
          border: "none",
          backgroundColor: "white",
          fontWeight:"bold"
        }}
      >
        <i style={{ marginRight: "2px" }} className="fa fa-plus "></i>
        Menu
      </button>:null}
      <form
        action=""
        onSubmit={(e) => {
          addSubMenuHandler(e);
        }}
        ref={menuInputsRef}
        style={{ display: "none" }}
        className='container-sidebar'
      >
        <input className="input-sidebar" type="text" name="name" placeholder="Folder name" />
        {/* <input type="text" name="icon" placeholder="Icon (ex: fas fa-bar)" /> */}
        <button className="btn-sidebar">add folder</button>
      </form>
      {menuFromApi.map((menu1, index) => {
        return (
          <Menu1
            key={index}
            menu1={menu1}
            menuFromApi={menuFromApi}
            activeElementIdHandler={activeElementIdHandler}
            activeElementIds={activeElementIds}
            newMenuHandler={newMenuHandler}
            editMenuHandler={editMenuHandler}
            deleteMenuHandler={deleteMenuHandler}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;

{
  /* <div id="accordian">
  <ul class="show-dropdown">
      <li>
          <a href="javascript:void(0);"><i class="fas fa-tachometer-alt"></i>Dashboard</a>
      </li>
      <li>
          <a href="javascript:void(0);"><i class="far fa-address-book"></i>Address Book</a>
          <ul>
              <li><a href="javascript:void(0);">Reports</a></li>
              <li><a href="javascript:void(0);">Search</a></li>
              <li><a href="javascript:void(0);">Graphs</a></li>
              <li><a href="javascript:void(0);">Settings</a></li>
          </ul>
      </li>
      <li class="active">
          <a href="javascript:void(0);"><i class="far fa-clone"></i>Components</a>
          <ul class="show-dropdown">
              <li><a href="javascript:void(0);">Today's tasks</a></li>
              <li class="active">
                  <a href="javascript:void(0);">DrillDown (active)</a>
                  <ul class="show-dropdown">
                      <li><a href="javascript:void(0);">Today's tasks</a></li>
                      <li class="active"><a href="javascript:void(0);">Urgent</a></li>
                      <li>
                          <a href="javascript:void(0);">Overdues</a>
                          <ul>
                              <li><a href="javascript:void(0);">Today's tasks</a></li>
                              <li><a href="javascript:void(0);">Urgent</a></li>
                              <li><a href="javascript:void(0);">Overdues</a></li>
                              <li><a href="javascript:void(0);">Recurring</a></li>
                              <li>
                                  <a href="javascript:void(0);">Calendar</a>
                                  <ul>
                                      <li><a href="javascript:void(0);">Current Month</a></li>
                                      <li><a href="javascript:void(0);">Current Week</a></li>
                                      <li><a href="javascript:void(0);">Previous Month</a></li>
                                      <li><a href="javascript:void(0);">Previous Week</a></li>
                                      <li><a href="javascript:void(0);">Next Month</a></li>
                                      <li><a href="javascript:void(0);">Next Week</a></li>
                                      <li><a href="javascript:void(0);">Team Calendar</a></li>
                                      <li><a href="javascript:void(0);">Private Calendar</a></li>
                                      <li><a href="javascript:void(0);">Settings</a></li>
                                  </ul>
                              </li>
                          </ul>
                      </li>
                      <li><a href="javascript:void(0);">Recurring</a></li>
                      <li><a href="javascript:void(0);">Settings</a></li>
                  </ul>
              </li>
              <li>
                  <a href="javascript:void(0);">Overdues</a>
                  <ul>
                      <li><a href="javascript:void(0);">Today's tasks</a></li>
                      <li><a href="javascript:void(0);">Urgent</a></li>
                      <li><a href="javascript:void(0);">Overdues</a></li>
                      <li><a href="javascript:void(0);">Recurring</a></li>
                      <li><a href="javascript:void(0);">Settings</a></li>
                  </ul>
              </li>
              <li><a href="javascript:void(0);">Recurring</a></li>
              <li><a href="javascript:void(0);">Settings</a></li>
          </ul>
      </li>
      <li>
          <a href="javascript:void(0);"><i class="far fa-calendar-alt"></i>Calendar</a>
          <ul>
              <li><a href="javascript:void(0);">Current Month</a></li>
              <li><a href="javascript:void(0);">Current Week</a></li>
              <li><a href="javascript:void(0);">Previous Month</a></li>
              <li><a href="javascript:void(0);">Previous Week</a></li>
              <li><a href="javascript:void(0);">Next Month</a></li>
              <li><a href="javascript:void(0);">Next Week</a></li>
              <li><a href="javascript:void(0);">Team Calendar</a></li>
              <li><a href="javascript:void(0);">Private Calendar</a></li>
              <li><a href="javascript:void(0);">Settings</a></li>
          </ul>
      </li>
      <li>
          <a href="javascript:void(0);"><i class="far fa-chart-bar"></i>Charts</a>
          <ul>
              <li><a href="javascript:void(0);">Global favs</a></li>
              <li><a href="javascript:void(0);">My favs</a></li>
              <li><a href="javascript:void(0);">Team favs</a></li>
              <li><a href="javascript:void(0);">Settings</a></li>
          </ul>
      </li>
      <li>
          <a href="javascript:void(0);"><i class="far fa-copy"></i>Documents</a>
      </li>
      <li>
          <a href="javascript:void(0);"><i class="far fa-bookmark"></i>Bookmarks</a>
      </li>
      <li>
          <a href="javascript:void(0);"><i class="far fa-envelope"></i>Mail</a>
      </li>
      <li>
          <a href="javascript:void(0);"><i class="far fa-heart"></i>Favorite</a>
      </li>

  </ul>
</div> */
}
