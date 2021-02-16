import './App.css';
import fire from "./config/fire";
import {db} from "./config/fire";
import React,{Component} from 'react';

class Home extends Component{


  state = {

    composts:null


  }

  componentDidMount(){

    console.log('mounted')
    db.collection('posts/Computer/posts').get().then( snapshot=>{

      const composts = []
      snapshot.forEach( doc => {
        const data = doc.data()
        composts.push(data)
      })
      this.setState({composts: composts})

    }).catch(error => console.log(error))
    
  }

  render(){
    return(

      <div>

        <h1>test</h1>

        {

this.state.composts && this.state.composts.map(compost => {

  return(

    <div>

    <p>{compost.Date}</p>

    </div>

  )
})

        }

      </div>

    )

  }

}

export default Home ;