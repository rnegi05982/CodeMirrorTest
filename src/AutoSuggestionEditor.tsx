import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";

// interface SuggestionItem {
//   word: string;
//   category: string;
//   description?: string;
//   type: string;
//   info: string;
// }

// const AutoSuggestionEditor: React.FC = () => {
//   //   // Your predefined word list
//   //   const wordsList = ["apple", "aeroplane", "mango"];

//   //   const customCompletions = (context: CompletionContext) => {
//   //     const word = context.matchBefore(/\w*/);

//   //     if (!word) return null;

//   //     // Get the current word being typed
//   //     const currentWord = word.text.trim();

//   //     // Filter suggestions based on current input
//   //     const suggestions = wordsList
//   //       .filter((item) => item.startsWith(currentWord))
//   //       .map((item) => ({
//   //         label: item,
//   //         type: "word",
//   //         apply: item,
//   //       }));

//   //     return {
//   //       from: word.from,
//   //       options: suggestions,
//   //       validFor: /^\w*$/,
//   //     };
//   //   };

//   // Categorized suggestions
//   const suggestions: SuggestionItem[] = [
//     {
//       word: "apple",
//       category: "fruit",
//       type: "function",
//       description: "A fruit",
//       info: "info apple",
//     },
//     {
//       word: "aeroplane",
//       category: "vehicle",
//       description: "A flying vehicle",
//       type: "function",
//       info: "info aeroplane",
//     },
//     {
//       word: "mango",
//       category: "fruit",
//       description: "A tropical fruit",
//       type: "variable",
//       info: "info mango",
//     },
//   ];

//   const customCompletions = (context: CompletionContext) => {
//     const word = context.matchBefore(/\w*/);

//     if (!word) return null;

//     const currentWord = word.text.trim();

//     const matchingSuggestions = suggestions
//       .filter((item) => item.word.startsWith(currentWord))
//       .map((item) => ({
//         label: item.word,
//         type: item.type,
//         detail: item.category,
//         info: item.info,
//         apply: item.word,
//       }));

//     return {
//       from: word.from,
//       options: matchingSuggestions,
//       validFor: /^\w*$/,
//     };
//   };

//   const extensions = [
//     StreamLanguage.define(r),
//     autocompletion({
//       override: [customCompletions],
//       activateOnTyping: true,
//       maxRenderedOptions: 10,
//       defaultKeymap: true,
//       icons: true,
//     }),
//   ];

//   return (
//     <CodeMirror
//       value=""
//       height="400px"
//       extensions={extensions}
//       theme="light"
//       style={{
//         fontSize: "14px",
//         backgroundColor: "#1e1e1e",
//         fontFamily: "monospace",
//       }}
//     />
//   );
// };

// export default AutoSuggestionEditor;

interface SuggestionItem {
  word: string;
  category: string;
  description: string;
  type: string;
  info: string;
}

const rBuiltInFunctions: SuggestionItem[] = [
  // Mathematical Functions
  {
    word: "mean",
    category: "Mathematical",
    description: "Calculates the mean of a numeric vector",
    type: "function",
    info: "Usage: mean(x, trim=0, na.rm=FALSE)",
  },
  {
    word: "sum",
    category: "Mathematical",
    description: "Calculates the sum of a numeric vector",
    type: "function",
    info: "Usage: sum(x, na.rm=FALSE)",
  },
  {
    word: "sqrt",
    category: "Mathematical",
    description: "Calculates square root",
    type: "function",
    info: "Usage: sqrt(x)",
  },
  {
    word: "abs",
    category: "Mathematical",
    description: "Returns absolute value",
    type: "function",
    info: "Usage: abs(x)",
  },
  {
    word: "ceiling",
    category: "Mathematical",
    description: "Rounds up to nearest integer",
    type: "function",
    info: "Usage: ceiling(x)",
  },

  // Statistical Functions
  {
    word: "sd",
    category: "Statistical",
    description: "Calculates standard deviation",
    type: "function",
    info: "Usage: sd(x)",
  },
  {
    word: "var",
    category: "Statistical",
    description: "Calculates variance",
    type: "function",
    info: "Usage: var(x)",
  },
  {
    word: "median",
    category: "Statistical",
    description: "Calculates median value",
    type: "function",
    info: "Usage: median(x)",
  },
  {
    word: "range",
    category: "Statistical",
    description: "Returns min and max values",
    type: "function",
    info: "Usage: range(x)",
  },

  // Probability Functions
  {
    word: "pnorm",
    category: "Probability",
    description: "Normal distribution probability",
    type: "function",
    info: "Usage: pnorm(q, mean=0, sd=1)",
  },
  {
    word: "rbinom",
    category: "Probability",
    description: "Generate random binomial values",
    type: "function",
    info: "Usage: rbinom(n, size, prob)",
  },
  {
    word: "rpois",
    category: "Probability",
    description: "Generate random Poisson values",
    type: "function",
    info: "Usage: rpois(n, lambda)",
  },

  // Utility Functions
  {
    word: "length",
    category: "Utility",
    description: "Returns length of an object",
    type: "function",
    info: "Usage: length(x)",
  },
  {
    word: "str",
    category: "Utility",
    description: "Displays structure of an object",
    type: "function",
    info: "Usage: str(object)",
  },
  {
    word: "print",
    category: "Utility",
    description: "Prints an R object",
    type: "function",
    info: "Usage: print(x)",
  },
];

const AutoSuggestionEditor: React.FC = () => {
  const customCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/\w*/);

    if (!word) return null;

    const currentWord = word.text.trim().toLowerCase();

    const matchingSuggestions = rBuiltInFunctions
      .filter(
        (item) =>
          item.word.toLowerCase().startsWith(currentWord) ||
          item.category.toLowerCase().includes(currentWord)
      )
      .map((item) => ({
        label: item.word,
        type: item.type,
        detail: `${item.category} - ${item.description}`,
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
