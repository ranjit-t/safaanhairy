// AnotherApp.jsx
import React, { useEffect, useState } from "react";
import Editor from "./Editor";

export default function AnotherApp() {
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    console.log(editorContent);
  }, [editorContent]);

  return (
    <div>
      <Editor setContent={setEditorContent} />{" "}
      {/* Change setEditorContent to setContent */}
    </div>
  );
}
