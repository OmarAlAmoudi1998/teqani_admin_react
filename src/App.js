import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './UserCol.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home"
import Login from "./Login";
// import Users from "./Users";
import Customers from './Customers.js';
import Posts from "./Posts";
import Promo from "./Promo";
import Freelancer from"./Freelancer";
import RegisterAdmin from "./RegisterAdmin"
import Orders from "./Orders"
import Tickets from "./Tickets"
import PrivateRoute from "./PrivateRoute";
import { auth } from "./config/fire";
import { AuthProvider } from "./AuthContext"
function App() {

  const currentUser = useState(auth.currentUser)

  return (
    <Router>
      <AuthProvider>
      <div>
      
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              
                
                
                
              
              <PrivateRoute path="/Home" component={Home}  />
              <PrivateRoute path="/customers" component={Customers}  />
              <PrivateRoute path="/freelancers" component={Freelancer}  />
              <PrivateRoute path="/Posts" component={Posts}  />
              <PrivateRoute path="/RegisterAdmin" component={RegisterAdmin}/>
              <PrivateRoute path="/orders" component={Orders}  />
              <PrivateRoute path="/promo" component={Promo}  />
              <PrivateRoute path="/Tickets" component={Tickets}  />
              
            </Switch>
          
        
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
