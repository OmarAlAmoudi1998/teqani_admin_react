import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home"
import Login from "./Login";
import Users from "./Users";
import Aside from './sidebar.js';
import Customers from './Customers.js';
import SignUp from './SignUp.js';
import Computers from "./Computers";
function App() {
  return (
    <Router>
      
      <div className="App app">
      
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <div className="App app">
                <Aside></Aside>
              {/* <Route path="/sign-up" component={SignUp} /> */}
              <Route path="/Home" component={Home} />
              <Route path="/Users" component={Users} />
              <Route path="/customers" component={Customers} />
              <Route path="/Computers" component={Computers} />
              </div>
            </Switch>
          
        
      </div>
    </Router>
  );
}

export default App;
