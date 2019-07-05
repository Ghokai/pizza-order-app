import * as React from "react";
import "./app.css";
interface Page {
  color: string;
}
class App extends React.Component<Page, {}> {
  componentDidMount() {
    fetch("http://localhost:4200/orders")
      .then(res => res.json())
      .then(data => console.log(data));
  }
  render() {
    return (
      <div className="app">
        <h1>Welcome to React with Typescript</h1>
        <p>The color of this page is: {this.props.color}</p>
      </div>
    );
  }
}

export default App;
