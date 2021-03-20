import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import { db } from "./config/fire";


export default function PopUpDisplayUser(props) {

   const firstName = props.firstName
   const lastName = props.lastName
   const email = props.email
   const phoneNumber = props.phoneNumber
   const uid = props.uid
   const addressMap = props.addressMap
   const userType = props.userType

    return (

        <Popup
            trigger={
                uid ? (<Button variant="info" className="butt" >More information</Button>) : (<></>)}
            modal
        >
            
            {close => (
                
                <div className="popup">
                    <p className="mainT"><strong>Information</strong></p>
                    <hr></hr>
                    <p>First name : {firstName} </p>
                    <p>Last name : {lastName} </p>
                    <p>Email : {email}</p>
                    <p>Phone number : {phoneNumber}</p>
                    <hr></hr>
                    <p className="mainT"><strong>Address</strong></p>
                    <hr></hr>
                    <p>City : {addressMap.city}</p>
                    <p>District : {addressMap.district}</p>
                    <p>Street : {addressMap.street}</p>
                    <hr></hr>
                
                    <br></br>
                    <br></br>
                    <div className="center"><Button variant="info" onClick={() => {close(); }}>Close</Button></div>
                    
                </div>
            )}
        </Popup>
    
    );
}

