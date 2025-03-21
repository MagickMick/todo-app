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
      setTodos([...todos, { text: newTodo, completed: false }]);
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
};
