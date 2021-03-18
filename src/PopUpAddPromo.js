import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';


export default function PopUpAddPromo(props) {



    const [Promo, setPromo] = useState("")
    const [ValidDate, setValidDate] = useState("")
    const [percent, setPercent] = useState("")
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

    async function AddPromo() {

        db.collection(dbDirectory).add({
                "promo": Promo,
                "discount": percent,
                "validDate":ValidDate
            })

    }


    return (

        <Popup
            trigger={
                <Button variant="info" >Add promo</Button>}
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

                        />
                        <br></br>
                        <br></br>
                        <TextField
                            id="date"
                            style={{ margin: 2 }}
                            label="Valid until"
                            type="date"
                            defaultValue="2017-05-24"
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

