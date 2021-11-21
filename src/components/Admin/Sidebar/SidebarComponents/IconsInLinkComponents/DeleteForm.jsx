const DeleteForm = (props) => {
  return (
    <form
      style={
        props.showDeleteForm ? { display: "inline-block" } : { display: "none" }
      }
      action=""
      onSubmit={(e) => {
        props.deleteMenuHandler(e, props.menu.id);
      }}
      className='container-sidebar'
    >
      <div style={{fontSize:"12px"}}>Are you sure you want to delete the menu?</div>
      <input type="submit" className="btn-sidebar"  value="delete" />
    </form>
  );
};

export default DeleteForm;
