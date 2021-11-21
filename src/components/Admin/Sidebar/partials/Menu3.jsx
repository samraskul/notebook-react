import Menu4 from "./Menu4";
import IconsInLink from "../SidebarComponents/IconsInLink";

const Menu3 = (props) => {
  let menu3 = props.menu3;
  let menuFromApi = props.menuFromApi;

  const menu2res = () => {
    if (menu3.parentId === props.currentId) {
      return (
        <ul className="show-dropdown">
          <li
            className={
              props.activeElementIds.includes(menu3.id) ? "active" : ""
            }
          >
            <IconsInLink
              maxMenuLevel="3"
              menu={menu3}
              newMenuHandler={props.newMenuHandler}
              editMenuHandler={props.editMenuHandler}
              deleteMenuHandler={props.deleteMenuHandler}
              activeElementIdHandler={props.activeElementIdHandler}
              menuFromApi={props.menuFromApi}
            />

            {/* {menuFromApi.map((menu4) => {
              return (
                <Menu4
                  key={menu4.id}
                  menu4={menu4}
                  currentId={menu3.id}
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

export default Menu3;
