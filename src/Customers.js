import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import fire from './config/fire';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { multiSelectFilter  } from 'react-bootstrap-table2-filter';

// import * as ReactBootStrap from 'react-bootstrap';
import './Home.css';
import firebase from 'firebase';

const Customers = () =>{
 
  const [customers, setCustomers] = useState([]);
  
  const [loading, setLoading] = useState([]);
  
  const getCustomersData = async () => {

    try{



        await db.collection('users/Customer/users').get().then(snapshot => {
            const custom = []
            snapshot.forEach(doc => {
                const data = doc.data()
                
                custom.push(data)
            })
            console.log(custom)

            setCustomers(custom)
        }).catch(error => console.log(error))

        
        
    } catch (e) {
      console.log('Failed to get data')
    }

  }
  const selectOptions = {
    0: 'Jeddah',
    1: 'Riyadh',
  };
  const coulmns = [
    {
      dataField : "firstName",
     text : "First name",
    },
    {
      dataField : "lastName",
       text : "Last name",
      },
    {
      dataField : "phoneNumber",
       text : "Phone number",
      },
    {
      dataField : "address",
       text : "Address",
      },
    {
      dataField : "city",
       text : "City",
       
      },
    {
      dataField : "userType",
       text : "User type",
      },
    
  ]

useEffect(()=>{

  getCustomersData();

},[])
  
  return( <div className="HomeDesign">{console.log(customers)}
      <div>
      <BootstrapTaple
      keyField="firstName"
      data={customers}
      columns={coulmns}
      pagination={paginationFactory()
      
      }
      
      
      />
</div>

  </div>
)
}

export default Customers;