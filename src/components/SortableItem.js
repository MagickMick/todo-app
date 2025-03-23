import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon, PencilIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

function SortableItem({ todo, todos, setTodos, handleToggle, handleEdit, deleteTodo }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: todo.id,
  });

  // De drag functionaliteit toepassen op het gehele item
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between mb-2" // Zorg ervoor dat de hele lijst item niet de cursor verandert voor het hele item
    >
      {/* Drag handle icon */}
      <div
        className="mr-2 cursor-grab p-2" // Voeg padding toe voor makkelijker slepen
        {...listeners} // Voeg alleen de drag listeners toe aan de handle (de drag icoon)
        {...attributes} // Drag listeners voor de drag handle
      >
        <EllipsisVerticalIcon className="w-6 h-6 text-gray-500" /> {/* Vergroot het icoon */}
      </div>

      {/* Checkbox en tekst */}
      <label className="flex items-center cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
          className="mr-2 peer accent-primary" // Achtergrond van de checkbox als de primary accent color
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

      {/* Acties zoals edit en delete */}
      <div className="flex items-center space-x-2">
        {/* Edit Button */}
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

        {/* Delete Button */}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-secondary hover:text-secondary-dark" // Trash icon in secundaire kleur
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
}

export default SortableItem;
