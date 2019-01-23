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
        <p>
          <br />
          <br />
          {this.state.selectedDate && this.state.selectedDate}
        </p>
      </div>
    );
  }
}

export default App;
