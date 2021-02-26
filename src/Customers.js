import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import fire from './config/fire';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import './Customers.css'
import './Home.css';
import { Button } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import firebase from 'firebase';
import PopUpDelete from './PopUpDelete';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [data, setData] = useState('')
  const [loading, setLoading] = useState([]);

  // let getCustomersData = async () => {
  async function getCustomersData() {
    
  
    try {



      await db.collection('users/Customer/users').onSnapshot(snapshot => {
        const custom = []
        snapshot.forEach(doc => {
          const data = doc.data()
          custom.push(data)
        })

        setCustomers(custom)
      })



    } catch (e) {
      console.log('Failed to get data')
    }

  }

  const coulmns = [
    {
      dataField: "firstName",
      text: "First name",
      sort: true
      
    },
    {
      dataField: "lastName",
      text: "Last name",
      sort: true

    },
    {
      dataField: "phoneNumber",
      text: "Phone number",
      
    },
    {
      dataField: "address",
      text: "Address",
      
    },
    {
      dataField: "city",
      text: "City",
      sort: true


    },
    {
      dataField: "userType",
      text: "User type",
      
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
      console.log(isSelect)
      setData(row.phoneNumber)
      
    }
  };

  useEffect(() => {

    getCustomersData();

  }, [])

  return (

    <div className="HomeDesign">


      <div className="dBar">
        <br></br>

        <h1 className="detailsHead">Customers details</h1>

      </div>

      <br></br>

      <PopUpDelete

        data={data}

      />

      <div className="container">
        <BootstrapTaple
          bootstrap4
          keyField="phoneNumber"
          data={customers}
          columns={coulmns}
          selectRow={selectRow}
          pagination={paginationFactory()}
          defaultSorted={ defaultSorted }
          condensed
          
        />




      </div>


    </div>
  )
}

export default Customers;