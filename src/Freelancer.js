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
import PopUpDisplayUser from './PopUpDisplayUser';
import PopUpFreelancerChoice from './PopUpFreelancerChoice'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
const Freelancer = () => {

  const [freelancers, setFreelancers] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [uid, setUid] = useState('')
  const [Categories, setCategories] = useState('')
  const [avgRating, setAvgRating] = useState('')
  const [userType, setUserType] = useState('')
  const [addressMap, setAddressMap] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [AccountDetails, setAccountDetails] = useState('')
  const [ValidationUnderProgress, setValidationUnderProgress] = useState('')
  let [show, setShow] = useState(false)
  const handleShow = () => {

    setShow(!show)

  }
  const dbDirectory = "users/Freelancer/users"


  async function getFreelancersData() {


    try {



      await db.collection(dbDirectory).onSnapshot(snapshot => {
        const temp = []
        snapshot.forEach(doc => {
          const data = doc.data()
          temp.push(data)
        })

        setFreelancers(temp)
      })



    } catch (e) {
      console.log('Failed to get data')
    }

  }

  function getHowManyFreelancerInCity(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

  const coulmns = [
    {
      dataField: "firstName",
      text: "First name",
      sort: true,
      hidden: false,
      filter: textFilter(),

    },
    {
      dataField: "lastName",
      text: "Last name",
      sort: true,
      filter: textFilter(),
      hidden: false

    },
    {
      dataField: "phoneNumber",
      text: "Phone number",
      filter: textFilter(),
      hidden: false

    },
    {
      dataField: "addressMap.city",
      text: "City",
      hidden: false,
      filter: textFilter(),

    },
    {
      dataField: "addressMap.district",
      text: "District",
      hidden: true


    },
    {
      dataField: "addressMap.street",
      text: "Street",
      hidden: true

    },
    {
      dataField: "email",
      text: "Email",
      hidden: false,
      filter: textFilter(),

    },
    {
      dataField: "avgRating",
      text: "Average rating",
      sort: true,
      hidden: false,


    },
    {
      dataField: "userType",
      text: "User type",
      hidden: true
    },
    {
      dataField: "uid",
      text: "User ID",
      hidden: true
    },
    {
      dataField: "addressMap",
      text: "Address Map",
      hidden: true
    },
    {
      dataField: "Categories",
      text: "Categories",
      hidden: true
    },
    {
      dataField: "profilePicture",
      text: "ProfilePicture",
      hidden: true
    },
    {
      dataField: "AccountDetails",
      text: "Account details",
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

      setFirstName(row.firstName)
      setLastName(row.lastName)
      setEmail(row.email)
      setPhoneNumber(row.phoneNumber)
      setUid(row.uid)
      setAddressMap(row.addressMap)
      setUserType(row.userType)
      setCategories(row.Categories)
      setAvgRating(row.avgRating)
      setProfilePicture(row.profilePicture)
      setAccountDetails(row.AccountDetails)
      setValidationUnderProgress(row.AccountDetails.ValidationUnderProgress)
      setShow(true)
      console.log(ValidationUnderProgress)
    }
  };

  useEffect(() => {

    getFreelancersData();

  }, [])

  return (

    <div className="HomeDesign">


      <div className="dBar">
        <br></br>

        <h1 className="detailsHead">Freelancers details</h1>

      </div>

      <br></br>

      {/* <PopUpDelete

        data={data}

      /> */}
      <PopUpDisplayUser

        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        email={email}
        addressMap={addressMap}
        userType={userType}
        uid={uid}
        Categories={Categories}
        avgRating={avgRating}
        profilePicture={profilePicture}
        show={show}
        handleShow={handleShow}
      />

      {show ? (<div>

        {ValidationUnderProgress ? (<PopUpFreelancerChoice

          AccountDetails={AccountDetails}
          dbDirectory={dbDirectory}
          ValidationUnderProgress={ValidationUnderProgress}
          uid={uid}
          show={show}
          handleShow={handleShow}
        />) : (<></>)

        }

      </div>) : (<></>)}

      <div className="container">
        <BootstrapTaple
          bootstrap4
          keyField="phoneNumber"
          data={freelancers}
          columns={coulmns}
          selectRow={selectRow}
          pagination={paginationFactory()}
          defaultSorted={defaultSorted}
          filter={filterFactory()}
          condensed

        />




      </div>


    </div>
  )
}

export default Freelancer;