import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_TODO, GET_TODOS } from "../utils/graphql/queries";
import Task from "../components/Task";
import "../App.css";

const updateCache = (cache, { data }) => {
  const existingTodos = cache.readQuery({
    query: GET_TODOS,
  });

  const newTodo = data.insert_todos;
  cache.writeQuery({
    query: GET_TODOS,
    data: { todos: [...existingTodos.todos, newTodo] },
  });
};

/*
state = nilainya bisa dirubah, type (String, Integer, Boolean, Array, Object, Function)
props = nilainya tidak bisa dirubah, type (String, Integer, Boolean, Array, Object, Function)
*/
function TodoInput(props) {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [title, setTask] = useState("");
  const [user_id, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addTodo] = useMutation(ADD_TODO, { update: updateCache });

  const submitTask = async () => {
    setIsLoading(true);
    addTodo({ variables: { title, user_id } });
    setTask("");
    setUserID("");
    setIsLoading(false);
  };

  if (loading) {
    return <div className="tasks">Loading...</div>;
  }
  if (error) {
    return <div className="tasks">Error! {error}</div>;
  }

  return (
    <div className="App App-header">
      <div className="div-row">
        <div className="div-col">
          <input
            type="text"
            placeholder="Add a new task"
            className="taskInput"
            value={title}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="text"
            placeholder="Insert User ID"
            className="taskInput"
            value={user_id}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <button onClick={submitTask} disabled={isLoading}>
          {isLoading ? "Loading" : "Add"}
        </button>
      </div>
      <div className="tasks">
        {data.todos.map((todo) => (
          <Task key={todo.id} todo={todo} submitTask={submitTask} />
        ))}
      </div>
    </div>
  );
}

export default TodoInput;
