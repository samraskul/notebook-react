import React, { useState } from "react";
import {Editor} from "@jeremyling/react-material-ui-rich-text-editor";

// deprecated file, we should use texteditor2.jsx

function RichTextEditor(props) {
  const initialDocument = [
    {
      type: "Paragraph",
      children: [
        { text: props.content }
      ],
    },
    
  ];
  const [document, setDocument] = useState(initialDocument);

  return (
    <Editor
      document={document}
      onChange={(document) => {setDocument(document);}}
      // onChange=editorRef.current.getContent()
      onBlur={(html) => { 
        
        console.log('html', html);
        props.onChange(props.id, html)
      }}
    />
  );
}

export default RichTextEditor;