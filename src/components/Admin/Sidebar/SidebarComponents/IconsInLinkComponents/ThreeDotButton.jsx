const ThreeDotButton = (props) => {
  const clickHandler = () => {
    props.showAllButtonsHandler();
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
        backgroundColor: "rgba(0,0,0,0)",
        position: "static",
        position: "absolute",
        right: "0"
      }}
    >
      <i style={{ marginRight: "2px" }} className="fas fa-ellipsis-h "></i>
    </button>
  );
};

export default ThreeDotButton;
