import React, { PureComponent, Children, cloneElement } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import { Menu } from 'antd';
import './Layout.less';

export default class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: ''
    }
  }

  componentDidMount(){
    const {location} = this.props;
    const reg = location.pathname.split(/\//)[1];
    console.log(reg);

    this.setState({
      current: '/'+ reg || location.pathname
    });
  }

  render() {
    const { match, children } = this.props;
    const selectedKeys = [this.state.current];

    return (
      <div className={'app'}>
        <header className="page-header">
          <div className="header-core">
            <Link to="/" className={'logo'}>解决方案</Link>
            <Menu
            mode="horizontal"
            onClick={this.handleClick}
            selectedKeys={selectedKeys}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="/"><NavLink to="/" exact>首页</NavLink></Menu.Item>
            <Menu.Item key="/component"><NavLink to="/component/sub1/scaleControl">解决方案</NavLink></Menu.Item>
            {/* <Menu.Item key="/transportation"><NavLink to="/transportation">物流案例</NavLink></Menu.Item> */}
            <Menu.Item key="/console"><NavLink to="/console">地图工具</NavLink></Menu.Item>
            <Menu.Item key="/question"><NavLink to="/question">常见问题</NavLink></Menu.Item>
          </Menu> 
          </div> 
        </header>
        {
          Children.map(children, Comp => cloneElement(Comp))
        }
      </div>
    );
  }
}
