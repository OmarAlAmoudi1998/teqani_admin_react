import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import { db } from "./config/fire";


export default function PopUpDisplayComp(props) {


    const Title = props.Title;
    const Description = props.Description;
    const DisplayName = props.DisplayName;
    const Date = props.Date;
    const Email = props.Email;
    const Catagory = props.Catagory;
    const Location = props.Location;
    const Phone = props.Phone;
    const Images = props.Images;
    let postId = ''
    const dbDirectory = props.dbDirectory;
    async function tesst(){

        db.collection(dbDirectory).where("Title", "==", Title)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                postId = doc.id
               
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

    return (

        <Popup
            trigger={
                Title ? (<Button variant="info" className="butt" onClick={tesst()}> Display post</Button>) : (<></>)}
            modal
        >
            
            {close => (
                
                <div className="popup">
                    <p className="mainT"><strong>Title</strong></p>
                    <p className="Title">{Title}</p>
                    
                    <hr></hr>
                    <p className="mainT"><strong>Post information</strong></p>
                    <p>Display name : {DisplayName} </p>
                    <p>Date : {Date} </p>
                    <p>Email : {Email}</p>
                    <p>Category : {Catagory}</p>
                    <p>Location : {Location}</p>
                    <p>Phone number : {Phone}</p>
                    <hr></hr>
                    <p className="mainT"><strong>Post content</strong></p>
                    <p>Description : </p>
                    <p>{Description}</p>
                    <p>Images : </p>
                    {Images[0] ? (<a href={Images[0]}><img className="aimg" src={Images[0]}></img></a>) : ("The post doesn't have images")}
                    {Images[1] ? (<a href={Images[1]}><img className="aimg" src={Images[1]}></img></a>) : (<></>)}
                    {Images[2] ? (<a href={Images[2]}><img className="aimg" src={Images[2]}></img></a>) : (<></>)}
                    {Images[3] ? (<a href={Images[3]}><img className="aimg" src={Images[3]}></img></a>) : (<></>)}
                    <br></br>
                    <br></br>
                    <div className="center"><Button variant="info" onClick={() => {close(); }}>Close</Button></div>
                    
                </div>
            )}
        </Popup>
    
    );
}

