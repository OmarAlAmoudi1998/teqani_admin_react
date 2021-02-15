import React , { Component } from "react";
import fire from "./config/fire";

class Home extends Component{
constructor(props)
{
 super(props)
    
    
}
logout(){
    fire.auth().signOut();
    this.props.history.push('/sign-in')
}
render()
{
    return(
        <div>
           <h1>You are logged in !!!</h1>
           <button
          onClick={() => {
            fire.auth().signOut();
            this.props.history.push("/sign-in");}}>
          Logout
        </button>    
            </div>
    )
}
}
export default Home;