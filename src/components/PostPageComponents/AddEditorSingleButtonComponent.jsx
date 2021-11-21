import IconButton from "@mui/material/IconButton";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CodeIcon from "@mui/icons-material/Code";

const AddEditorSingleButtonComponent = (props) => {
  let color = props.type === "text" ? "primary" : "secondary";
  return (
    // <button
    //     onClick={() => {
    //       props.addEditorHandler(props.type, props.index);
    //     }}
    //   >
    //     {props.children}
    //   </button>

    <IconButton
      color={color}
      aria-label="add to shopping cart"
      onClick={() => {
        props.addEditorHandler(props.type, props.index);
      }}
      style={{ maxHeight: "5px" }}
    >
      {props.type === "text" ? <TextFieldsIcon /> : <CodeIcon />}
    </IconButton>
  );
};

export default AddEditorSingleButtonComponent;
