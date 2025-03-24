import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, reorderTodos, editTodo } from "../store/todoSlice";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from './SortableItem';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const todoItems = todos.filter((todo) => !todo.completed);
  const completedItems = todos.filter((todo) => todo.completed);

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (id, newText) => {
    dispatch(editTodo({ id, newText }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  // Drag & Drop handler
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      dispatch(reorderTodos({ oldIndex, newIndex }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="mb-6">
        {/* To-Do Items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">To-Do</h2>
          <SortableContext items={todoItems.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
            <ul className="space-y-4">
              {todoItems.map((todo) => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  handleToggle={handleToggle}
                  handleEdit={handleEdit}
                  deleteTodo={handleDelete}
                />
              ))}
            </ul>
          </SortableContext>
        </div>

        {/* Completed Items */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Completed</h2>
          <SortableContext items={completedItems.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
            <ul className="space-y-4">
              {completedItems.map((todo) => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  handleToggle={handleToggle}
                  handleEdit={handleEdit}
                  deleteTodo={handleDelete}
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
