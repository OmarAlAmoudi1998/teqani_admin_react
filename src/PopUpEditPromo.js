import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';
import { useAlert } from 'react-alert'


export default function PopUpEditPromo(props) {

    const alert = useAlert()
    const promo = props.promo
    const validDate = props.validDate
    const discount = props.discount
    let promoID = ""
    let [show,setShow] = useState(props.show)
    const handleShow = props.handleShow
    const [newPromo, setNewPromo] = useState(promo)
    const [newValidDate, setNewValidDate] = useState(validDate)
    const [newPercent, setNewPercent] = useState(discount)
    const dbDirectory = props.dbDirectory;
    let getDate = new Date();
    let todayDate =  getDate.getFullYear() + "-"+ correctMonth() +"-"+ getDate.getDate()

    function correctMonth(){

        let currentMonth = parseInt(getDate.getMonth()+1)

        if (currentMonth < 10){
            let currentMonthModify = "0"+parseInt(getDate.getMonth()+1)
            return currentMonthModify
        } else {
            return currentMonth
        }

    }

    const handleChangePromo = e => {

        setNewPromo(e.target.value);
        console.log(e.target.value)
    }

    const handleChangeDate = e => {

        setNewValidDate(e.target.value);
        console.log(e.target.value)
        console.log(todayDate)
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
        if (percent >= 1 && percent <= 100) {
            return false
        } else {

            return true

        }
    }
    async function EditPromo() {
        if (newPromo != "" && newValidDate != "" && newPercent != "" && newPercent >= 1 && newPercent <= 100) {
            console.log(newPromo)
            console.log(newValidDate)
            console.log(newPercent)
            db.collection(dbDirectory).doc(promoID)
                .update({
                    "promo": newPromo,
                    "validDate": newValidDate,
                    "discount": newPercent
                })
            alert.success('Promo information has been updated successfully !')
        } else if (newPromo != "" && newValidDate == "" && newPercent == "") {
            db.collection(dbDirectory).doc(promoID)
                .update({
                    "promo": newPromo,
                    "validDate": validDate,
                    "discount": discount
                })
            alert.success('Promo Code has been updated successfully !')

        } else if (newPromo != "" && newValidDate != "" && newPercent == "") {
            db.collection(dbDirectory).doc(promoID)
                .update({
                    "promo": newPromo,
                    "validDate": newValidDate,
                    "discount": discount
                })
            alert.success('Promo code and validation date has been updated successfully !')

        } else if (newPromo == "" && newValidDate != "" && newPercent == "") {
            db.collection(dbDirectory).doc(promoID)
                .update({
                    "promo": promo,
                    "validDate": newValidDate,
                    "discount": discount
                })
            alert.success('Validation date has been updated successfully !')

        } else if (newPromo == "" && newValidDate != "" && newPercent != "") {
            db.collection(dbDirectory).doc(promoID)
                .update({
                    "promo": promo,
                    "validDate": newValidDate,
                    "discount": newPercent
                })
            alert.success('Validation date and percentage has been updated successfully !')
        } else if (newPromo != "" && newValidDate == "" && newPercent != "") {
            db.collection(dbDirectory).doc(promoID)
                .update({
                    "promo": newPromo,
                    "validDate": validDate,
                    "discount": newPercent
                })
            alert.success('Promo code and percentage has been updated successfully !')

        } else if (newPromo == promo && newValidDate == validDate && newPercent == discount) {
            db.collection(dbDirectory).doc(promoID)
                .update({
                    "promo": promo,
                    "validDate": validDate,
                    "discount": discount
                })
            alert.error('Nothing has been updated, Promo information has been reset to its default values')

        } else if (newPromo != "" && newValidDate != "" &&  newPercent < 1 && newPercent > 100) {
            db.collection(dbDirectory).doc(promoID)
                .update({
                    "promo": promo,
                    "validDate": validDate,
                    "discount": discount
                })
            alert.error('Percent must be between 1% to 100%,nothing has been changed')
        }
    }


    return (

        <Popup
            trigger={
                <Button className="butt2" variant="info" onClick={getPromoId()} >Edit promo</Button>}
            modal
        >
            {close => (
                <div className="popup-content">

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
                            error={promo === ""}
                            helperText={promo === "" ? 'Please fill the field' : ''}
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
                            error={isPwrong(newPercent)}
                            helperText={isPwrong(newPercent) ? 'Pecentage should be between 1% to 100%' : ' '}
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
                            inputProps={{
                                min: todayDate,
                                
                              }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </form>

                    <Button variant="info" className="ml-5" onClick={() => {

                        EditPromo();
                        handleShow()
                        close();

                    }
                    }>Confirm</Button>

                    <Button variant="danger" className="ml-2" onClick={() => {

                        
                        
                        close();

                    }
                    }>Cancel</Button>
                </div>
            )}
        </Popup>

    );
}

