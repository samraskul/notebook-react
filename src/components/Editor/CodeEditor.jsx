import React from "react";
import CodeEditorPackage from "@uiw/react-textarea-code-editor";
import { useLocation } from "react-router-dom";

const CodeEditor = (props) => {
  const code = props.content;
  const [disabled, setDisabled] = React.useState(!((localStorage.getItem('userToken')) && (!useLocation().search.length)));

  // if((localStorage.getItem('userToken')) || (!useLocation().search.length)){
  //   setDisabled(false);
  // }
  return (
    <div>
      <CodeEditorPackage
        // onChange={(e) => {props.onChange(props.id, e.target.value)}}
        disabled={disabled}
        value={code}
        language="js"
        placeholder="Please enter code."
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
        }}
        onBlur={(e) => {
          props.onChange(props.index, e.target.value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
