import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";

interface SuggestionItem {
  word: string;
  category: string;
  description?: string;
  type: string;
  info: string;
}

const AutoSuggestionEditor: React.FC = () => {
  //   // Your predefined word list
  //   const wordsList = ["apple", "aeroplane", "mango"];

  //   const customCompletions = (context: CompletionContext) => {
  //     const word = context.matchBefore(/\w*/);

  //     if (!word) return null;

  //     // Get the current word being typed
  //     const currentWord = word.text.trim();

  //     // Filter suggestions based on current input
  //     const suggestions = wordsList
  //       .filter((item) => item.startsWith(currentWord))
  //       .map((item) => ({
  //         label: item,
  //         type: "word",
  //         apply: item,
  //       }));

  //     return {
  //       from: word.from,
  //       options: suggestions,
  //       validFor: /^\w*$/,
  //     };
  //   };

  // Categorized suggestions
  const suggestions: SuggestionItem[] = [
    {
      word: "apple",
      category: "fruit",
      type: "function",
      description: "A fruit",
      info: "info apple",
    },
    {
      word: "aeroplane",
      category: "vehicle",
      description: "A flying vehicle",
      type: "function",
      info: "info aeroplane",
    },
    {
      word: "mango",
      category: "fruit",
      description: "A tropical fruit",
      type: "variable",
      info: "info mango",
    },
  ];

  const customCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/\w*/);

    if (!word) return null;

    const currentWord = word.text.trim();

    const matchingSuggestions = suggestions
      .filter((item) => item.word.startsWith(currentWord))
      .map((item) => ({
        label: item.word,
        type: item.type,
        detail: item.category,
        info: item.info,
        apply: item.word,
      }));

    return {
      from: word.from,
      options: matchingSuggestions,
      validFor: /^\w*$/,
    };
  };

  const extensions = [
    StreamLanguage.define(r),
    autocompletion({
      override: [customCompletions],
      activateOnTyping: true,
      maxRenderedOptions: 10,
      defaultKeymap: true,
      icons: true,
    }),
  ];

  return (
    <CodeMirror
      value=""
      height="400px"
      extensions={extensions}
      theme="light"
      style={{
        fontSize: "14px",
        backgroundColor: "#1e1e1e",
        fontFamily: "monospace",
      }}
    />
  );
};

export default AutoSuggestionEditor;
