import AddEditorSingleButtonComponent from "./AddEditorSingleButtonComponent";
import { useLocation } from "react-router-dom";

const AddEditorButtons = (props) => {
  return (
    <div style={{ textAlign: "right" }}>
      {/* <button
        onClick={() => {
          props.addEditorHandler("text", props.index);
        }}
      >
        Add TextEditor
      </button> */}
      { ((localStorage.getItem('userToken')) && (!useLocation().search.length)) ? (
        <>
          <AddEditorSingleButtonComponent
            type="text"
            index={props.index}
            addEditorHandler={props.addEditorHandler}
          />
          <AddEditorSingleButtonComponent
            type="code"
            index={props.index}
            addEditorHandler={props.addEditorHandler}
          />
        </>
      ) : (
        null
      )}

      {/* <button
        onClick={() => {
          props.addEditorHandler("code", props.index);
        }}
      >
        Add CodeEditor
      </button> */}
      {/* <button onClick={props.saveHandler}>Save</button> */}
    </div>
  );
};

export default AddEditorButtons;
