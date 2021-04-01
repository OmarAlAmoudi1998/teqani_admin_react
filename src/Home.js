import './App.css';
import fire, { auth } from "./config/fire";
import { db } from "./config/fire";
import React, { Component, useState, useEffect } from 'react';
import "firebase/auth";
import './Home.css';





export default function Home() {




  const [customersData, setCustomersData] = useState([])
  const dbDirectoryCustomers = "users/Customer/users"
  const [freelancersData, setFreelancersData] = useState([])
  const dbDirectoryFreelancers = "users/Freelancer/users"
  let CustomersNumber = customersData.length;
  let FreelancersNumber = freelancersData.length;

  function getHowManyCustomer() {
    try {
      db.collection(dbDirectoryCustomers).onSnapshot(snapshot => {
        const temp = []
        snapshot.forEach(doc => {
          const data = doc.data()
          temp.push(data)
        })
        setCustomersData(temp)
      })
    } catch (e) {
      console.log('Failed to get data')
    }
  }

  function getHowManyFreelancers() {
    try {
      db.collection(dbDirectoryFreelancers).onSnapshot(snapshot => {
        const temp = []
        snapshot.forEach(doc => {
          const data = doc.data()
          temp.push(data)
        })
        setFreelancersData(temp)
        console.log(fire.auth().currentUser)
      })
    } catch (e) {
      console.log('Failed to get data')
    }
  }





  useEffect(() => {
    getHowManyCustomer();
    getHowManyFreelancers();

  }, [])


  return (


    <div className='HomeDesign' >
      <div className='fBar'>
        <br></br>
        <h1 className='Welcome'>Welcome to TeQani adminstration</h1>

      </div>
      <div className="row">
        <div className="column">
          <div className="card">
            <h2>We currently have :</h2>
            <h1>{CustomersNumber} </h1>
            <h2>Customers</h2>
          </div>
        </div>
        <div className="column">
        <div className="card">
          <h2>We currently have :</h2>
          <h1>{FreelancersNumber} </h1>
          <h2>Freelancer</h2>
        </div>
        </div>
      </div>
     


    </div>

  );



}
