import '../components/app.less'
import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { HomePage, ComponentPage, ToolPage, QuestionPage  } from "./components.js";

export default class ROOT extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <HashRouter basename="/">
            <div>
              <Route path="/" component={QuestionPage} exact />
              <Route path="/component" component={ComponentPage} />
              <Route path="/tool" component={ToolPage} />
              {/* <Route path="/question" component={QuestionPage} /> */}
            </div>
          </HashRouter>
        </div>
      </Provider>
    );
  }
}
