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
import PopUpPostDelete from './PopUpPostDelete';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
const Computers = () => {

  const [compposts, setCompPosts] = useState([]);
  const [data, setData] = useState('')
  const [loading, setLoading] = useState([]);

  // let getCustomersData = async () => {
  async function getComputerpostsData() {
    
  
    try {



      await db.collection('posts/Computer/posts').onSnapshot(snapshot => {
        const temp = []
        snapshot.forEach(doc => {
          const data = doc.data()
          temp.push(data)
        })

        setCompPosts(temp)
      })



    } catch (e) {
      console.log('Failed to get data')
    }

  }

  const coulmns = [
    {
      dataField: "Title",
      text: "Title",
      sort: true
      
    },
    {
      dataField: "Description",
      text: "Description",
      

    },
    {
      dataField: "DisplayName",
      text: "Display name",
      sort: true

    },
    {
      dataField: "Date",
      text: "Date",
      sort: true
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
      setData(row.Title)
      
    }
  };

  useEffect(() => {

    getComputerpostsData();

  }, [])

  return (

    <div className="HomeDesign">


      <div className="dBar">
        <br></br>

        <h1 className="detailsHead">Computer posts</h1>

      </div>

      <br></br>

      <PopUpPostDelete

        data={data}

      />

      <div className="container">
        <BootstrapTaple
          bootstrap4
          keyField="Title"
          data={compposts}
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

export default Computers;