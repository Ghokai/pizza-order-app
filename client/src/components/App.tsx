import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./app.css";
import configureStore from "../store";
import Main from "./Main";

const store = configureStore();

const App: React.FC = (): React.ReactElement => {
  /*
  componentDidMount() {
    fetch("http://localhost:4200/orders")
      .then(res => res.json())
      .then(data => console.log(data));
  }
*/
  return (
    <div className="app">
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
