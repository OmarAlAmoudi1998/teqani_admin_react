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
import PopUpPostComp from './PopUpPostComp';
import PopUpDisplayComp from './PopUpDisplayComp'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
const Computers = () => {

  const [compposts, setCompPosts] = useState([]);
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [DisplayName, setDisplayName] = useState('');
  const [Date, setDate] = useState('');
  const [Email, setEmail] = useState('');
  const [Catagory, setCatagory] = useState('');
  const [Location, setLocation] = useState('');
  const [Phone, setPhone] = useState('');
  const [Images, setImages] = useState('');
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
        console.log(temp)
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
      sort: true,
      hidden : false,
    },
    {
      dataField: "Description",
      text: "Description",
      hidden : false,

    },
    {
      dataField: "DisplayName",
      text: "Display name",
      sort: true,
      hidden : false,

    },
    {
      dataField: "Date",
      text: "Date",
      sort: true,
      hidden : false,
    },
    {
      dataField: "Email",
      text: "Email",
      hidden : true,
    },

    {
      dataField: "Catagory",
      text: "Catagory",
      hidden : true,
    },
    {
      dataField: "Location ",
      text: "Location",
      hidden : true,
    },
    {
      dataField: "Phone",
      text: "Phone",
      hidden : true,
    },
    {
      dataField: "UserID",
      text: "UserID",
      hidden : true,
    },
    {
      dataField: "Images",
      text: "Images",
      hidden : true,
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
      console.log(row.Images)
      console.log(row.Location)
      setTitle(row.Title)
      setDescription(row.Description)
      setDisplayName(row.DisplayName)
      setDate(row.Date)
      setEmail(row.Email)
      setCatagory(row.Catagory)
      setLocation(row.Location )
      setPhone(row.Phone)
      setImages(row.Images)
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

      <PopUpPostComp

        Title={Title}

      />
      <PopUpDisplayComp
      
      Title={Title}
      Description={Description}
      DisplayName={DisplayName}
      Date={Date}
      Email={Email}
      Catagory={Catagory}
      Location={Location}
      Phone={Phone}
      Images={Images}

      />
<br></br>
<br></br>

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

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
    </div>
  )
}

export default Computers;