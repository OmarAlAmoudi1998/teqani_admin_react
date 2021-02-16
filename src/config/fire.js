import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDE2aVl7v-HPfW847-Pa3KzlYHiKau3zgI",
    authDomain: "teqani-next.firebaseapp.com",
    databaseURL: "https://teqani-next.firebaseio.com",
    projectId: "teqani-next",
    storageBucket: "teqani-next.appspot.com",
    messagingSenderId: "984742850918",
    appId: "1:984742850918:web:4a93fbe60923dedbf5d8a7",
    measurementId: "G-DRFJCX3MQM"
  };

  

  export const fire = firebase.initializeApp(firebaseConfig);
  export const db = fire.firestore();
  
  export default firebase 