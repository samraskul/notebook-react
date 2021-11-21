import Menu2 from "./Menu2";
import IconsInLink from "../SidebarComponents/IconsInLink";


const Menu1 = (props) => {
  let menu1 = props.menu1;
  let menuFromApi = props.menuFromApi;

  const menu1res = () => {
    if (!menu1.parentId) {
      return (
        <ul className="show-dropdown">
          <li
            className={
              props.activeElementIds.includes(menu1.id) ? "active" : ""
            }
          >
            <IconsInLink
              menu={menu1}
              newMenuHandler={props.newMenuHandler}
              editMenuHandler={props.editMenuHandler}
              deleteMenuHandler={props.deleteMenuHandler}
              activeElementIdHandler={props.activeElementIdHandler}
              menuFromApi={props.menuFromApi}
            />

            {menuFromApi.map((menu2) => {
              return (
                <Menu2
                  key={menu2.id}
                  menu2={menu2}
                  currentId={menu1.id}
                  menuFromApi={menuFromApi}
                  activeElementIdHandler={props.activeElementIdHandler}
                  activeElementIds={props.activeElementIds}
                  newMenuHandler={props.newMenuHandler}
                  editMenuHandler={props.editMenuHandler}
                  deleteMenuHandler={props.deleteMenuHandler}
                />
              );
            })}
          </li>
        </ul>
      );
    }
  };

  return <>{menu1res()}</>;
};

export default Menu1;
