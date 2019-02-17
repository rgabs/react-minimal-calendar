import React, { Component } from "react";
import Calendar from "./components/Calendar";
import "./App.css";

class App extends Component {
  state = {
      selectedDate: null
  };
  render() {
      return (
          <div className="app">
              <Calendar
                  onChange={momentInstance =>
                      this.setState({
                          selectedDate:
                momentInstance && momentInstance.format("DD-MM-YYYY")
                      })
                  }
              />
              <b>
                  <br />
                  <br />
          Selected date: {this.state.selectedDate ? this.state.selectedDate : 'Not selected'}
              </b>
          </div>
      );
  }
}

export default App;
