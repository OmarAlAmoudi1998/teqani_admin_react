import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';
import { useAlert } from 'react-alert'

export default function PopUpAddPromo(props) {

    const alert = useAlert()
    const [Promo, setPromo] = useState("")
    const [ValidDate, setValidDate] = useState("")
    const [percent, setPercent] = useState(1)
    const dbDirectory = props.dbDirectory;
    let getDate = new Date();
    let todayDate =  getDate.getFullYear() + "-"+ correctMonth() +"-"+ getDate.getDate()

    const handleChangePromo = e => {

        setPromo(e.target.value);
        console.log(e.target.value)
    
    }

    const handleChangeDate = e => {

        setValidDate(e.target.value);
        console.log(e.target.value)
        console.log(todayDate)
    }

    const handleChangePercent = e => {
        setPercent(e.target.value);
        console.log(e.target.value)
    
    }

    function correctMonth(){

        let currentMonth = parseInt(getDate.getMonth()+1)

        if (currentMonth < 10){
            let currentMonthModify = "0"+parseInt(getDate.getMonth()+1)
            return currentMonthModify
        } else {
            return currentMonth
        }

    }

    function isPwrong(percent) {
        if ( percent >= 1 && percent <= 100){
            return false
        } else {

            return true

        }
    }

    async function AddPromo() {
        console.log(Promo)
        console.log(percent)
        console.log(ValidDate)
        
        if (Promo != "" && percent!="" && ValidDate!="" && Promo !=" " && percent >= 1 && percent <= 100 ){
        db.collection(dbDirectory).add({
                "promo": Promo,
                discount: percent,
                "validDate":ValidDate
            })
        } else {

            alert.error('Please complete the required information')

        }
    }


    return (

        <Popup
        closeOnDocumentClick={false}
            trigger={
                <Button className="butt" variant="info" >Add promo</Button>}
            modal
        >
            {close => (
                <div className="popup-content">

                    <form>

                        <TextField
                            id="outlined-full-width"
                            style={{ margin: 2 }}
                            label="Promo code"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            
                            onChange={handleChangePromo}
                            

                        />
                        <br></br>
                        <br></br>
                        <TextField
                            id="outlined-full-width"
                            style={{ margin: 2 }}
                            label="Percentage"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            inputProps={{ type: 'number'}}
                            onChange={handleChangePercent}
                            defaultValue="1"
                            error={isPwrong(percent)}
                            helperText={isPwrong(percent) ? 'Pecentage should be between 1% to 100%' : ' '}

                        />
                        <br></br>
                        <br></br>
                        <TextField
                            id="date"
                            style={{ margin: 2 }}
                            label="Valid until"
                            type="date"
                            
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

                    <Button className="mr-2 ml-3 mt-4" variant="info" onClick={() => {
                        AddPromo();
                        close();
                        
                    }
                    }>Add promo</Button>
                    <Button className=" mt-4" variant="danger" onClick={() => {
                        
                        close();
                        setPercent(1)
                    }
                    }>Close</Button>
                </div>
            )}
        </Popup>

    );
}

