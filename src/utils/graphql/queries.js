import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query {
    todos {
      id
      title
      is_completed
    }
  }
`;

export const GET_TODOS_BY_ID = gql`
  query ($user_id: Int!) {
    todos(where: { user_id: { _eq: $user_id } }) {
      id
      title
      is_completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation ($title: String!, $user_id: Int!) {
    insert_todos(objects: [{ title: $title, user_id: $user_id }]) {
      returning {
        id
        title
        is_completed
      }
    }
  }
`;

export const TOGGLE_COMPLETED = gql`
  mutation ($id: Int!, $is_completed: Boolean!) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { is_completed: $is_completed }
    ) {
      id
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation ($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;
