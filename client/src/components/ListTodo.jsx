import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:4000/todos", {
          method: "GET",
        });
        const jsonData = await response.json();
        //console.log(jsonData[1]);
        setTodos(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTodos();
  }, []);
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-lg text-left rtl:text-right text-gray-500 ">
          <thead className="text-sm text-white uppercase bg-green-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Todo Description
              </th>

              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                className="bg-green-300 border-b  hover:bg-green-100 hover:text-black"
                key={todo.todo_id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {todo.description}
                </th>

                <td className="px-6 py-4 text-center">
                  <a
                    href="#"
                    className="font-medium text-blue-900  hover:underline"
                  >
                    <EditTodo todo={todo} />
                  </a>
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  <button onClick={() => deleteTodo(todo.todo_id)}>
                    <MdDelete className="text-xl text-red-500 mx-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    // <div className="flex items-center gap-3 py-4">
    //   <div className="">Description</div>
    //   <div>
    //     <FaEdit />
    //   </div>
    //   <div>
    //     <MdDelete />
    //   </div>
    // </div>
  );
};

export default ListTodo;
