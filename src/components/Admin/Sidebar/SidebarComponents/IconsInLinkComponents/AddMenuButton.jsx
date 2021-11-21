const AddMenuButton = (props) => {
  const clickHandler = () => {
    props.addMenuBtnHandler(props.menu.name, props.menu.link);
    props.hideOtherFormsHandler();
  };

  return (
    <button
      className="menu-add-btn"
      onClick={clickHandler}
      style={{
        marginLeft: "5px",
        padding: "3px",
        fontSize: "9px",
        border: "none",
        backgroundColor: "white"
      }}
    >
      <i style={{ marginRight: "2px" }} className="fa fa-plus "></i>
      Menu
    </button>
  );
};

export default AddMenuButton;
