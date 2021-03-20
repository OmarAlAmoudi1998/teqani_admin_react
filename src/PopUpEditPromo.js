import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';


export default function PopUpEditPromo(props) {


    const promo = props.promo
    const validDate = props.validDate
    const discount = props.discount
    let promoID =""
    const [newPromo, setNewPromo] = useState(promo)
    const [newValidDate, setNewValidDate] = useState(validDate)
    const [newPercent, setNewPercent] = useState(discount)
    const dbDirectory = props.dbDirectory;

    const handleChangePromo = e => {
        
        setNewPromo(e.target.value);
        console.log(e.target.value)
    }

    const handleChangeDate = e => {

        setNewValidDate(e.target.value);
        console.log(e.target.value)
    }

    const handleChangePercent = e => {

        setNewPercent(e.target.value);
        console.log(e.target.value)
    }

    async function getPromoId() {

        db.collection(dbDirectory).where("promo", "==", promo)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    promoID = doc.id
                    console.log(promoID)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }

    function isPwrong(percent) {
        if ( percent >= 1 && percent <= 100){
            return false
        } else {

            return true

        }
    }
    async function EditPromo() {
        if (newPromo != "" && newValidDate!="" && newPercent!=""){
        db.collection(dbDirectory).doc(promoID)
            .update({
                "promo": newPromo,
                "validDate": newValidDate,
                "discount" : newPercent
            })
        } else if(newPromo != "" && newValidDate=="" && newPercent=="") {
            db.collection(dbDirectory).doc(promoID)
            .update({
                "promo": newPromo,
                "validDate": validDate,
                "discount" : discount
            })
        } else if (newPromo != "" && newValidDate!="" && newPercent==""){
            db.collection(dbDirectory).doc(promoID)
            .update({
                "promo": newPromo,
                "validDate": newValidDate,
                "discount" : discount
            })
        }   else if (newPromo == "" && newValidDate!="" && newPercent==""){
            db.collection(dbDirectory).doc(promoID)
            .update({
                "promo": promo,
                "validDate": newValidDate,
                "discount" : discount
            })
        }   else if (newPromo == "" && newValidDate!="" && newPercent!=""){
            db.collection(dbDirectory).doc(promoID)
            .update({
                "promo": promo,
                "validDate": newValidDate,
                "discount" : newPercent
            })
        }    else if (newPromo != "" && newValidDate=="" && newPercent!=""){
            db.collection(dbDirectory).doc(promoID)
            .update({
                "promo": newPromo,
                "validDate": validDate,
                "discount" : newPercent
            })
        }   else if (newPromo == "" && newValidDate=="" && newPercent!=""){
            db.collection(dbDirectory).doc(promoID)
            .update({
                "promo": promo,
                "validDate": validDate,
                "discount" : newPercent
            })
        }
    }


    return (

        <Popup
            trigger={
                <Button variant="info" onClick={getPromoId()} >Edit promo</Button>}
            modal
        >
            {close => (
                <div className="popup">

                    <form>

                        <TextField
                            id="outlined-full-width"
                            style={{ margin: 2 }}
                            label="Promo code"
                            defaultValue={promo}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            error={promo === "" }
                            helperText={promo === ""  ? 'Please fill the field' : ''}
                            onChange={handleChangePromo}

                        />
                        <br></br>
                        <br></br>
                        <TextField
                            id="outlined-full-width"
                            style={{ margin: 2 }}
                            label="Percentage"
                            defaultValue={discount}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            inputProps={{ type: 'number' }}
                            error={isPwrong(discount)}
                            helperText={isPwrong(discount) ? 'Pecentage should be between 1% to 100%' : ' '}
                            onChange={handleChangePercent}

                        />
                        <br></br>
                        <br></br>
                        <TextField
                            id="date"
                            style={{ margin: 2 }}
                            label="Valid until"
                            type="date"
                            defaultValue={validDate}
                            variant="outlined"
                            onChange={handleChangeDate}
                            
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </form>

                    <Button variant="info" onClick={() => {

                        EditPromo();
                        close();

                    }
                    }>Confirm</Button>
                </div>
            )}
        </Popup>

    );
}

