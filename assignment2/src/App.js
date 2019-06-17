import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent.js';
import CharComponent from './CharComponent/CharComponent.js';
import Radium from 'radium';

class App extends Component {

  state = { text: '', };

  changeHandler = (event) => {
    this.setState({
      text: event.target.value,
    });
  }

  removeHandler = (index) => {
    const text = [...this.state.text];
    text.splice(index, 1)
    this.setState({
      text: text,
    })

  }


  render() {
    let charList = null;

    if (this.state.text.length > 0) {
      const text = [...this.state.text];
      charList = (
        <div>
          {text.map((char, index) => {
            return (
              <CharComponent
                charactor={char}
                key={index}
                click={() => { this.removeHandler(index) }} />
            )
          })}
        </div>
      )
    }
    

    return (
      <div className="App">

        <input type='text' onChange={this.changeHandler} value={[...this.state.text].join('')}></input>
        <p>{this.state.text.length}</p>
        <ValidationComponent textLength={this.state.text.length}/>
        {charList}
      </div>
    );
  }
}

export default Radium(App);
