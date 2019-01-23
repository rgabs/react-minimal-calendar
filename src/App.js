import React, { Component } from "react";
import Calendar from "./components/Calendar";

class App extends Component {
  state = {
    selectedDate: null
  };
  render() {
    return (
      <div className="App">
        <Calendar
          onChange={momentInstance =>
            this.setState({
              selectedDate:
                momentInstance && momentInstance.format("DD-MM-YYYY")
            })
          }
        />
        <br />
        <br />
        {this.state.selectedDate}
      </div>
    );
  }
}

export default App;
