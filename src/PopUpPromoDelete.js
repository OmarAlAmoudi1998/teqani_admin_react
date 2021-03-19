import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";


export default function PopUpPromoDelete(props) {


    const promo = props.promo;
    const dbDirectory = props.dbDirectory;

    async function deletePromo(promo) {

        await db.collection(dbDirectory).where("promo", '==', promo).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

                doc.ref.delete();
            });

        });

    }



    return (

        <Popup
            trigger={
                promo ? (<Button variant="danger" >Delete promo</Button>) : (<></>)}
            modal
        >
            {close => (
                <div className="popup">
                    <p className="header">Confirmation</p>
                    <p>Are you sure that you want to delete this promo ?</p>
                    <Button variant="danger" onClick={() => {

                        deletePromo(promo);
                        close();

                    }
                    }>Confirm</Button>
                </div>
            )}
        </Popup>
    
    );
}

