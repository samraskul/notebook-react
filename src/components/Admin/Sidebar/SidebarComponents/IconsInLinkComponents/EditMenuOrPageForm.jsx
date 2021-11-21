import { useState } from "react";

const EditMenuOrPageForm = (props) => {
  const [editMenuNameValue, setEditMenuNameValue] = useState(props.menu.name);
  const editMenuNameChangeHandler = (e) => {
    setEditMenuNameValue(e.target.value);
  };

  const [editMenuOrderValue, setEditMenuOrderValue] = useState(
    props.menu.order
  );
  const editMenuOrderChangeHandler = (e) => {
    setEditMenuOrderValue(e.target.value);
  };

  // const [editMenuIconValue, setEditMenuIconValue] = useState(props.menu.icon);
  // const editMenuIconChangeHandler = (e) => {
  //   setEditMenuIconValue(e.target.value);
  // };

  const temp = ()=>{};

  return (
    <form
      style={
        props.showEditForm ? { display: "inline-block" } : { display: "none" }
      }
      action=""
      onSubmit={(e) => {
        props.editMenuOrPageHandler(e, props.menu.id);
      }}
      className='container-sidebar'
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={editMenuNameValue}
        onChange={editMenuNameChangeHandler}
        className="input-sidebar"
      />
      <select name="parentId" id="" className="input-sidebar">
        <option value="currentParent">Current Parent</option>
        {props.menuFromApi.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.id} - {item.name}
            </option>
          );
        })}
      </select>
      {/* <input
        type="text"
        name="icon"
        placeholder="Icon (ex: fas fa-sticky-note)"
        value={editMenuIconValue}
        onChange={editMenuIconChangeHandler}
      /> */}
      <input
        type="text"
        name="order"
        placeholder="Order"
        value={editMenuOrderValue}
        onChange={temp}
        // onChange={editMenuOrderChangeHandler}
        style={{display:"none"}}
      />
      
      <select value={editMenuOrderValue} className="input-sidebar" onChange={editMenuOrderChangeHandler}>
        <option value="3000"  >Top</option>
        <option value="2000"  >Top - Middle</option>
        <option value="1000"  >Middle</option>
        <option value="500"  >Bottom - Middle</option>
        <option value="250"  >Bottom</option>
      </select>

      <input type="submit" className="btn-sidebar" value="save" />
    </form>
  );
};

export default EditMenuOrPageForm;
