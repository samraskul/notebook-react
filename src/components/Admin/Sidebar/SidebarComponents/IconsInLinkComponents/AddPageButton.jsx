const AddPageButton = (props) => {
  const clickHandler = () => {
    props.addPageBtnHandler(props.menu.name, props.menu.link);
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
      <i style={{ marginRight: "2px" }} className="fa fa-plus "></i>
      Page
    </button>
  );
};

export default AddPageButton;
