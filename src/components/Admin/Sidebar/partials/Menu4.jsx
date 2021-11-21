import { Link } from "react-router-dom";
import Menu5 from "./Menu5";
import IconsInLink from "../SidebarComponents/IconsInLink";

const Menu4 = (props) => {
  let menu4 = props.menu4;
  let menuFromApi = props.menuFromApi;

  const parentMenu = (e, id) => {
    let hasChild = false;

    for (let tempItem of props.menuFromApi) {
      if (tempItem.parentId === id) {
        hasChild = true;
        break;
      }
    }

    if (hasChild) {
      e.preventDefault();
    }
    props.activeElementIdHandler(id);
  };

  const menu2res = () => {
    // console.log("menu4.parentId", menu4);

    if (menu4.parentId === props.currentId) {
      return (
        <ul className="show-dropdown">
          <li
            className={
              props.activeElementIds.includes(menu4.id) ? "active" : ""
            }
          >
            <IconsInLink
              menu={menu4}
              newMenuHandler={props.newMenuHandler}
              editMenuHandler={props.editMenuHandler}
              deleteMenuHandler={props.deleteMenuHandler}
              activeElementIdHandler={props.activeElementIdHandler}
              menuFromApi={props.menuFromApi}
            />
            {/* <Link
              to={menu4.link}
              onClick={(e) => {
                parentMenu(e, menu4.id);
              }}
            >
              {menu4.icon ? <i className={menu4.icon}></i> : ""}
              {menu4.name}
            </Link> */}
            {/* {menuFromApi.map((menu5) => {
              return (
                <Menu5
                  key={menu5.id}
                  menu5={menu5}
                  currentId={menu4.id}
                  menuFromApi={menuFromApi}
                  activeElementIdHandler={props.activeElementIdHandler}
                  activeElementIds={props.activeElementIds}
                />
              );
            })} */}
          </li>
        </ul>
      );
    }
  };

  return <>{menu2res()}</>;
};

export default Menu4;
