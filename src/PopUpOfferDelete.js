import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";


export default function PopUpOfferDelete(props) {


    const offerID = props.offerID;
    const dbDirectory = props.dbDirectory;
    let [show,setShow] = useState(props.show)
    const handleShow = props.handleShow
    async function deleteOffer(offerID) {
        console.log(offerID)
        await db.collection(dbDirectory).where("offerID", '==', offerID).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                
                doc.ref.delete();
            });

        });

    }



    return (

        <Popup
        closeOnDocumentClick={false}
            trigger={
                offerID ? (<Button variant="danger" >Delete Offer</Button>) : (<></>)}
            modal
        >
            {close => (
                <div className="popup">
                    <p className="header">Confirmation</p>
                    <p>Are you sure that you want to delete this Offer ?</p>
                    <Button variant="danger" className="ml-3" onClick={() => {

                        deleteOffer(offerID);
                        handleShow();
                        close();
                        

                    }
                    }>Confirm</Button>
                </div>
            )}
        </Popup>
    
    );
}

