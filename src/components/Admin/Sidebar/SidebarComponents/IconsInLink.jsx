import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import ThreeDotButton from "./IconsInLinkComponents/ThreeDotButton";
import AddPageButton from "./IconsInLinkComponents/AddPageButton";
import AddMenuButton from "./IconsInLinkComponents/AddMenuButton";
import EditButton from "./IconsInLinkComponents/EditButton";
import DeleteButton from "./IconsInLinkComponents/DeleteButton";
import AddMenuForm from "./IconsInLinkComponents/AddMenuForm";
import AddPageForm from "./IconsInLinkComponents/AddPageForm";
import EditMenuOrPageForm from "./IconsInLinkComponents/EditMenuOrPageForm";
import DeleteForm from "./IconsInLinkComponents/DeleteForm";
import './IconsInLink.css';

const IconsInLink = (props) => {
  
  const location = useLocation();

  const [showAddMenuForm, setShowAddMenuForm] = useState(false);
  const addMenuBtnHandler = (name) => {
    setShowAddMenuForm(!showAddMenuForm);
  };

  const [showAddPageForm, setShowAddPageForm] = useState(false);
  const addPageBtnHandler = (name) => {
    setShowAddPageForm(!showAddPageForm);
  };

  const [showEditForm, setShowEditForm] = useState(false);
  const editMenuBtnHandler = (id) => {
    setShowEditForm(!showEditForm);
  };

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const deleteMenuBtnHandler = (id) => {
    setShowDeleteForm(!showDeleteForm);
  };

  const hideOtherFormsHandler = () => {
    if (showAddMenuForm) {
      setShowAddMenuForm(false);

      setShowAddPageForm(false);
      setShowEditForm(false);
      setShowDeleteForm(false);
    }
    if (showAddPageForm) {
      setShowAddPageForm(false);

      setShowAddMenuForm(false);
      setShowEditForm(false);
      setShowDeleteForm(false);
    }
    if (showEditForm) {
      setShowEditForm(false);

      setShowAddMenuForm(false);
      setShowAddPageForm(false);
      setShowDeleteForm(false);
    }
    if (showDeleteForm) {
      setShowDeleteForm(false);

      setShowAddMenuForm(false);
      setShowAddPageForm(false);
      setShowEditForm(false);
    }
  };

  const parentMenu = (e, menu) => {
    // let id = menu.id;
    // let hasChild = false;
    // for (let tempItem of props.menuFromApi) {
    //   if (tempItem.parentId === id) {
    //     hasChild = true;
    //     break;
    //   }
    // }
    // if (hasChild) {
    //   e.preventDefault();
    // }
    props.activeElementIdHandler(menu);
  };

  const addSubMenuHandler = (e, parentId) => {
    e.preventDefault();
    let subMenuName = e.target.children[0].value;
    let icon = e.target.children[1].value;
    if (icon.length == 0) {
      //default icon for menus
      icon = "fas fa-bars";
    }
    props.newMenuHandler(parentId, subMenuName, null, icon);
    e.target.children[0].value = "";
    e.target.children[1].value = "";
    showAddMenuForm ? setShowAddMenuForm(false) : setShowAddMenuForm(true);
  };

  const editMenuOrPageHandler = (e, id) => {
    e.preventDefault();
    let subMenuName = e.target.children[0].value;
    let parentId = e.target.children[1].value;
    let icon = e.target.children[2].value;
    let order = e.target.children[3].value;
    if (icon.length == 0) {
      //default icon for menus
      icon = "fas fa-bars";
    }
    props.editMenuHandler(id, parentId, subMenuName, icon, order);
    showEditForm ? setShowEditForm(false) : setShowEditForm(true);
  };

  const deleteMenuHandler = (e, menuId) => {
    e.preventDefault();
    console.log(menuId);
    props.deleteMenuHandler(menuId);
    showDeleteForm ? setShowDeleteForm(false) : setShowDeleteForm(true);
  };

  const addPageHandler = (e, parentId) => {
    e.preventDefault();
    let pageName = e.target.children[0].value;
    let icon = e.target.children[1].value;
    if (icon.length == 0) {
      //default icon for posts
      icon = "fas fa-sticky-note";
    }
    props.newMenuHandler(parentId, pageName, "post", icon);
    e.target.children[0].value = "";
    e.target.children[1].value = "";
    showAddPageForm ? setShowAddPageForm(false) : setShowAddPageForm(true);
  };

  const [showAllButtons, setShowAllButtons] = useState(false);
  const showAllButtonsHandler = () => {
    if (showAllButtons) {
      setShowAllButtons(false);
    } else {
      setShowAllButtons(true);
    }
  };

  return (
    <>
      <Link
        to={props.menu.link ? "/posts/" + props.menu.id + location.search :  location.search ? location.search : "#" }
        onClick={(e) => {
          parentMenu(e, props.menu);
        }}
      >
        {props.menu.icon ? <i className={props.menu.icon}></i> : ""}
        {props.menu.name}
        {((localStorage.getItem('userToken')) && (!useLocation().search.length)) ? <ThreeDotButton
          hideOtherFormsHandler={hideOtherFormsHandler}
          showAllButtonsHandler={showAllButtonsHandler}
        /> : null }
        <div style={showAllButtons ? null : { display: "none" }}>
          {props.maxMenuLevel ? null : (
            <>
              {props.noAddMenu?null:<AddMenuButton hideOtherFormsHandler={hideOtherFormsHandler} addMenuBtnHandler={addMenuBtnHandler} menu={props.menu} />}
              <AddPageButton
                hideOtherFormsHandler={hideOtherFormsHandler}
                addPageBtnHandler={addPageBtnHandler}
                menu={props.menu}
              />
            </>
          )}
          <EditButton
            hideOtherFormsHandler={hideOtherFormsHandler}
            editMenuBtnHandler={editMenuBtnHandler}
            menu={props.menu}
          />
          <DeleteButton
            hideOtherFormsHandler={hideOtherFormsHandler}
            deleteMenuBtnHandler={deleteMenuBtnHandler}
            menu={props.menu}
          />
        </div>
      </Link>
      <div style={showAllButtons ? null : { display: "none" }}>
        <AddMenuForm
          addSubMenuHandler={addSubMenuHandler}
          menu={props.menu}
          showAddMenuForm={showAddMenuForm}
        />
        <AddPageForm
          addPageHandler={addPageHandler}
          menu={props.menu}
          showAddPageForm={showAddPageForm}
        />
        <EditMenuOrPageForm
          editMenuOrPageHandler={editMenuOrPageHandler}
          menu={props.menu}
          showEditForm={showEditForm}
          menuFromApi={props.menuFromApi}
        />
        <DeleteForm
          deleteMenuHandler={deleteMenuHandler}
          menu={props.menu}
          showDeleteForm={showDeleteForm}
        />
      </div>
    </>
  );
};

export default IconsInLink;
