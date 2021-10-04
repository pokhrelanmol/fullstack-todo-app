import React from "react";
import Todos from "../src/components/Todos";
import Nav from "./components/Nav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import ChangePassword from "../src/components/ChangePassword";
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
        <Route exact path="/change-password" component={ChangePassword}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
