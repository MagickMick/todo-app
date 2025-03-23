import React, { Suspense } from 'react';
import { useTodos } from './hooks/useTodos';

const TodoInput = React.lazy(() => import('./components/TodoInput'));
const TodoList = React.lazy(() => import('./components/TodoList'));

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
  <div className="bg-red p-8 rounded-lg shadow-xl w-full max-w-lg">
    <h1 className="text-4xl font-semibold text-center text-primary mb-8 border-b-2 border-gray-300 pb-4">
      Magick Todo-list
    </h1>

    <Suspense fallback={<div>Loading...</div>}>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </Suspense>
  </div>
</div>

  );
}

export default App;
