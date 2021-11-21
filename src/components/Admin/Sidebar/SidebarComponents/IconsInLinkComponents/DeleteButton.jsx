const DeleteButton = (props) => {
  const clickHandler = () => {
    props.deleteMenuBtnHandler(props.menu.id);
    props.hideOtherFormsHandler();
  };

  return (
    <button
      className="menu-add-btn"
      onClick={clickHandler}
      style={{
        marginLeft: "0px",
        padding: "3px",
        fontSize: "9px",
        border: "none",
        backgroundColor: "white"
      }}
    >
      <i style={{ marginRight: "2px" }} className="fa fa-times "></i>
      Delete
    </button>
  );
};

export default DeleteButton;
