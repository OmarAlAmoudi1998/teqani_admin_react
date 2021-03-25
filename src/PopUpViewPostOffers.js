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
import PopUpOfferDelete from "./PopUpOfferDelete"
export default function PopUpViewPostOffers(props) {
    
    const [postID,setPostID] = useState(props.postID);
    
    const dbDirectory = "offers"
    
    const offers = props.offers
    const [offerID, setOfferID] = useState("")
    const [Updated,setUpdated] = useState(false)
    let [show,setShow] = useState(props.show)
    const handleShow = props.handleShow
    
    
    // function checkPostIDchanging() {
        
    //     if (postID == props.postID){
    //         handleShow()
    //         setPostID("")
    //     } else {

    //         setPostID(props.postID)

    //     }

    // }

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
            dataField: "offerID",
            text: "Offer ID",
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
            setOfferID(row.offerID)
            setShow(true)
            console.log(row.offerID)
            console.log(offerID)
        }
    };

    

    // useEffect(() => {
    //     getOffersData();

    // }, [])


    return (

        <Popup
        closeOnDocumentClick={false}
            trigger={
                postID ? (<Button className="butt mr-3"  variant="info" >View offers</Button>) : (<></>)}
            modal
        >
            {close => (

                <div>
                    
                    {show ? (<PopUpOfferDelete
                    offerID = {offerID}
                    dbDirectory = {dbDirectory}
                    show={show}
                    handleShow={handleShow}
                    />) : (<></>)}
                <div className="popup">
                    <BootstrapTaple
                        bootstrap4
                        keyField="offerID"
                        data={offers}
                        columns={coulmns}
                        selectRow={selectRow}
                        pagination={paginationFactory()}
                        defaultSorted={defaultSorted}
                        filter={filterFactory()}
                        condensed

                    />
                    <Button className="ml-3"variant="danger" onClick={() => {
                        console.log(offers)
                        handleShow()
                        close();

                    }
                    }>Confirm</Button>
                </div>
                </div>
            )}
        </Popup>

    );
}

