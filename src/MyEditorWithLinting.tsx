import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { linter, Diagnostic } from "@codemirror/lint";
import { oneDark } from "@codemirror/theme-one-dark";
// import { StreamLanguage } from "@codemirror/stream-parser";
import { r } from "@codemirror/legacy-modes/mode/r";
import { StreamLanguage } from "@codemirror/legacy-modes";

// Define a custom lint function
const lintRCode = (text: string) => {
  const diagnostics: Diagnostic[] = [];
  const lines = text.split("\n");

  lines.forEach((line, i) => {
    // Example rule: Check for missing semicolons
    if (
      line.trim().length > 0 &&
      !line.trim().startsWith("#") &&
      !line.includes(";")
    ) {
      diagnostics.push({
        from: line.length,
        to: line.length,
        message: "Missing semicolon",
        severity: "warning",
      });
    }

    // Additional rule example: Detect spacing issues around operators
    if (line.match(/[+\-*/]=|[+\-*/]{2}|[+\-*/][^\s=]/)) {
      diagnostics.push({
        from: 0,
        to: line.length,
        message: "Improper spacing around operators",
        severity: "warning",
      });
    }
  });

  return diagnostics;
};

const MyEditorWithLinting: React.FC = () => {
  const [code, setCode] = useState("# Enter your R code here\n");

  return (
    <>
      <div>hello</div>
      <CodeMirror
        value={code}
        theme={oneDark}
        extensions={[
          StreamLanguage.define(r), // R language mode
          //   linter(lintRCode), // Linting function
          EditorView.lineWrapping, // Enable line wrapping
        ]}
        onChange={(value) => {
          setCode(value);
        }}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
        }}
      />
    </>
  );
};

export default MyEditorWithLinting;
