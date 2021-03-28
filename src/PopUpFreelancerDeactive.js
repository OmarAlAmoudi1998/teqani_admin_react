import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';



export default function PopUpFreelancerChoice(props) {

    
    const [rejectMessage, setRejectMessage] = useState('');
    const uid = props.uid
    const AccountDetails = props.AccountDetails;
    const dbDirectory = props.dbDirectory;
    const ValidationUnderProgress = props.ValidationUnderProgress
    let [show, setShow] = useState(props.show)
    const handleShow = props.handleShow
    const [isMessageEmpty,setIsMessageEmpty] = useState(false)



    const handleChangeRejectMessage = (event) => {
        setRejectMessage(event.target.value);
        setIsMessageEmpty(false)
    }

    function updateAccountDetails() {
        
            db.collection(dbDirectory).doc(uid)
                .update({
                    "AccountDetails.ValidationUnderProgress": false,
                    "AccountDetails.isAccountActivated": false,
                    "AccountDetails.RejectedMessage": rejectMessage,
                })
        }
        

    



    return (

        <Popup
            closeOnDocumentClick={false}
            trigger={
                <Button className="butt"variant="info" >Freelancer deactivation</Button>}
            modal
        >
            {close => (
                <div className="popup">
                    <p className="header">Freelancer deactivation</p>
                    
                        
                        
                            <p><strong>Deactive message : </strong></p>
                            <TextField
                            id="outlined-multiline-static"
                            style={{ margin: 2 }}
                            label="Deactive message"
                            multiline={true}
                            rows={10}
                            variant="outlined"
                            onChange={handleChangeRejectMessage}
                            fullWidth
                            error={isMessageEmpty}
                            helperText={isMessageEmpty ? 'Please write the deactivation message' : ' '}
                            />
                        

                        <br></br>
                        <div className="popupFreelancer">
                        <Button variant="info" className="mr-1"onClick={() => {
                            if(rejectMessage != ""){
                            updateAccountDetails();
                            handleShow();
                            close();
                            } else {
                                setIsMessageEmpty(true)
                            }
                        }
                        }>Confirm</Button>
                        <Button variant="info" className="ml-3"onClick={() => {
                            close();
                        }
                        }>Close</Button>
                    </div>
                </div>
            )}
        </Popup>

    );
}

