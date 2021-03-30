import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'


export default function PopUpDisplayUser(props) {

   const firstName = props.firstName
   const lastName = props.lastName
   const email = props.email
   const phoneNumber = props.phoneNumber
   const uid = props.uid
   const addressMap = props.addressMap
   const userType = props.userType
   const Categories = props.Categories
   const avgRating = props.avgRating
   const profilePicture = props.profilePicture
    return (

        <Popup
            trigger={
                uid ? (<Button variant="info" className="butt" >More information</Button>) : (<></>)}
            modal
        >
            
            {close => (
                
                <div className="popup">
                    
                    {profilePicture ? (<img className="avatar" src={profilePicture}></img>) : ("")}
                    <p><strong>First name :</strong> {firstName} </p>
                    <p><strong>Last name :</strong> {lastName} </p>
                    <p><strong>Email : </strong>{email}</p>
                    <p><strong>Phone number : </strong>{phoneNumber}</p>
                    {avgRating?(<div>
                        <hr></hr>
                        <p className="mainT"><strong>Freelancing information</strong></p>
                        <hr></hr>
                        <p><strong>Average rating : </strong>{avgRating}</p>
                        <p><strong>Categories :</strong> </p>
                        <p>- {Categories[0]}</p>
                        <p>- {Categories[1]}</p>
                        <p>- {Categories[2]}</p>
                        </div>):("")}
                    
                    <hr></hr>
                    <p className="mainT"><strong>Address</strong></p>
                    
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

