import React, {Component} from 'react';
import './App.css';
import Template from "./components/Template";


class App extends Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }


  render (){

    return (
        <div className="App">
            <Template/>
        </div>
    )
  }
}

export default App;
