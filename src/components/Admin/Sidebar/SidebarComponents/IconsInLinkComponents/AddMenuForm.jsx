const AddMenuForm = (props) => {
  return (
    <form
      style={
        props.showAddMenuForm
          ? { display: "inline-block" }
          : { display: "none" }
      }
      action=""
      onSubmit={(e) => {
        props.addSubMenuHandler(e, props.menu.id);
      }}
      className='container-sidebar'
    >

      <input className="input-sidebar" type="text" name="name" placeholder="Folder name" required/>
      {/* <input type="text" name="icon" placeholder="Icon (ex: fas fa-bar)" /> */}
      <button className="btn-sidebar">add folder</button>

    </form>
  );
};

export default AddMenuForm;
