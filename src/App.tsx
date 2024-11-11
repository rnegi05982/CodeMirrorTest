import "./App.css";
// import MyEditor from "./MyEditor";
import REditor from "./REditor";
// import RCodeEditor from "./MyEditorWithLinting";
import MyEditorWithLinting from "./MyEditorWithLinting";
import AutoSuggestionEditor from "./AutoSuggestionEditor";
// import AutoSuggestionEditor2 from "./AutoSuggestionEditor2";

const handleChange = (value: string) => {
  console.log("Editor content:", value);
};
function App() {
  return (
    <>
      <AutoSuggestionEditor />
      {/* <AutoSuggestionEditor2 /> */}
      {/* <REditor
        initialValue="# Enter your R code here\nprint('Hello, World!')"
        onChange={handleChange}
      /> */}
    </>
  );
}

export default App;
