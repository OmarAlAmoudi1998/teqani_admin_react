import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import fire from './config/fire';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
export default function PopUpViewPostOffers(props) {
    const postID = props.postID
    const [offers, setOffers] = useState([]);
    const dbDirectory1 = "offers"
    async function getOffersData() {

        try {
            await db.collection(dbDirectory1).where("postID", '==', postID).onSnapshot(snapshot => {
                const temp = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    temp.push(data)
                })
                setOffers(temp)
                console.log(offers)
            })

        } catch (e) {
            console.log('Failed to get data')
        }

    }

    const coulmns = [
        {
            dataField: "FreeLancerName",
            text: "Freelancer name",
            sort: true,
            hidden: false,
            filter: textFilter(),

        },
        {
            dataField: "UserID",
            text: "User ID",
            sort: true,
            hidden: true,


        },
        {
            dataField: "FreeLancerID",
            text: "FreeLancer ID",
            sort: true,

            hidden: true

        },
        {
            dataField: "postID",
            text: "Post ID",
            filter: textFilter(),
            hidden: true

        },
        {
            dataField: "Title",
            text: "title",
            hidden: true,
            filter: textFilter(),

        },
        {
            dataField: "Price",
            text: "price",
            hidden: false,
            sort: true,

        },
        {
            dataField: "isOfferAccepted",
            text: "Offer accepted?",
            hidden: false,
            sort: true,

        },
        {
            dataField: "isOfferAvailable",
            text: "Offer available?",
            hidden: false,
            sort: true,

        },
        {
            dataField: "isOfferCanceled",
            text: "Offer canceled?",
            hidden: false,
            sort: true,
        },
        {
            dataField: "Date",
            text: "Date",
            hidden: false,
            sort: true,
        },
        {
            dataField: "Message",
            text: "Message",
            hidden: true
        },

    ]

    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
    }];

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,

        style: { backgroundColor: '#c8e6c9' },
        onSelect: (row, isSelect, rowIndex, e) => {


        }
    };

    useEffect(() => {

        getOffersData();

    }, [])


    return (

        <Popup
            trigger={
                postID ? (<Button variant="danger" >View offers</Button>) : (<></>)}
            modal
        >
            {close => (
                <div className="popup">
                    <BootstrapTaple
                        bootstrap4
                        keyField="FreeLancerID"
                        data={offers}
                        columns={coulmns}
                        selectRow={selectRow}
                        pagination={paginationFactory()}
                        defaultSorted={defaultSorted}
                        filter={filterFactory()}
                        condensed

                    />
                    <Button variant="danger" onClick={() => {
                        console.log(offers)
                        close();

                    }
                    }>Confirm</Button>
                </div>
            )}
        </Popup>

    );
}

