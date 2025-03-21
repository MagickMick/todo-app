import React, { useState } from 'react';  // Hier importeer je useState

function TodoInput({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");  // Lokale state voor de nieuwe taak

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);  // Roep de addTodo functie aan vanuit de props
      setNewTodo("");  // Maak het inputveld leeg
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}  // Update newTodo bij elke wijziging
        placeholder="Nieuwe taak"
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleAddTodo}  // Voeg taak toe bij klik
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Voeg toe
      </button>
    </div>
  );
}

export default TodoInput;
