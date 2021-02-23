import './App.css';
import fire from "./config/fire";
import { db } from "./config/fire";
import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import Users from './Users';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';





class Home extends Component {
  


  constructor() {
    super();
    this.state = {
      composts: null,
      user: null,
    }

    this.getFullName = this.getFullName.bind(this);

  }



componentDidMount() {

  console.log('mounted')
  this.getFullName()
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {



  //   }
  // });



  db.collection('posts/Computer/posts').get().then(snapshot => {
    const composts = []

    snapshot.forEach(doc => {
     
      const data = doc.data()
      composts.push(data)
    })
    this.setState({ composts: composts })

  }).catch(error => console.log(error))

}


getFullName ()  {
  console.log('fun started')
  console.log(fire.auth.currentUser)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {

      
        var temp;
          db
          .collection("/users/Admin/users/")
          .doc(user.uid+"")
          .get()
          .then((doc) => {
            const data = doc.data();
            temp = data.name;
            console.log(temp)
            this.setState({user : temp})
          
          })
          .catch((error) => {
            console.log(error);
          });
          
      

    }
  });


}


render() {

  

  return (

    
    <div className='HomeDesign' >
      <div className='fBar'>
        <br></br>
        <h1 className='Welcome'>Welcome,</h1>
        <h1 className='_user'>{this.state.user}</h1>
      </div>


      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      <h1>OMAR </h1>
      {
        this.state.composts && this.state.composts.map(compost => {
          return (
            <>
              <p>{compost.Date}</p>
            </>
          )
        })

      }


    </div>

  )

}

}

export default Home;