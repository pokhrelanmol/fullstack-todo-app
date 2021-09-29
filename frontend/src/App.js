import React from "react";
import Todos from "../src/components/Todos";
import Nav from "./components/Nav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Todos />
        </Route>
        <Route exact path="/register" component={RegistrationForm}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
