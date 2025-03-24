// helpers/localStorage.js
export const loadTodosFromLocalStorage = () => {
    try {
      const todos = localStorage.getItem("todos");
      return todos ? JSON.parse(todos) : []; // Als er geen todos zijn, return een lege array
    } catch (error) {
      console.error("Fout bij het laden van todos uit localStorage:", error);
      return []; // In geval van een fout, return een lege array
    }
  };
  
  export const saveTodosToLocalStorage = (todos) => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos)); // Zet todos als een string in localStorage
    } catch (error) {
      console.error("Fout bij het opslaan van todos in localStorage:", error);
    }
  };
  