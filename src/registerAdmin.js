import React, { Component,useState,useEffect } from 'react';
import fire from "./config/fire";
import { db } from "./config/fire";
import { auth } from "./config/fire";
import TextField from '@material-ui/core/TextField';
import './register.css'
import { Button } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { useHistory } from "react-router-dom";
const RegisterAdmin = () => {
    const [fullName,setFullName] = useState("")
    const [email, setEmail] = useState("asd1@gmail.com")
    const [password, setPassword] = useState("123456")
    const dbDirectory = "users/Admin/users"
    const alert = useAlert()
    const history = useHistory();

    const handleChangeName = e => {

        setFullName(e.target.value);
        console.log(e.target.value)
    
    }
    const handleChangeEmail = e => {

        setEmail(e.target.value);
        console.log(e.target.value)
    
    }
    const handleChangePassword = e => {

        setPassword(e.target.value);
        console.log(e.target.value)
    
    }

    const routeChange = () =>{ 
        let path = `/sign-in`; 
        history.push(path);
      }

    function RegisterNewAdmin() {
        
        auth.createUserWithEmailAndPassword(email,password).then((user) =>{

            fire.auth().signOut();
            routeChange();
        })
        
        db.collection(dbDirectory).doc(email).set({
            "name": fullName,
            "email": email,
        })

        document.getElementById("registerForm").reset();
        console.log(auth.currentUser.email)
        fire.auth().signOut();
    }

    return(
    <div className="HomeDesign">


    <div className="dBar">
    <br></br>

    <h1 className="detailsHead">Register new admin</h1>

    </div>
        
        <div className="mainContainer">
            <form id="registerForm">
        <p className="pPos"><strong>Full name : </strong></p>
        <TextField
        className ="textfield"
          id="NameField"
          label="Full name"
          onChange={handleChangeName}
          variant="filled"
        />
        <p className="pPos2"><strong>Email : </strong></p>
        <TextField
        className ="textfield"
          id="EmailField"
          label="Email"
          onChange={handleChangeEmail}
          variant="filled"
        />
        <p className="pPos"><strong>Password : </strong></p>
        <TextField
        className ="textfield"
          id="PasswordField"
          label="Password"
          onChange={handleChangePassword}
          type="password"
          variant="filled"
        />
        <br></br>
        <Button className="registerButton" onClick={RegisterNewAdmin}>Register</Button>
        </form>
        </div>
        </div>
    );

}
export default RegisterAdmin;