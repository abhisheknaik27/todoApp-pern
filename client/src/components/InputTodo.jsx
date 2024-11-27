import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const submitTodo = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={submitTodo}
        className="w-1/2 flex gap-2 border-2 border-gray-300 rounded-sm justify-between px-3 py-2 bg-gray-100"
      >
        <input
          value={description}
          type="text"
          className="flex-auto px-3 py-2 text-xl bg-transparent focus:outline-none"
          placeholder="Enter todo"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="w-[200px] bg-green-600 border rounded-md uppercase font-semibold text-white text-lg">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
