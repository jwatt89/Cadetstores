import React, { Component, useState }  from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Stores from "./components/stores.component";
import Scores from "./components/scores.component";
import Demand from "./components/viewdemands";
import Cadets from "./components/cadets.component";
import Home from "./components/home.component";
import LoanRecord from './components/loanrecord';



function App() {

  return (
    <Router>
    <div className="container">
   <Navbar />
<br/>
<Route path="/" exact component={Home} />
<Route path="/stores" exact component={Stores} />
<Route path="/scores" exact component={Scores} />
<Route path="/demand" exact component={Demand} />
<Route path="/cadets" exact component={Cadets} />
<Route path="/cadets/:id/loanrecord" exact component={LoanRecord} />

    </div>
  </Router>
  );
}


export default App;
//<Route path="/edit/:id" component={EditExercise} />
//<Route path="/create" component={CreateExercise} />
//<Route path="/user" component={CreateUser} />