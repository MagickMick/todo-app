import React from 'react';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from './SortableItem';

function TodoList({ todos, setTodos, toggleTodo, deleteTodo, editTodo }) {
  const todoItems = todos.filter(todo => !todo.completed);
  const completedItems = todos.filter(todo => todo.completed);

  const handleToggle = (id) => {
    toggleTodo(id);
  };

  const handleEdit = (id, newText) => {
    editTodo(id, newText);
  };

  // Functie om de volgorde van de todo-items bij te werken
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((prevTodos) => {
        const oldIndex = prevTodos.findIndex(todo => todo.id === active.id);
        const newIndex = prevTodos.findIndex(todo => todo.id === over.id);
        return arrayMove(prevTodos, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="mb-6">
        {/* To-Do Items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">To-Do</h2>
          <SortableContext items={todoItems.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
            <ul className="space-y-4">
              {todoItems.map(todo => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  handleToggle={handleToggle}
                  handleEdit={handleEdit}
                  deleteTodo={deleteTodo}
                />
              ))}
            </ul>
          </SortableContext>
        </div>

        {/* Completed Items */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Completed</h2>
          {/* Voeg SortableContext toe voor completed items */}
          <SortableContext items={completedItems.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
            <ul className="space-y-4">
              {completedItems.map(todo => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  handleToggle={handleToggle}
                  handleEdit={handleEdit}
                  deleteTodo={deleteTodo}
                />
              ))}
            </ul>
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}

export default TodoList;
