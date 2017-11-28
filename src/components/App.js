import React, { Component } from "react";
import { Link, NavLink } from "react-router";
import { Menu } from "antd";
import "./app.less";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: ""
    };
  }

  render() {
    let childs = React.Children.toArray(this.props.children);
    const { match, children } = this.props;

    return (
      <div className="app">
        <header className="homepage-header">
          <div className="header-core">
            <Link to="/counter" className={"logo"}>
              地图工具
            </Link>
          </div>
        </header>
        {childs}
      </div>
    );
  }
}
