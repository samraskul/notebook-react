import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextEditor(props) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onBlur={(html) => {
          // console.log('html', editorRef.current.getContent());
          props.onChange(props.index, editorRef.current.getContent());
        }}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.content}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | image link | table | " +
            "formatselect bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          height: "400"
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}

export default TextEditor;
