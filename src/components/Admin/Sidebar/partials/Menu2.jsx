import Menu3 from "./Menu3";
import IconsInLink from "../SidebarComponents/IconsInLink";

const Menu2 = (props) => {
  let menu2 = props.menu2;
  let menuFromApi = props.menuFromApi;

  const menu2res = () => {
    // console.log("menu2.parentId", menu2);
    if (menu2.parentId === props.currentId) {
      return (
        <ul className="show-dropdown">
          <li
            className={
              props.activeElementIds.includes(menu2.id) ? "active" : ""
            }
          >
            <IconsInLink
              noAddMenu={true}
              menu={menu2}
              newMenuHandler={props.newMenuHandler}
              editMenuHandler={props.editMenuHandler}
              deleteMenuHandler={props.deleteMenuHandler}
              activeElementIdHandler={props.activeElementIdHandler}
              menuFromApi={props.menuFromApi}
            />
            {menuFromApi.map((menu3) => {
              return (
                <Menu3
                  key={menu3.id}
                  menu3={menu3}
                  currentId={menu2.id}
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

  return <>{menu2res()}</>;
};

export default Menu2;
