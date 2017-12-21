import React, { Component } from "react";
import LayoutHome from "../layouts/LayoutHome";
import "./HomePage.less";

class Home extends Component {
  getStarBox = () => {
    var cols = ["#41ff06", "#3ef5ff", "#f4d03f", "#ff0000", "#fff", "#00ffc3"];
    var stars = 50;
    var items = [];

    for (var i = 0; i <= stars; i++) {
      var size = Math.random() * 5;
      var color = cols[parseInt(Math.random() * 4)];
      items.push(
        <span
          style={{
            width: size + "px",
            height: size + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            background: color
          }}
        />
      );
    }
    return { items };
  };

  render() {
    const opt = this.getStarBox();
    return (
      <LayoutHome {...this.props}>
        <div className="starsBox" ref="starsBox">
          {opt.items}
        </div>
        <div className="home-c1">
          <div className="home-contnet_1">
            <div className="home-contnet_1_left">123456789</div>
            <div className="earth">
              <div className="sand snd-1">
                <div className="cam cam-1" />
                <div className="cam cam-2" />
                <div className="cam cam-3" />
                <div className="cam cam-4" />
                <div className="cam cam-5" />
                <div className="cam cam-6" />
              </div>
            </div>
          </div>
        </div>
      </LayoutHome>
    );
  }
}

export default Home;
