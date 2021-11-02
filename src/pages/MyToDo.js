import React from "react";
import { useQuery } from "@apollo/client";

import { GET_TODOS_BY_ID } from "../utils/graphql/queries";
import Task from "../components/Task";
import "../App.css";

function MyToDo(props) {
  const { loading, error, data } = useQuery(GET_TODOS_BY_ID, {
    variables: { user_id: props.match.params.id },
  });

  if (loading) {
    return <div className="tasks">Loading...</div>;
  }
  if (error) {
    return <div className="tasks">{error.toString()}</div>;
  }

  return (
    <div className="App App-header">
      <div className="tasks">
        {data.todos.map((todo) => (
          <Task key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default MyToDo;
