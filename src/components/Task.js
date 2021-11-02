import React from "react";
import { useMutation } from "@apollo/client";

import {
  GET_TODOS,
  TOGGLE_COMPLETED,
  REMOVE_TODO,
} from "../utils/graphql/queries";
import "../styles/Task.css";

const Task = ({ todo }) => {
  const [removeTodoMutation] = useMutation(REMOVE_TODO);
  const [toggleCompeletedMutation] = useMutation(TOGGLE_COMPLETED);

  const toggleCompleted = ({ id, is_completed }) => {
    toggleCompeletedMutation({
      variables: { id, is_completed: !is_completed },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_TODOS });
        const updatedTodo = existingTodos.todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, is_completed: !is_completed };
          } else {
            return todo;
          }
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: updatedTodo },
        });
      },
    });
  };

  const removeTodo = (id) => {
    removeTodoMutation({
      variables: { id },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_TODOS });
        const todos = existingTodos.todos.filter((t) => t.id !== id);
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos },
        });
      },
    });
  };

  return (
    <div key={todo.id} className="task">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={() => toggleCompleted(todo)}
      />
      <span className={todo.is_completed ? "completed" : ""}>{todo.title}</span>
      <button type="submit" onClick={() => removeTodo(todo.id)}>
        remove
      </button>
    </div>
  );
};

export default Task;
