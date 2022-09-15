import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import './App.css';
import Register from "./components/Register";
import Generate from "./components/Generate";
import Passcodes from "./components/Passcodes";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="nav">
          <div className="nav_left">
              <h1>Passgen</h1>
          </div>
          <div className="nav_right">
              <div className="flexer">
                <Link to="/" className="nav_link">Home</Link>
                <Link to="/Login" className="nav_link">Login</Link>
                <Link to="/Register" className="nav_link">Register</Link>
                <Link to="/passcodes" className="nav_link" >Passcodes</Link>
              </div>
          </div>
        </div>
        <div className="content">
          <Route path="/" exact component={Landing}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/generate" exact component={Generate} />
          <Route path="/passcodes" exact component={Passcodes}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
