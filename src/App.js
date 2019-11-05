import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Usurvey from './Usurvey';

class App extends Component {
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to USurvey App.
        </p>
      </header>

      <div className='surveyapp'>
        <Usurvey />
      </div>
      <footer className='foot'>
        &copy; All Rights Reserved 2019 Furqaan Siddiqui
      </footer>
    </div>
  );
}
}

export default App;
