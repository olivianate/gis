import React, { PureComponent, Children, cloneElement } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import "./LayoutHome.less";

export default class LayoutHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: ""
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const reg = location.pathname.split(/\//)[1];
    this.setState({
      current: "/" + reg || location.pathname
    });
  }

  render() {
    const { match, children } = this.props;
    const selectedKeys = [this.state.current];

    return (
      <div className={"app"}>
        <header className="page-header">
          <div className="header-core">
            <h2>关于地图的一些解决方案</h2>
            <NavLink to="/" exact>
              首页
            </NavLink>
            <NavLink to="/component/sub1/scaleControl">解决方案</NavLink>
            <NavLink to="/console">地图工具</NavLink>
            <NavLink to="/question">常见问题</NavLink>
          </div>
        </header>
        {Children.map(children, Comp => cloneElement(Comp))}
      </div>
    );
  }
}
