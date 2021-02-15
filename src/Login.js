import React, { Component } from "react";
import {Link} from "react-router-dom"
import fire from "./config/fire";
import './Login.css';
import Home from "./Home"
import logo from './Tlogo.png';
export default class Login extends Component {
      
    constructor(props)
    {
        
        super(props);
        
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state={
            email : "",
            password : ""
        }
    }
    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
            this.props.history.push('/Home')
        }).catch((err)=>{
            console.log(err);
        })
    }
  
  componentDidMount() {
    this.authListener();
   
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        
      } else {
        this.setState({ user: null });
      }
    });
  }
  handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}
  render() {
     
    return (
        <div className="outer bg">
          <div className="inner">
      <form > 
      <div>
      <img className="logo" src={logo} alt="Logo" />
        <h3>Log in</h3>
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input
            id="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label className="label">Password</label>
          <input
            name="password"
            onChange={this.handleChange}
            id="password"
            value={this.state.password}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.login}>
          Sign in
          
        </button>
        
      </form>
      </div>
      </div>
    );
  }
}
