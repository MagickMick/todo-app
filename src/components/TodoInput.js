import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice'; // Zorg ervoor dat je de juiste actie importeert

function TodoInput() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState(""); // Lokale state voor het inputveld

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));  // Dispatch de addTodo actie naar Redux
      setNewTodo("");  // Maak het inputveld leeg na het toevoegen
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="flex justify-center mb-6 w-full">
      <input
        type="text"
        value={newTodo} // Bind de waarde van het inputveld aan de lokale state
        onChange={(e) => setNewTodo(e.target.value)} // Update de lokale state bij elke wijziging
        onKeyDown={handleKeyDown} // Luister naar toetsinvoer
        placeholder="New task"
        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white flex-1"
      />
      <button
        onClick={handleAddTodo}  // Voeg taak toe bij klik
        className="ml-4 p-3 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition duration-200 dark:bg-primary dark:hover:bg-secondary-dark"
      >
        Add
      </button>
    </div>
  );
}

export default TodoInput;
