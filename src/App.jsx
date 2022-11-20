import React, { useState, useReducer } from "react";
import { ACTIONS } from "./Actions";
import "./App.css";
import { Todo } from "./Todo";

const reducer = (todos, action) => {
  console.log(todos, action);
  const { todoContent, id } = action.payload;
  switch (action.type) {
    case ACTIONS.ADD:
      return [...todos, newTodo(todoContent)];
    case ACTIONS.TOGGLE:
      return todos.map((s) => {
        if (s.id === id) {
          return { ...s, complete: !s.complete };
        }
        return s;
      });
    case ACTIONS.DELETE:
      return todos.filter((s) => s.id !== id);
    default:
      return todos;
  }
};

const newTodo = (todoContent) => {
  return { id: Math.floor(Math.random() * 100000), todoContent, complete: false };
};

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [todoContent, setTodoContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD, payload: { todoContent: todoContent } });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
          placeholder="Type in Something"
        />
      </form>
      {todos.map((s) => (
        <Todo key={s.id} todo={s} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default App;
