const EditButton = (props) => {
  const clickHandler = () => {
    props.editMenuBtnHandler(props.menu.id);
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
      <i style={{ marginRight: "2px" }} className="fa fa-edit "></i>
      Edit
    </button>
  );
};

export default EditButton;
