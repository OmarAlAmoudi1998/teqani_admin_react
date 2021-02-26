import React, { Component, useState ,useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";


export default function PopUpPostDelete(props) {


    const data = props.data;
    async function deleteUser(data) {
        console.log(data)
        await db.collection("posts/Computer/posts").where("Title", '==', data).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
            
        });   
        
    }



    return (

        <Popup
            trigger={
                data ? (<Button variant="danger" > Delete post</Button>) : (<></>)}
            modal
        >
            {close => (
            <div className="popup">
                <p className="header">Confirmation</p>
                <p>Are you sure that you want to delete this post ?</p>
                <Button variant="danger" onClick={() => {
                    
                    deleteUser(data);
                    close();
                    
                }
                    }>Confirm</Button>
            </div>
            )}
        </Popup>

    );
}

