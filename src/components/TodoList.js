import React from 'react';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index} className="flex justify-between items-center p-2">
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(index)}  // Toggle de taakstatus
          >
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(index)}  // Verwijder taak bij klik
            className="bg-secondary text-white p-1 rounded"
          >
            Verwijder
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
