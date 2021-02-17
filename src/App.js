import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home"
import Login from "./Login";
import Users from "./Users";
import Aside from './sidebar.js';
function App() {
  return (
    <Router>
      <div className="App app">
        <Aside ></Aside>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              {/* <Route path="/sign-up" component={SignUp} /> */}
              <Route path="/Home" component={Home} />
              <Route path="/Users" component={Users} />
            </Switch>
          
        
      </div>
    </Router>
  );
}

export default App;
