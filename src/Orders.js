import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './Customers.css'
import './Home.css';
import 'reactjs-popup/dist/index.css';
import PopUpDisplayOrder from "./PopUpDispalyOrder"
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [OrderNumber,setOrderNumber] = useState('')
  const [Title, setTitle] = useState('');
  const [Price, setPrice] = useState('');
  const [Payed, setPayed] = useState('');
  const [CustomerID, setCustomerID] = useState('');
  const [FreelancerID, setFreelancerID] = useState('');
  const [isOrderClosed, setIsOrderClosed] = useState('');
  const [isPayed, setIsPayed] = useState('');
  const [isRatingDone, setIsRatingDone] = useState('');
  const [orderID, setOrderID] = useState('');
  const [promo, setPromo] = useState('');
 

  const dbDirectory = "orders"


  async function getOrdersData() {


    try {



      await db.collection(dbDirectory).onSnapshot(snapshot => {
        const temp = []
        snapshot.forEach(doc => {
          const data = doc.data()
          temp.push(data)
        })
        
        setOrders(temp)
      })



    } catch (e) {
      console.log('Failed to get data')
    }

  }

 

  const coulmns = [
    {
        dataField: "OrderNumber",
        text: "Order number",
        filter: textFilter(),
        hidden: false,
      },
    {
      dataField: "Title",
      text: "Title",
      filter: textFilter(),
      hidden: false,
    },
    {
      dataField: "Price",
      text: "Total price",
      hidden: false,


    },
    {
      dataField: "Payed",
      text: "Total payed amount",
      sort: true,
      hidden: false,
      
    },
    
    {
      dataField: "CustomerID",
      text: "Customer ID",
      sort: true,
      hidden: true,
    },
    {
      dataField: "FreelancerID",
      text: "Freelancer ID",
      hidden: true,
    },

    {
      dataField: "isOrderClosed",
      text: "Is order closed?",
      hidden: true,
    },
    {
      dataField: "isPayed",
      text: "Is total price payed?",
      hidden: true,
    },
    {
      dataField: "isRatingDone",
      text: "Does customer rated freelancer?",
      hidden: true,
    },
    {
      dataField: "orderID",
      text: "Order ID",
      hidden: true,
    },
    {
      dataField: "promo",
      text: "Promo code",
      hidden: true,
    },
    {
        dataField: "promo",
        text: "Promo code",
        hidden: true,
      },
  ]

  const defaultSorted = [{
    dataField: 'Date',
    order: 'desc'
  }];

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    style: { backgroundColor: '#c8e6c9' },
    onSelect: (row, isSelect, rowIndex, e) => {
      
        setOrderNumber(row.OrderNumber)
        setTitle(row.Title)
        setCustomerID(row.CustomerID)
        setFreelancerID(row.FreelancerID)
        setPrice(row.Price)
        setPayed(row.Payed)
        setIsOrderClosed(row.isOrderClosed)
        setIsPayed(row.isPayed)
        setIsRatingDone(row.isRatingDone)
        setOrderID(row.orderID)
        setPromo(row.promo)

    }
  };

  useEffect(() => {

    getOrdersData()

  }, [])

  return (

    <div className="HomeDesign">


      <div className="dBar">
        <br></br>

        <h1 className="detailsHead">Orders details</h1>

      </div>

  
      <PopUpDisplayOrder
      
       OrderNumber = {OrderNumber}
     Title = {Title}
     Price = {Price}
     Payed ={Payed}
     CustomerID = {CustomerID}
     FreelancerID = {FreelancerID}
     isOrderClosed = {isOrderClosed}
     isPayed = {isPayed}
     isRatingDone = {isRatingDone}
     orderID = {orderID}
     promo = {promo}
      
      />

      
      <br></br>
      <br></br>

      <div className="container" style={{ width: "fit-content", height: "fit-content" }}>
        <BootstrapTaple
          bootstrap4
          keyField="OrderNumber"
          data={orders}
          columns={coulmns}
          selectRow={selectRow}

          pagination={paginationFactory()}
          defaultSorted={defaultSorted}
          filter={filterFactory()}
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

export default Orders;