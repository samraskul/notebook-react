const AddPageForm = (props) => {
  return (
    <form
      style={
        props.showAddPageForm
          ? { display: "inline-block" }
          : { display: "none" }
      }
      action=""
      onSubmit={(e) => {
        props.addPageHandler(e, props.menu.id);
      }}
      className='container-sidebar'
    >
      <input type="text" className="input-sidebar" name="name" placeholder="Page name" />
      {/* <input
        type="text"
        name="icon"
        placeholder="Icon (ex: fas fa-sticky-note)"
      /> */}
      <input type="submit" className="btn-sidebar" value="add page" />
    </form>
  );
};

export default AddPageForm;
