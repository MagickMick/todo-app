import React, { Suspense, useState, useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import DarkModeToggle from './components/DarkModeToggle';

const TodoInput = React.lazy(() => import('./components/TodoInput'));
const TodoList = React.lazy(() => import('./components/TodoList'));

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, setTodos } = useTodos();
  
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to load the saved dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
  }, []);

  // Effect to apply dark mode when toggled
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 ">
      <div className="bg-red p-8 rounded-lg shadow-xl w-full max-w-lg">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-semibold text-black dark:text-white border-b-2 border-gray-300 pb-4">
            Magick Todo-list
          </h1>

          <DarkModeToggle onToggle={() => setIsDarkMode(!isDarkMode)} />
        </header>

        <Suspense fallback={<div>Loading...</div>}>
          <TodoInput addTodo={addTodo} />
          <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} setTodos={setTodos}/>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
