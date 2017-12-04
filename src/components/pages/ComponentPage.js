import {
  Route,
  NavLink,
} from 'react-router-dom';
import lowerFirst from 'lodash/lowerFirst';
import '../app.less';
import React,{ Component } from 'react';
import PlayGround from '../partials/PlayGround';
import pages from '../../../static/index';
import Layout from '../layouts/Layout';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export default class App extends Component {

  rootSubmenuKeys = ['sub1'];
  
  state = {
    openKeys: ['sub1'],
  }

  componentWillMount() {
    const {location} = this.props;
    this.setState({
      openKeys: [location.pathname.slice(11,15)],
    });
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }


  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.page) {
        return (
          <SubMenu key={item.key} title={<span>{item.title}</span>}>
            {item.page.map((d) => {
              return (
                <Menu.Item key={d.name}>
                  <NavLink to={`/component/${d.parent}/${lowerFirst(d.name)}`}><span className="nav-text">{d.title}</span></NavLink>
                </Menu.Item>
              )
            })}
          </SubMenu>
        );
      }
      return <SubMenu {...item} />;
    });
  }

  render (){
    const {...props} = this.props;
    return (
      <Layout {...props}>
        <div className={"page-wrapper"}>
          <div className={"content-sidebar"}>
            <div className={"aside"}>
                <Menu
                  mode="inline"
                  openKeys={this.state.openKeys}
                  onOpenChange={this.onOpenChange}
                  style={{ width: 240 }}
                >
                  {this.renderTreeNodes(pages.data.component)}
                </Menu>
              </div>
              <Route
                path="/component/:parent/:name"
                component={(props) => {
                  const { match } = props;
                  return (
                    <div className={"demo"}>
                      {<PlayGround componentName={match.params.name} />}
                    </div>
                  );
                }}
              />
          </div>
        </div>
      </Layout>
    )
  }
};
