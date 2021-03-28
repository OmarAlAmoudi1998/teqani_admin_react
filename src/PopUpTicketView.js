import emailjs from "emailjs-com";
import React , {useState} from 'react';
import { propTypes } from "react-bootstrap/esm/Image";
import { db } from "./config/fire";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { useAlert } from 'react-alert'

export default function PopUpTicketView(props) {
    
    const AdminMessage = props.AdminMessage
    const Message = props.Message;
    const UserEmail = props.UserEmail;
    const UserID = props.UserID;
    
 

    return(

        <Popup
        closeOnDocumentClick={false}
        trigger={
            UserEmail ? (<Button className="butt" variant="info" >View Ticket</Button>) : (<></>)}
        modal
    >
        {close => (
                
                <div className="popup">
                    <p className="mainT"><strong>Message info</strong></p>
                    <p><strong>Customer email : </strong>{UserEmail}</p>
                    <p><strong>Message content : </strong></p>
                    <p>{Message}</p>
                    <hr></hr>
                    <p><strong>Reply  :</strong></p>
                    <div className="center">
                    <p>{AdminMessage}</p>
                    
                            <Button className="mt-3" variant="info" onClick={() => { 
                                close();
                                }}>Close</Button>                   
                        </div>
                        
                </div>
            )}
    </Popup>
        
    )
}