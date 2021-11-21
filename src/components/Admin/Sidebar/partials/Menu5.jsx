import { useRef } from "react";
import { Link } from "react-router-dom";
import Menu6 from "./Menu6";

const Menu5 = (props) => {
  const liRef = useRef();

  let menu5 = props.menu5;
  let menuFromApi = props.menuFromApi;

  // let menu2used = false;

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
    // console.log("menu5.parentId", menu5.parentId);

    if (menu5.parentId === props.currentId) {
      return (
        <ul className="show-dropdown">
          <li
            className={
              props.activeElementIds.includes(menu5.id) ? "active" : ""
            }
            key={menu5.idKey}
            ref={liRef}
          >
            <Link
              to={menu5.link}
              onClick={(e) => {
                parentMenu(e, menu5.id);
              }}
            >
              {menu5.icon ? <i className={menu5.icon}></i> : ""}
              {menu5.name}
            </Link>
            {menuFromApi.map((menu6) => {
              return (
                <Menu6
                  key={menu6.id}
                  menu6={menu6}
                  currentId={menu5.id}
                  menuFromApi={menuFromApi}
                  activeElementIdHandler={props.activeElementIdHandler}
                  activeElementIds={props.activeElementIds}
                />
              );
            })}
          </li>
        </ul>
      );
    }
  };

  return <>{menu2res()}</>;
};

export default Menu5;
