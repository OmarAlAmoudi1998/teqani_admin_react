import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';
import { useAlert } from 'react-alert'

export default function PopUpAddPromo(props) {

    const alert = useAlert()
    const [Promo, setPromo] = useState("-")
    const [ValidDate, setValidDate] = useState("")
    const [percent, setPercent] = useState("1")
    const dbDirectory = props.dbDirectory;
    
    const handleChangePromo = e => {

        setPromo(e.target.value);
        console.log(e.target.value)
    
    }

    const handleChangeDate = e => {

        setValidDate(e.target.value);
        console.log(e.target.value)
    }

    const handleChangePercent = e => {
        setPercent(e.target.value);
        console.log(e.target.value)
    
    }

    // function makeRandomPromo() {
    //     var text = "";
    //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
    //     for (var i = 0; i < 4; i++)
    //       text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     console.log(text)
    //     return text;

    //   }

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
        if (Promo != "" && percent!="" && ValidDate!=""){
        db.collection(dbDirectory).add({
                "promo": Promo,
                "discount": percent,
                "validDate":ValidDate
            })
        } else {

            alert.error('Please complete the required information')

        }
    }


    return (

        <Popup
            trigger={
                <Button className="butt" variant="info" >Add promo</Button>}
            modal
        >
            {close => (
                <div className="popup">

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
                            defaultValue={Promo}
                            onChange={handleChangePromo}
                            error={Promo === "" }
                            helperText={Promo === ""  ? 'Please fill the field' : ''}

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
                            
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </form>

                    <Button variant="danger" onClick={() => {
                        AddPromo();
                        close();
                        
                    }
                    }>Confirm</Button>
                </div>
            )}
        </Popup>

    );
}

