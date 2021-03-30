import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { useAlert } from 'react-alert'


export default function PopUpFreelancerChoice(props) {
    const alert = useAlert()
    const [selectedValue, setSelectedValue] = useState('');
    const [rejectMessage, setRejectMessage] = useState('');
    const uid = props.uid
    const AccountDetails = props.AccountDetails;
    const dbDirectory = props.dbDirectory;
    const ValidationUnderProgress = props.ValidationUnderProgress
    let [show, setShow] = useState(props.show)
    const handleShow = props.handleShow
    const [isMessageEmpty,setIsMessageEmpty] = useState(false)


    const handleChangeSelectedValue = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangeRejectMessage = (event) => {
        setRejectMessage(event.target.value);
        setIsMessageEmpty(false)

    }

    function updateAccountDetails() {
        if (selectedValue === 'yes') {
            db.collection(dbDirectory).doc(uid)
                .update({
                    "AccountDetails.ValidationUnderProgress": false,
                    "AccountDetails.isAccountActivated": true,
                    "AccountDetails.RejectedMessage": "",
                })
                alert.success('Freelancer has been activated')
        }
        if (selectedValue === 'no') {
            db.collection(dbDirectory).doc(uid)
                .update({
                    "AccountDetails.ValidationUnderProgress": false,
                    "AccountDetails.isAccountActivated": false,
                    "AccountDetails.RejectedMessage": rejectMessage,

                })
                alert.success('Freelancer has been rejected')

        }

    }



    return (

        <Popup
            closeOnDocumentClick={false}
            trigger={
                <Button className="butt"variant="info" >Freelancer activation</Button>}
            modal
        >
            {close => (
                <div className="popup">
                    <p className="header">Freelancer activation</p>
                    <div className="popupFreelancer">
                        <p><strong>Accept the freelancer ?</strong></p>
                        <FormControl component="fieldset">
                            <RadioGroup row>
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                    labelPlacement="top"
                                    checked={selectedValue === 'yes'}
                                    onChange={handleChangeSelectedValue}
                                />
                                <FormControlLabel
                                    value="no"
                                    control={<Radio color="primary" />}
                                    label="No"
                                    labelPlacement="top"
                                    checked={selectedValue === 'no'}
                                    onChange={handleChangeSelectedValue}
                                />
                            </RadioGroup>
                        </FormControl>
                        </div>
                        {selectedValue === 'yes' && (<div><br></br>
                        <div className="popupFreelancer">
                        <Button variant="info" className="mr-1"onClick={() => {
                            
                                updateAccountDetails();
                                handleShow();
                                close();
                                
                        }
                        }>Confirm</Button>
                        <Button variant="info" className="ml-3"onClick={() => {
                            close();
                        }
                        }>Close</Button>
                    </div></div>)}
                        {selectedValue === 'no' && (<div>
                            <p><strong>Reject message : </strong></p>
                            <TextField
                            id="outlined-multiline-static"
                            style={{ margin: 2 }}
                            label="Reject message"
                            multiline={true}
                            rows={10}
                            variant="outlined"
                            onChange={handleChangeRejectMessage}
                            fullWidth
                            error={isMessageEmpty}
                            helperText={isMessageEmpty ? 'Please write the reject message' : ' '}
                        />
                        <br></br>
                        <div className="popupFreelancer">
                        <Button variant="info" className="mr-1"onClick={() => {
                            if(rejectMessage != "" ){
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
                        
                        </div>)}

                        
                </div>
            )}
        </Popup>

    );
}

