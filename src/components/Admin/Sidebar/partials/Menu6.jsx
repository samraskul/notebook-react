import { Link } from "react-router-dom";
import { useRef } from "react";

const Menu6 = (props) => {
  const liRef = useRef();

  let menu6 = props.menu6;

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

  const menu6res = () => {
    // console.log("menu6.parentId", menu6.parentId);

    if (menu6.parentId === props.currentId) {
      return (
        <ul className="show-dropdown">
          <li
            className={
              props.activeElementIds.includes(menu6.id) ? "active" : ""
            }
            key={menu6.idKey}
            ref={liRef}
          >
            <Link
              to={menu6.link}
              onClick={(e) => {
                parentMenu(e, menu6.id);
              }}
            >
              {menu6.icon ? <i className={menu6.icon}></i> : ""}
              {menu6.name}
            </Link>
          </li>
        </ul>
      );
    }
  };

  return <>{menu6res()}</>;
};

export default Menu6;
