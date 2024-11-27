import React from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  return (
    <div className="p-4">
      <InputTodo />
      <ListTodo />
    </div>
  );
};

export default App;
