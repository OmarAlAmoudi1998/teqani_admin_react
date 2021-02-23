import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";
export default function PopUpDelete(props) {

    const data = props.data;
    function deleteUser(data) {
        console.log(data)
        db.collection("users/Customer/users").where("phoneNumber", '==', data).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });

    }
    return (

        <Popup
            trigger={
                data ? (<Button variant="danger" > Delete customer </Button>) : (<></>)}
            modal
        >
            <div className="popup">
                <p className="header">Confirmation</p>
                <p>Are you sure that you want to delete this account ?</p>
                <Button variant="danger" onClick={() => deleteUser(data)}>Confirm</Button>
            </div>

        </Popup>

    );
}

