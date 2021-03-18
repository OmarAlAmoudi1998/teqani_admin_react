import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";


export default function PopUpPostComp(props) {


    const Title = props.Title;
    const dbDirectory = props.dbDirectory;

    async function deletePost(Title) {

        await db.collection(dbDirectory).where("Title", '==', Title).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

                doc.ref.delete();
            });

        });

    }



    return (

        <Popup
            trigger={
                Title ? (<Button variant="danger" > Delete post</Button>) : (<></>)}
            modal
        >
            {close => (
                <div className="popup">
                    <p className="header">Confirmation</p>
                    <p>Are you sure that you want to delete this post ?</p>
                    <Button variant="danger" onClick={() => {

                        deletePost(Title);
                        close();

                    }
                    }>Confirm</Button>
                </div>
            )}
        </Popup>
    
    );
}

