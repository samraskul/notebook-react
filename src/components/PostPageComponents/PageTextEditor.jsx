import { useState } from "react";
import TextEditor from "../Editor/TextEditor";
import { useLocation } from "react-router-dom";

const PageTextEditor = (props) => {
  const [showEditor, setShowEditor] = useState(false);
  const location = useLocation();
  // console.log("locaton", location, location.search);

  return (
    <div
      onClick={() => {
        if (localStorage.getItem("userToken") && location.search === "") {
          showEditor ? setShowEditor(false) : setShowEditor(true);
        }
      }}
    >
      {showEditor || props.content.length === 0 ? (
        <TextEditor
          onChange={props.onChange}
          index={props.index}
          id={props.id}
          content={props.content}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: props.content }}
          style={{ padding: "10px" }}
        />
      )}
    </div>
  );
};

export default PageTextEditor;
