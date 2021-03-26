import { React, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "./config/fire";
import {useAuth} from "./AuthContext"
import Aside from './sidebar.js';
import "./sidebar.scss";
import "./App.css"
export default function PrivateRouteLayout({ component: Component, ...rest }) {
 
  
  
 const {currentUser} = useAuth();




  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            

            <div className=" app">
              
                <Aside/>
              
              <div style={{textAlign:"center",height : "100vh", overflow: "auto", width: "100%" }}>
                <Component {...props} />
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/sign-in" />
        );
      }}
    ></Route>
  );
}