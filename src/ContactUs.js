import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import fire from './config/fire';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import PopupContactUs from './PopupContactUs'


import './popup.css'

const ContactUs = () => {
    const dbDirectory = "contactUs/Account Activation/quaries"
    const [ContactUsData, setContactUsData] = useState([]);
    const [Message, setMessage] = useState('');
    const [UserID, setUserID] = useState('');
    const [UserEmail, setUserEmail] = useState('');

    let [show, setShow] = useState(false)
    const handleShow = () => {

        setShow(!show)

    }



    async function getContactUsData() {


        try {



            await db.collection(dbDirectory).onSnapshot(snapshot => {
                const temp = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    temp.push(data)
                })
                setContactUsData(temp)

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
            setShow(true)

        }
    };

    useEffect(() => {

        getContactUsData();

    }, [])


    return (

        <div className="HomeDesign">


            <div className="dBar">
                <br></br>

                <h1 className="detailsHead">Promos management</h1>

            </div>

            <br></br>


            <br></br>
            <br></br>

            <div className="container" style={{ width: "fit-content", height: "fit-content" }}>




                {show ? (<div>
                    <PopupContactUs
                        Message={Message}
                        UserID={UserID}
                        UserEmail={UserEmail}
                        handleShow={handleShow}
                        show={show}
                    />




                </div>) : (<></>)}

                <BootstrapTaple
                    bootstrap4
                    keyField="UserID"
                    data={ContactUsData}
                    columns={coulmns}
                    selectRow={selectRow}
                    pagination={paginationFactory()}
                    defaultSorted={defaultSorted}
                    condensed

                />




            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    )

}

export default ContactUs;