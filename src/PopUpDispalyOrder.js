
import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import { db } from "./config/fire";


export default function PopUpDisplayOrder(props) {

    const OrderNumber = props.OrderNumber
    const Title = props.Title
    const Price = props.Price
    const Payed = props.Payed
    const CustomerID = props.CustomerID
    const FreelancerID = props.FreelancerID
    const isOrderClosed = props.isOrderClosed
    const isPayed = props.isPayed
    const isRatingDone = props.isRatingDone
    const orderID = props.orderID
    const promo = props.promo
    const PayingState = isTotalPaid();
    const customerDBdirectory = "users/Customer/users"
    const freelancerDBdirectory = "users/Freelancer/users"
    
    let CustomerFirstName = ""
    let CustomerLastName = ""
    let CustomerEmail = ""
    let FreelancerFirstName = ""
    let FreelancerLastName = ""
    let FreelancerEmail = ""
        try {



             db.collection(customerDBdirectory).where("uid",'==',CustomerID).onSnapshot(snapshot => {
              
              snapshot.forEach(doc => {
                
                CustomerFirstName = doc.data().firstName
                CustomerLastName = doc.data().lastName
                CustomerEmail = doc.data().email
              })
              
              
              console.log(CustomerFirstName)
            })
      
        

      
          } catch (e) {
            console.log('Failed to get data')
          }


          try {



             db.collection(freelancerDBdirectory).where("uid",'==',FreelancerID).onSnapshot(snapshot => {
              
              snapshot.forEach(doc => {
                FreelancerFirstName = doc.data().firstName
                FreelancerLastName = doc.data().lastName
                FreelancerEmail = doc.data().email
              })

            })
      
      
      
          } catch (e) {
            console.log('Failed to get data')
          }


    function isTotalPaid(){

        if (Price === Payed){
            return "The customer paid 100% of the price"
        } else if(Payed === 0){

            return  "The customer did not pay"

        }  else if(Price > Payed) {

            return "The customer payed 40% of the price"

        }

    }

    return (
       
        <Popup
            trigger={
                OrderNumber ? (<Button variant="info" className="butt mr-3"  >More information</Button>) : (<></>)}
            modal
        >
            
            {close => (
                
                <div className="popup">
                    <p className="mainT"><strong>Order number</strong></p>
                    <p className="Title">{OrderNumber}</p>
                    <p className="Title"><strong>Post title : </strong> {Title}</p>
                    <hr></hr>
                    <p className="mainT"><strong>Customer information</strong></p>
                    
                    <p><strong>Customer name : </strong>{CustomerFirstName} {CustomerLastName}</p>
                    <p><strong>Customer email : </strong>{CustomerEmail}</p>
                    <hr></hr>
                    <p className="mainT"><strong>Freelancer information</strong></p>
                    <p><strong>Freelancer name : </strong>{FreelancerFirstName} {FreelancerLastName}</p>
                    <p><strong>Freelancer email : </strong>{FreelancerEmail}</p>
                    <hr></hr>
                    <p className="mainT"><strong>Payment information</strong></p>
                    <p><strong>The Total price : </strong>{Price} SR</p>
                    <p><strong>The customer has paid : </strong>{Payed} SR</p>
                    <p><strong>{PayingState}</strong></p>
                    {/* <p><strong>City : </strong>{City}</p> */}
                    <hr></hr>
                    <p className="mainT"><strong>Post content</strong></p>
                    {/* <p><strong>Description : </strong></p>
                    <p>{Description}</p> */}
                    
                    <br></br>
                    <br></br>
                    <div className="center"><Button variant="info" onClick={() => {close(); }}>Close</Button></div>
                    
                </div>
            )}
        </Popup>
    
    );
}



