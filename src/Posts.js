import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './Customers.css'
import './Home.css';
import './popup.css'
import 'reactjs-popup/dist/index.css';
import PopUpDeletePost from './PopUpDeletePost';
import PopUpDisplayPost from './PopUpDisplayPost'
import PopUpEditPost from './PopUpEditPost'
import PopUpViewPostOffers from './PopUpViewPostOffers'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
const Posts = () => {

  const [compposts, setCompPosts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [UserID, setUserID] = useState('')
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [DisplayName, setDisplayName] = useState('');
  const [Date, setDate] = useState('');
  const [Email, setEmail] = useState('');
  const [Catagory, setCatagory] = useState('');
  const [Location, setLocation] = useState('');
  const [Phone, setPhone] = useState('');
  const [Images, setImages] = useState('');
  const [pID, setPID] = useState('');
  const [City, setCity] = useState('');
  let [show, setShow] = useState(false)
  const [dbDirectory, setDBdirectory] = useState('')



  const handleShow = () => {

    setShow(!show)

  }



  const handleChangeDBdirectory = (event) => {
    setTitle("")
    setPID("")
    setDBdirectory(event.target.value);

  };

  async function getComputerpostsData() {


    try {



      await db.collection(dbDirectory).onSnapshot(snapshot => {
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
      // sort: true,
      filter: textFilter(),
      hidden: false,
    },
    {
      dataField: "Description",
      text: "Description",
      hidden: false,


    },
    {
      dataField: "DisplayName",
      text: "Display name",
      sort: true,
      hidden: true,

    },
    {
      dataField: "City",
      text: "City",
      filter: textFilter(),
      hidden: false,
    },
    {
      dataField: "Date",
      text: "Date",
      sort: true,
      hidden: false,
    },
    {
      dataField: "Email",
      text: "Email",
      hidden: true,
    },

    {
      dataField: "Catagory",
      text: "Catagory",
      hidden: true,
    },
    {
      dataField: "Location ",
      text: "Location",
      hidden: true,
    },
    {
      dataField: "Phone",
      text: "Phone",
      hidden: true,
    },
    {
      dataField: "UserID",
      text: "UserID",
      hidden: true,
    },
    {
      dataField: "Images",
      text: "Images",
      hidden: true,
    },
    {
      dataField: "postID",
      text: "Post ID",
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
      setPID(row.postID)
      console.log(row.Images)
      console.log(row.Location)
      setTitle(row.Title)
      setDescription(row.Description)
      setDisplayName(row.DisplayName)
      setDate(row.Date)
      setEmail(row.Email)
      setCatagory(row.Catagory)
      setLocation(row.Location)
      setPhone(row.Phone)
      setImages(row.Images)
      setCity(row.City)
      setShow(true)



      console.log(pID)
    }
  };

  useEffect(() => {

    getComputerpostsData();
  }, [dbDirectory])

  return (

    <div className="HomeDesign">


      <div className="dBar">
        <br></br>

        <h1 className="detailsHead">Posts</h1>

      </div>


      
      <div className="radioButtonPosts">
      
        <h4><strong>Select category</strong></h4>
        
        <FormControl component="fieldset">
          <RadioGroup row>
            <FormControlLabel
              value="posts/Computer/posts"
              control={<Radio color="primary" />}
              label="Computer"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Computer/posts'}
              onChange={handleChangeDBdirectory}
            />
            <FormControlLabel
              value="posts/Database/posts"
              control={<Radio color="primary" />}
              label="Database"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Database/posts'}
              onChange={handleChangeDBdirectory}
            />
            <FormControlLabel
              value="posts/Networking/posts"
              control={<Radio color="primary" />}
              label="Networking"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Networking/posts'}
              onChange={handleChangeDBdirectory}
            />
            <FormControlLabel
              value="posts/Phone/posts"
              control={<Radio color="primary" />}
              label="Phone"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Phone/posts'}
              onChange={handleChangeDBdirectory}
            />
            <FormControlLabel
              value="posts/Hardware/posts"
              control={<Radio color="primary" />}
              label="Hardware"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Hardware/posts'}
              onChange={handleChangeDBdirectory}
            />
            <FormControlLabel
              value="posts/Video Edit/posts"
              control={<Radio color="primary" />}
              label="Video Edit"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Video Edit/posts'}
              onChange={handleChangeDBdirectory}
            />
            <FormControlLabel
              value="posts/Photograph/posts"
              control={<Radio color="primary" />}
              label="Photograph"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Photograph/posts'}
              onChange={handleChangeDBdirectory}
            />
            <FormControlLabel
              value="posts/Software/posts"
              control={<Radio color="primary" />}
              label="Software"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Software/posts'}
              onChange={handleChangeDBdirectory}
            />
            <FormControlLabel
              value="posts/Sounds/posts"
              control={<Radio color="primary" />}
              label="Sounds"
              labelPlacement="top"
              checked={dbDirectory === 'posts/Sounds/posts'}
              onChange={handleChangeDBdirectory}
            />

          </RadioGroup>
        </FormControl>
      </div>
      <br></br>

      {dbDirectory ? (<div>

        {show ? (<div><PopUpDeletePost

          Title={Title}
          dbDirectory={dbDirectory}
          postID={pID}
          handleShow={handleShow}
          show={show}
        />

          <PopUpDisplayPost

            Title={Title}
            Description={Description}
            DisplayName={DisplayName}
            Date={Date}
            Email={Email}
            Catagory={Catagory}
            Location={Location}
            Phone={Phone}
            Images={Images}
            dbDirectory={dbDirectory}
            City={City}
            postID={pID}
            UserID={UserID}
          />
          <PopUpEditPost

            Title={Title}
            Description={Description}
            dbDirectory={dbDirectory}
            postID={pID}
            handleShow={handleShow}
            show={show}
          />

          <PopUpViewPostOffers

            postID={pID}
            // offers = {offers}
            handleShow={handleShow}
            show={show}
          />
        </div>
        ) : (<></>)}


        <br></br>
        <br></br>

        <div className="container" style={{ width: "fit-content", height: "fit-content" }}>
          <BootstrapTaple
            bootstrap4
            keyField="postID"
            data={compposts}
            columns={coulmns}
            selectRow={selectRow}

            pagination={paginationFactory()}
            defaultSorted={defaultSorted}
            filter={filterFactory()}
            condensed

          />




        </div>

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

export default Posts;