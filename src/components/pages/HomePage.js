import React, { Component } from 'react';
import LayoutHome from '../layouts/LayoutHome';
import './HomePage.less';

class Home extends Component {
  render() {
    return (
      <LayoutHome {...this.props}>
        <div className="earth">
          <div className="sand snd-1">
            {/* <div className="cam cam-1"></div>
            <div className="cam cam-2"></div>
            <div className="cam cam-3"></div>
            <div className="cam cam-4"></div>
            <div className="cam cam-5"></div> */}
            <div className="cam cam-6"></div>
          </div>
        </div>
      </LayoutHome>
    );
  }
};

export default Home;
