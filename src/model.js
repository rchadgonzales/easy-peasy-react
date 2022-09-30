import { action, thunk } from "easy-peasy";
import uuid from "uuid";

export default {
  todos: [
    /*
    {
      id: 1,
      title: "Learn Easy Peasy React State Management",
      completed: false,
    },
    {
      id: 2,
      title: "Eat Lunch at 11:30AM",
      completed: false,
    },
    {
      id: 3,
      title: "Finish Learning Easy Peasy React State Management",
      completed: false,
    },
    */
  ],
  // THUNKS
  fetchTodos: thunk(async (actions) => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=7"
    );
    const todos = await res.json();

    actions.setTodos(todos);
  }),

  // ACTIONS
  setTodos: action((state, todos) => {
    state.todos = todos;
  }),
  add: action((state, todo) => {
    todo.id = uuid.v4();
    state.todos = [...state.todos, todo];
  }),
  toggle: action((state, id) => {
    state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  }),
  remove: action((state, id) => {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  }),
};
