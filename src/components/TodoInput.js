import React, { useState } from 'react';

function TodoInput({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");  // Lokale state voor de nieuwe taak

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);  // Roep de addTodo functie aan vanuit de props
      setNewTodo("");  // Maak het inputveld leeg
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}  // Update newTodo bij elke wijziging
        placeholder="Nieuwe taak"
        className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary w-2/3"
      />
      <button
        onClick={handleAddTodo}  // Voeg taak toe bij klik
        className="ml-4 p-3 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition duration-200"
      >
        Voeg toe
      </button>
    </div>
  );
}

export default TodoInput;
