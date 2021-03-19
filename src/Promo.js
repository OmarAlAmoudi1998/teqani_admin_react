import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import fire from './config/fire';
import { db } from "./config/fire";
import BootstrapTaple from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import PopUpAddPromo from "./PopUpAddPromo"
import PopUpPromoDelete from "./PopUpPromoDelete"
import PopUpEditPromo from "./PopUpEditPromo"

import './popup.css'
const Promo = () => {

    const dbDirectory = "promos"
    const [promo, setPromo] = useState('');
    const [discount, setDiscount] = useState('');
    const [validDate, setValidDate] = useState('');
    const [promos, setPromos] = useState([]);

    async function getPromoData() {
    
  
        try {
    
    
    
          await db.collection(dbDirectory).onSnapshot(snapshot => {
            const temp = []
            snapshot.forEach(doc => {
              const data = doc.data()
              temp.push(data)
            })
            setPromos(temp)
            console.log(promos)
          })
        } catch (e) {
          console.log('Failed to get data')
        }
    
      }

      const coulmns = [
        {
          dataField: "discount",
          text: "Discount percentage",
          
          
        },
        {
          dataField: "promo",
          text: "Promo code",
          

    
        },
        {
          dataField: "validDate",
          text: "Valid until",
          
        },
        
      ]
    
      const defaultSorted = [{
        dataField: 'discount',
        order: 'desc'
      }];
    
      const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        
        style: { backgroundColor: '#c8e6c9' },
        onSelect: (row, isSelect, rowIndex, e) => {
          setPromo(row.promo)
          setDiscount(row.discount)
          setValidDate(row.validDate)
          console.log(isSelect)
          
          
        }
      };
    
      useEffect(() => {
    
        getPromoData();
    
      }, [])
    

      return (

        <div className="HomeDesign">
    
    
          <div className="dBar">
            <br></br>
    
            <h1 className="detailsHead">Promos management</h1>
    
          </div>
    
          <br></br>
    
          
    <br></br>
    <br></br>
    
          <div className="container" style={{width: "fit-content" ,height:"fit-content"}}>
        <PopUpAddPromo
        dbDirectory={dbDirectory}
        />
        
        <PopUpPromoDelete
        dbDirectory={dbDirectory}
        promo={promo}
        />
        <PopUpEditPromo
        dbDirectory={dbDirectory}
        promo = {promo}
        validDate = {validDate}
        discount = {discount}
        />
            <BootstrapTaple
              bootstrap4
              keyField="promo"
              data={promos}
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

export default Promo;