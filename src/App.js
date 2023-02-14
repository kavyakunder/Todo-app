import { useState } from "react";
import "./App.css";
import List from "./components/List";
import { TextField, Button } from "@mui/material";
function App() {
  const [inputText, setInputText] = useState(" ");
  const [list, setList] = useState([]);

  function addToList() {
    setList([...list, inputText]);
    setInputText(" ");
  }

  function deleteFn(id) {
    const filteredList = list.filter((item, index) => index !== id);
    setList(filteredList);
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TextField
        color="secondary"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        focused
      />

      <Button color="secondary" onClick={addToList}>
        Add
      </Button>

      <ul>
        {list.map((item, index) => {
          return (
            <List key={index} item={item} deleteFn={deleteFn} id={index} />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
