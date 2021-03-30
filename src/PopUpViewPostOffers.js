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
    
    const postID = props.postID;
    
    const dbDirectory = "offers"
    
    
    let offers = []
    let offerID = ""
    
    let show = props.show
    let handleShow = props.handleShow
    
   

        try {
             db.collection("offers").where("postID", '==', ""+postID).onSnapshot(snapshot => {
                const temp = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    temp.push(data)
                })
                offers = temp
                
                
            })
    
        } catch (e) {
            console.log('Failed to get data')
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



  


    return (

        <Popup
        closeOnDocumentClick={false}
            trigger={
                postID ? (<Button className="butt mr-3"  variant="info" >View offers</Button>) : (<></>)}
            modal
        >
            {close => (

                <div>
                    
                    
                <div className="popup">
                    <BootstrapTaple
                        bootstrap4
                        keyField="offerID"
                        data={offers}
                        columns={coulmns}
                        pagination={paginationFactory()}
                        defaultSorted={defaultSorted}
                        filter={filterFactory()}
                        condensed

                    />
                    <Button className="popupFreelancer"variant="info" onClick={() => {
                        
                        handleShow()
                        close();

                    }
                    }>Close</Button>
                </div>
                </div>
            )}
        </Popup>

    );
}

