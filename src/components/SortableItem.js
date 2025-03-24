import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon, PencilIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo} from '../store/todoSlice.js';

function SortableItem({ todo, todos }) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: todo.id,
  });

  const [isEditing, setIsEditing] = useState(todo.isEditing);
  const [newText, setNewText] = useState(todo.text);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Functie voor het toggelen van de todo
  const handleToggle = () => {
    dispatch(toggleTodo(todo.id)); 
  };

  // Functie voor het bewerken van de todo
  const handleEdit = () => {
    dispatch(editTodo({ id: todo.id, text: newText })); 
    setIsEditing(false);
  };

  // Functie voor het verwijderen van de todo
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  // Functie voor het beheren van de blur gebeurtenis
  const handleBlur = () => {
    setIsEditing(false);
    dispatch(editTodo({ id: todo.id, text: newText })); // Opslaan bij verlies van focus
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between mb-2 dark:bg-gray-800 dark:text-white"
    >
      {/* Drag handle icon */}
      <div
        className="mr-2 cursor-grab p-2 dark:text-gray-300"
        {...listeners}
        {...attributes}
      >
        <EllipsisVerticalIcon className="w-6 h-6" />
      </div>

      {/* Checkbox en tekst */}
      <label className="flex items-center cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mr-2 peer accent-primary dark:accent-primary-dark"
        />
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)} // Update tekst live
            onBlur={handleBlur} // Verlies van focus
            className="flex-1 text-lg dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <span
            onClick={handleToggle} // Klikken op de tekst
            className="flex-1 text-lg dark:text-gray-300"
          >
            {todo.text}
          </span>
        )}
      </label>

      {/* Acties zoals edit en delete */}
      <div className="flex items-center space-x-2">
        {/* Edit Button */}
        {isEditing ? (
          <button
            onClick={handleEdit} // Opslaan van de wijziging
            className="ml-2 text-primary dark:text-primary-dark"
          >
            Ok
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true); // Zet bewerkingsmodus aan
            }}
            className="ml-2 text-primary dark:text-primary-dark"
          >
            <PencilIcon className="w-5 h-5 dark:text-white" />
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-secondary-dark dark:text-secondary dark:hover:text-secondary-dark"
        >
          <TrashIcon className="w-5 h-5 dark:text-white mr-1.5" />
        </button>
      </div>
    </li>
  );
}

export default SortableItem;
