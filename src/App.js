import React, { Suspense } from 'react';
import { useTodos } from './hooks/useTodos';  // Importeren van de custom hook

// Gebruik lazy loading voor componenten
const TodoInput = React.lazy(() => import('./components/TodoInput'));
const TodoList = React.lazy(() => import('./components/TodoList'));

function App() {
  // Gebruik de useTodos hook
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center my-4">To-Do List</h1>

      {/* Gebruik Suspense voor de lazy loaded componenten */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* TodoInput Component krijgt addTodo door als een prop */}
        <TodoInput addTodo={addTodo} />

        {/* TodoList-component krijgt todos, toggleTodo en deleteTodo door als props */}
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </Suspense>
    </div>
  );
}

export default App;
