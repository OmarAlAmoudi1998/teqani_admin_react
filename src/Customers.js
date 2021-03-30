import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './Customers.css'
import './Home.css';
import 'reactjs-popup/dist/index.css';
import PopUpDisplayUser from './PopUpDisplayUser';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [uid, setUid] = useState('')
  const [userType, setUserType] = useState('')
  const [addressMap, setAddressMap] = useState('')
  const dbDirectory = "users/Customer/users"

  async function getCustomersData() {


    try {



      await db.collection(dbDirectory).onSnapshot(snapshot => {
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
      console.log(addressMap)
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

      
      <PopUpDisplayUser

        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        email={email}
        addressMap={addressMap}
        userType={userType}
        uid={uid}
      />
      <div className="container">
        <BootstrapTaple
          bootstrap4
          keyField="phoneNumber"
          data={customers}
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

export default Customers;
