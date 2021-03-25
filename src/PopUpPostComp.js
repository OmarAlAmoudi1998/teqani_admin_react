import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";


export default function PopUpPostComp(props) {

    let Title = props.Title;
    const dbDirectory = props.dbDirectory;
    const postID = props.postID;
    let [show,setShow] = useState(props.show)
    const handleShow = props.handleShow
    

 
    async function deletePost(postID) {

        await db.collection(dbDirectory).where("postID", '==', postID).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

                doc.ref.delete();
            });

        });

        

    }



    return (

        <Popup
            trigger={
                show ? (<Button className="butt mr-3" variant="danger" > Delete post</Button>) : (<></>)}
            modal
        >
            {close => (
                <div className="popup">
                    <p className="header">Confirmation</p>
                    <p>Are you sure that you want to delete this post ?</p>
                    <Button variant="danger" onClick={() => {

                        deletePost(postID);
                        handleShow()
                        close();

                    }
                    }>Confirm</Button>
                </div>
            )}
        </Popup>
    
    );
}

