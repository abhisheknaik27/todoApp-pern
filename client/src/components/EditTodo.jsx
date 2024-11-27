import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setDescription(todo.description);
  };

  //console.log(todo.todo_id);

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const id = todo.todo_id;
      const body = { description };

      const respone = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center ">
      {/* Open Modal Button */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none"
        onClick={openModal}
      >
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            {/* Modal Header */}
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Edit Todo</h2>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <input
                value={description}
                type="text"
                className="text-gray-700 w-full my-2 px-4 py-2 border-2 border-gray-300 rounded-sm "
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-green-400 rounded shadow hover:bg-gray-400 focus:outline-none"
                onClick={(e) => updateTodo(e)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-100 rounded shadow hover:bg-gray-400 focus:outline-none"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;
