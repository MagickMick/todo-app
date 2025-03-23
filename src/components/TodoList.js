import React from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

function TodoList({ todos, setTodos, toggleTodo, deleteTodo, editTodo }) {
  const todoItems = todos.filter(todo => !todo.completed);
  const completedItems = todos.filter(todo => todo.completed);

  const handleToggle = (id) => {
    toggleTodo(id);
  };

  const handleEdit = (id, newText) => {
    editTodo(id, newText);
  };

  return (
    <div>
      {/* To-Do Items */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">To-Do</h2>
        <ul>
          {todoItems.map(todo => (
            <li key={todo.id} className="flex items-center justify-between mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="mr-2 peer"
                />
                {todo.isEditing ? (
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => {
                      const updatedTodos = todos.map(t =>
                        t.id === todo.id ? { ...t, text: e.target.value } : t
                      );
                      setTodos(updatedTodos); // Update text live while typing
                    }}
                    className="flex-1 text-lg"
                  />
                ) : (
                  <span
                    onClick={() => handleToggle(todo.id)} // Klikken op de tekst
                    className="flex-1 text-lg"
                  >
                    {todo.text}
                  </span>
                )}
              </label>

              <div className="flex items-center space-x-2">
                {todo.isEditing ? (
                  <button
                    onClick={() => {
                      handleEdit(todo.id, todo.text); // Save the changes
                      const updatedTodos = todos.map(t =>
                        t.id === todo.id ? { ...t, isEditing: false } : t
                      );
                      setTodos(updatedTodos); // Disable editing mode
                    }}
                    className="ml-2 text-primary"
                  >
                    Ok
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const updatedTodos = todos.map(t =>
                        t.id === todo.id ? { ...t, isEditing: true } : t
                      );
                      setTodos(updatedTodos); // Enable editing state
                    }}
                    className="ml-2 text-primary"
                  >
                    <PencilIcon className="w-5 h-5 text-primary" />
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Completed Items */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Completed</h2>
        <ul>
          {completedItems.map(todo => (
            <li key={todo.id} className="flex items-center justify-between mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="mr-2 accent-primary peer"
                />
                {todo.isEditing ? (
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => {
                      const updatedTodos = todos.map(t =>
                        t.id === todo.id ? { ...t, text: e.target.value } : t
                      );
                      setTodos(updatedTodos); // Update text live while typing
                    }}
                    className="flex-1 text-lg text-gray-400 line-through"
                  />
                ) : (
                  <span
                    onClick={() => handleToggle(todo.id)} // Klikken op de tekst
                    className="flex-1 text-lg text-gray-400 line-through peer-checked:text-primary"
                  >
                    {todo.text}
                  </span>
                )}
              </label>

              <div className="flex items-center space-x-2">
                {todo.isEditing ? (
                  <button
                    onClick={() => {
                      handleEdit(todo.id, todo.text); // Save the changes
                      const updatedTodos = todos.map(t =>
                        t.id === todo.id ? { ...t, isEditing: false } : t
                      );
                      setTodos(updatedTodos); // Disable editing mode
                    }}
                    className="ml-2 text-primary"
                  >
                    Ok
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const updatedTodos = todos.map(t =>
                        t.id === todo.id ? { ...t, isEditing: true } : t
                      );
                      setTodos(updatedTodos); // Enable editing state
                    }}
                    className="ml-2 text-primary"
                  >
                    <PencilIcon className="w-5 h-5 text-primary" />
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
