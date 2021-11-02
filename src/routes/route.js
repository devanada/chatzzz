import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";

import Home from "../pages/Home";
import TodoInput from "../pages/TodoInput";
import MyToDo from "../pages/MyToDo";
import NotFound from "../pages/NotFound";

function Routes() {
  const client = new ApolloClient({
    uri: "https://pure-falcon-93.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "1xx3qKBD8wI3v8Lx1CJy3dSQFGJWSa5Jw6DM4laHXvlaBQuXtBltz5owW3iCG2jb",
    },
    cache: new InMemoryCache(),
  });

  return (
    <BrowserRouter>
      <Auth0Provider
        domain="chatzzz.us.auth0.com"
        clientId="abKHCCKAESmd7FJWMFmL3mQOEe4v0vf6"
        redirectUri={window.location.origin}
      >
        <ApolloProvider client={client}>
          <Switch>
            {/* http://localhost:3000 */}
            <Route exact path="/">
              {(props) => (
                <div>
                  <Home {...props} />
                </div>
              )}
            </Route>
            {/* http://localhost:3000/devanada */}
            <Route exact path="/todos">
              {(props) => (
                <div>
                  <TodoInput {...props} />
                </div>
              )}
            </Route>
            {/* http://localhost:3000/todos/&id=1 */}
            <Route path="/todos/&id=:id">
              {(props) => (
                <div>
                  <MyToDo {...props} />
                </div>
              )}
            </Route>
            {/* http://localhost:3000/todos/1 */}
            <Route path="/todos/:id">
              {(props) => (
                <div>
                  <MyToDo {...props} />
                </div>
              )}
            </Route>
            <Route>
              {(props) => (
                <div>
                  <NotFound {...props} />
                </div>
              )}
            </Route>
          </Switch>
        </ApolloProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default Routes;
