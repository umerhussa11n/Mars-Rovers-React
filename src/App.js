import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import RoversController from './RoversController.js'

class App extends Component {
  constructor(props){
    super(props);
    };

    render() {
      return (
        <div className="roversApplication">
            <Header />
            <RoversController />
        </div>
  );
}
}

export default App;
