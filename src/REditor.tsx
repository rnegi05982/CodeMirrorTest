import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import { linter, Diagnostic } from "@codemirror/lint";

interface REditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const REditor: React.FC<REditorProps> = ({ initialValue = "", onChange }) => {
  const [value, setValue] = useState(initialValue);

  // Custom R linter
  const rLinter = linter((view) => {
    const diagnostics: Diagnostic[] = [];
    const text = view.state.doc.toString();

    // Add your custom R linting rules here
    // Example: Check for missing semicolons
    if (!text.includes(";")) {
      diagnostics.push({
        from: 0,
        to: text.length,
        severity: "warning",
        message: "Consider adding semicolons at the end of statements",
      });
    }

    return diagnostics;
  });

  return (
    <CodeMirror
      value={value}
      height="400px"
      extensions={[StreamLanguage.define(r), rLinter]}
      onChange={(val) => {
        setValue(val);
        onChange?.(val);
      }}
      theme="dark"
      style={{
        fontSize: "14px",
        backgroundColor: "#1e1e1e",
        fontFamily: "monospace",
      }}
    />
  );
};

export default REditor;
