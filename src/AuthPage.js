import React from 'react';
import { useEffect, useState } from 'react';

import fire from './config/fire';

export const AuthPage = () => {

    const [currentUser, setCurrentUser ] = useState()

    useEffect(()=> {

      fire.auth().onAuthStateChanged((user)=>{

        setCurrentUser(user)


      },[])

    })




  }

  