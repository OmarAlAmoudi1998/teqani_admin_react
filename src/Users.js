import './App.css';
import fire from "./config/fire";
import { db } from "./config/fire";
import React, { Component } from 'react';
import './UserCol.css'

class Users extends Component {


    constructor() {
        super();
        this.state = {
            customers: null,
        }
    }

    componentDidMount() {


        db.collection('users/Customer/users').get().then(snapshot => {
            const customers = []
            snapshot.forEach(doc => {
                const data = doc.data()
                customers.push(data)
            })
            this.setState({ customers: customers })

        }).catch(error => console.log(error))

    }

    render() {

        return (

            <div className='pageDesign'>
                <div class="limiter">
                <div class="container-table100">
                <div class="wrap-table100">
                <div class="table100">
                <table>
                <thead>
                <tr class="table100-head">
                                                        <th class="column1">First name</th>
                                                        <th class="column2">Last name</th>
                                                        <th class="column3">Phone number</th>
                                                        <th class="column4">Address</th>
                                                        <th class="column5">User type</th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                    {

                        this.state.customers && this.state.customers.map(customer => {
                            return (
             
                                                

                                                
                                                    <tr>
                                                        <td class="column1">{customer.firstName}</td>
                                                        <td class="column2">{customer.lastName}</td>
                                                        <td class="column3">{customer.phoneNumber}</td>
                                                        <td class="column4">{customer.address}</td>
                                                        <td class="column5">{customer.userType}</td>
                                                        
                                                    </tr>
                                                
                                            
                                        
                                    
                                



                            )//Finish of map return



                        }//finish of if condition + mapping



                        )//finish of if condition + mapping

                    }
                    </tbody>
                    </table>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Users;