import React, {Component} from 'react';

import './App.css';
import Signin from "./User/Signin";

class App extends Component{
  render() {
    return (
        /*<div className="App">
          <header className="App-header">
              <Signin/>
          </header>
        </div>*/
        <Signin/>
    );
  }
}

export default App;
