import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/r/r";

const MyEditor = () => {
  const [code, setCode] = useState("# Enter your R code here\n");

  const handleCodeChange = (editor, data, value) => {
    // You can perform actions here when code changes
    console.log("editor:", editor);
    console.log("data :", data);
    console.log("Code changed value:", value);
    setCode(value);
    // Add your custom logic here
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <div>My R Editor</div>
      {/* editor */}
      <CodeMirror
        value={code}
        options={{
          mode: "r",
          theme: "dracula",
          lineNumbers: true,
          lineWrapping: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          indentUnit: 2,
          viewportMargin: Infinity,
          autofocus: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default MyEditor;
