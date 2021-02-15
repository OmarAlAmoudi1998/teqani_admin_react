import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home"
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="App">
        
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              {/* <Route path="/sign-up" component={SignUp} /> */}
              <Route path="/Home" component={Home} />
            </Switch>
          
        
      </div>
    </Router>
  );
}

export default App;
