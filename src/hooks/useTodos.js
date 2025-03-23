import { useState, useEffect } from 'react';

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    // Laad de to-do's uit localStorage (indien aanwezig)
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Bewaar de to-do's in localStorage wanneer deze verandert
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false } // Gebruik een unieke id
      ]);
    }
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      newTodos[index].text = newText;
      newTodos[index].isEditing = false; // Terug naar de normale weergave
      setTodos(newTodos);
    }
  };
  

  return { todos, addTodo, toggleTodo, deleteTodo, editTodo, setTodos };
};
