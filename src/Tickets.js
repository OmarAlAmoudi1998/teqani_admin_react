import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import fire from './config/fire';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import PopUpTicketReply from './PopUpTicketReply'
import PopUpTicketView from './PopUpTicketView'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

import './popup.css'

const Tickets = () => {
    const [dbDirectory, setDBdirectory] = useState('')
    const [TicketData, setTicketData] = useState([]);
    const [TicketRepliedData, setTicketRepliedData] = useState([]);
    const [Message, setMessage] = useState('');
    const [UserID, setUserID] = useState('');
    const [UserEmail, setUserEmail] = useState('');
    const [AdminMessage, setAdminMessage] = useState('');
    const [isTicketClosed, setIsTicketClosed] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    let [show, setShow] = useState(false)
    const handleShow = () => {

        setShow(!show)

    }
    const handleChangeDBdirectory = (event) => {
        setDBdirectory(event.target.value);
        setSelectedValue("")
        setUserEmail("")
    };
    const handleChangeSelectedValue = (event) => {
        setSelectedValue(event.target.value);
        setUserEmail("")
    };

    async function getTicketData() {


        try {



            await db.collection(dbDirectory).where("isTicketClosed", "==", false).onSnapshot(snapshot => {
                const temp = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    temp.push(data)
                })
                setTicketData(temp)

            })
        } catch (e) {
            console.log('Failed to get data')
        }

    }

    async function getTicketRepliedData() {


        try {



            await db.collection(dbDirectory).where("isTicketClosed", "==", true).onSnapshot(snapshot => {
                const temp = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    temp.push(data)
                })
                setTicketRepliedData(temp)

            })
        } catch (e) {
            console.log('Failed to get data')
        }

    }

    const coulmns = [
        {
            dataField: "UserEmail",
            text: "User email",
            hidden: false
        },
        {
            dataField: "Message",
            text: "Message",
            hidden: false

        },
        {
            dataField: "UserID",
            text: "User ID",
            hidden: true
        },
        {
            dataField: "AdminMessage",
            text: "Reply",
            hidden: true
        },
        {
            dataField: "isTicketClosed",
            text: "already replied?",
            hidden: true
        },


    ]

    const defaultSorted = [{
        dataField: 'UserEmail',
        order: 'desc'
    }];

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,

        style: { backgroundColor: '#c8e6c9' },
        onSelect: (row, isSelect, rowIndex, e) => {
            setMessage(row.Message)
            setUserEmail(row.UserEmail)
            setUserID(row.UserID)
            setAdminMessage(row.AdminMessage)
            setIsTicketClosed(row.isTicketClosed)
            setShow(true)

        }
    };

    useEffect(() => {

        getTicketData();
        getTicketRepliedData()
    }, [dbDirectory])


    return (

        <div className="HomeDesign">


            <div className="dBar">
                <br></br>

                <h1 className="detailsHead">Tickets</h1>

            </div>
            <div className="radioButtonTickets">
                <h4><strong>Select category</strong></h4>
            <FormControl component="fieldset">
                <RadioGroup row>
                    <FormControlLabel
                        value="contactUs/Account Activation/quaries"
                        control={<Radio color="primary" />}
                        label="Account activation"
                        labelPlacement="top"
                        checked={dbDirectory === 'contactUs/Account Activation/quaries'}
                        onChange={handleChangeDBdirectory}
                    />
                    <FormControlLabel
                        value="contactUs/Payments/quaries"
                        control={<Radio color="primary" />}
                        label="Payments"
                        labelPlacement="top"
                        checked={dbDirectory === 'contactUs/Payments/quaries'}
                        onChange={handleChangeDBdirectory}
                    />
                    <FormControlLabel
                        value="contactUs/Report Bugs/quaries"
                        control={<Radio color="primary" />}
                        label="Report Bugs"
                        labelPlacement="top"
                        checked={dbDirectory === 'contactUs/Report Bugs/quaries'}
                        onChange={handleChangeDBdirectory}
                    />
                </RadioGroup>
            </FormControl>
            </div>
            <br></br>

            {dbDirectory ? (<div>

                <div className="radioButtonContainer">
                    <FormControl component="fieldset">
                        <RadioGroup row>
                            <FormControlLabel
                                value="notreplied"
                                control={<Radio color="primary" />}
                                label="Waiting for reply"
                                labelPlacement="top"
                                checked={selectedValue === 'notreplied'}
                                onChange={handleChangeSelectedValue}
                            />
                            <FormControlLabel
                                value="replied"
                                control={<Radio color="primary" />}
                                label="Already replied"
                                labelPlacement="top"
                                checked={selectedValue === 'replied'}
                                onChange={handleChangeSelectedValue}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <br></br>
                <br></br>
                {selectedValue === 'notreplied' && (<div>


                    <div className="container" style={{ width: "fit-content", height: "fit-content" }}>




                        {show ? (<div>
                            <PopUpTicketReply
                                Message={Message}
                                UserID={UserID}
                                UserEmail={UserEmail}
                                handleShow={handleShow}
                                show={show}
                                dbDirectory={dbDirectory}
                            />




                        </div>) : (<></>)}

                        <BootstrapTaple
                            bootstrap4
                            keyField="UserID"
                            data={TicketData}
                            columns={coulmns}
                            selectRow={selectRow}
                            pagination={paginationFactory()}
                            defaultSorted={defaultSorted}
                            condensed

                        />




                    </div>

                </div>)}

                {selectedValue === 'replied' && (<div>

                    <div className="container" style={{ width: "fit-content", height: "fit-content" }}>




                        <div>
                            <PopUpTicketView
                                Message={Message}
                                UserID={UserID}
                                UserEmail={UserEmail}
                                AdminMessage={AdminMessage}

                            />




                        </div>

                        <BootstrapTaple
                            bootstrap4
                            keyField="UserID"
                            data={TicketRepliedData}
                            columns={coulmns}
                            selectRow={selectRow}
                            pagination={paginationFactory()}
                            defaultSorted={defaultSorted}
                            condensed

                        />




                    </div>


                </div>)}

            </div>) : (<></>)}



            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    )

}

export default Tickets;