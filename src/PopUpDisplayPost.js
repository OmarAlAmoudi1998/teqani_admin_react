import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'


export default function PopUpDisplayPost(props) {

    const postID = props.postID
    const Title = props.Title;
    const Description = props.Description;
    const DisplayName = props.DisplayName;
    const Date = props.Date;
    const Email = props.Email;
    const Catagory = props.Catagory;
    const Images = props.Images;
    const City = props.City;
   
    return (
       
        <Popup
            trigger={
                postID ? (<Button variant="info" className="butt mr-3"  > Display post</Button>) : (<></>)}
            modal
        >
            
            {close => (
                
                <div className="popup">
                    <p className="mainT"><strong>Title</strong></p>
                    <p className="Title">{Title}</p>
                    
                    <hr></hr>
                    <p className="mainT"><strong>Post information</strong></p>
                    <p><strong>Customer Email : </strong>{Email}</p>
                    <p><strong>Date and Time : </strong>{Date} </p>
                    <p><strong>Category : </strong>{Catagory}</p>
                    <p><strong>City : </strong>{City}</p>
                    <hr></hr>
                    <p className="mainT"><strong>Post content</strong></p>
                    <p><strong>Description : </strong></p>
                    <p>{Description}</p>
                    <p><strong>Images : </strong></p>
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

