import React from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AddEdit } from "./Pages/AddEdit";
import View from "./Pages/View";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import { auth } from "./firebase";
import { useState } from "react";
import { useHistory } from "react-router";
import Login from "./Pages/Login";
import { useAuth } from "./Context/AuthContext";

function App() {
  const { currentUser } = useAuth();
  const history = useHistory();

  if (currentUser) {
    return (
      <Router>
        <div className="App">
          <Header />
          <ToastContainer position="top-center" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={AddEdit} />
            <Route path="/update/:id" component={AddEdit} />
            <Route path="/view/:id" component={View} />
          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <Login />
      </Router>
    );
  }
}

export default App;
