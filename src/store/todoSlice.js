import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from '../helpers/localStorage'; // Importeren van helper

const initialState = {
  todos: loadTodosFromLocalStorage(), // Laad todos vanuit localStorage
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = { id: Date.now(), text: action.payload, completed: false, isEditing: false };
      state.todos.push(newTodo);
      saveTodosToLocalStorage(state.todos); // Sla de updated todos op in localStorage
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodosToLocalStorage(state.todos); // Sla de updated todos op in localStorage
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      saveTodosToLocalStorage(state.todos); // Sla de updated todos op in localStorage
    },
    reorderTodos: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      state.todos = arrayMove(state.todos, oldIndex, newIndex);
      saveTodosToLocalStorage(state.todos); // Sla de updated todos op in localStorage
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
        todo.isEditing = false;
        saveTodosToLocalStorage(state.todos); // Sla de updated todos op in localStorage
      }
    },
    enableEditing: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.isEditing = true;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, reorderTodos, editTodo, enableEditing } = todosSlice.actions;
export default todosSlice.reducer;
