import React from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-5xl font-bold text-green-500 py-10">
        TODO APP<span className="text-sm text-gray-400">PERN Stack</span>
      </h1>
      <InputTodo />
      <ListTodo />
    </div>
  );
};

export default App;
