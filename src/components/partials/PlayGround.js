import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { transform } from "babel-standalone";
import classnames from "classnames";
import Frame from "./Frame";
import CodeMirror from "./Codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/xml/xml";
import PropTypes from "prop-types";
import { Icon } from "antd";
import defaultRepl from "!html-loader!../repl/temple/index.html";
import styles from "./PlayGround.less";

export default class PlayGround extends Component {
  static defaultProps = {
    componentName: null
  };
  static propTypes = {
    componentName: PropTypes.string
  };

  state = {
    wrapclass: "open",
    frameTemlp: "", //frame
    repl: "", //codemirror
    errorMsg: null
  };

  componentDidMount() {
    this.loadRepl();
  }

  async loadRepl() {
    const { componentName } = this.props;
    try {
      const repl = await import(`!html-loader!../repl/${componentName}/index.html`);
      this.setState({
        repl
      });
      this.executeCode(repl);
    } catch (e) {
      this.setState({
        repl: defaultRepl
      });
      this.executeCode(defaultRepl);
    }
  }

  codeRun = () => {
    ReactDOM.unmountComponentAtNode(this.getMountTarget());
    this.executeCode(this.state.repl);
  };

  getMountTarget() {
    const doc = this.getDoc();
    console.log(doc.body);
    return doc.body.children[0];
  }

  getDoc() {
    return ReactDOM.findDOMNode(this.frame).contentDocument; // eslint-disable-line
  }

  executeCode(repl) {

    this.setState({
      frameTemlp: this.frameNode(repl)
    });

    // try {
    //   if (this.state.errorMsg) {
    //     this.setState({
    //       errorMsg: null,
    //     });
    //   }else{
    //     this.setState({
    //       frameTemlp: this.frameNode(repl),
    //     })
    //   }
    // } catch (err) {
    //   this.setState({
    //     errorMsg: err.toString(),
    //   });

    //   console.log(this.state.errorMsg);

    // }
  }

  frameNode = repl => {
    repl = repl.replace("您的密钥", "P5ZWCQajSPmOsuuFFqtV2vs2C9Cosy2w");
    return (
      <Frame
        ref={node => (this.frame = node)}
        initialContent={repl}
        mountTarget={this.refs.mount}
      />
    );
  };

  handleClickTrgger = () => {
    const classname = this.state.wrapclass;

    this.setState({
      wrapclass: classname == "close" ? "open" : "close"
    });
  };

  render() {
    const { repl, frameTemlp } = this.state;
    const codeMirrorProps = {
      value: repl,
      onChange: newCode => {
        this.setState({
          repl: newCode
        });
      },
      options: {
        lineWrapping: true, //是否显示scroll
        lineNumbers: false, //是否显示number
        styleActiveLine: true,
        matchBrackets: true,
        mode: "htmlmixed",
        viewportMargin: Infinity
      },
      autoFocus: true
    };

    const codeClass = `demo-body demo-body-${this.state.wrapclass}`;
    const iconType = this.state.wrapclass == "open" ? "left" : "right";
    return (
      <div className={codeClass}>
        <div className={"code-wrap"}>
          <div className={"code-open"} onClick={this.handleClickTrgger}>
            <Icon type={iconType} style={{ fontSize: 14, color: "#08c" }} />
          </div>
          <div className={"code-area"}>
            <div className={"code-bar"}>
              <a>文档</a>
              <a>刷新</a>
              <a onClick={this.codeRun}>运行</a>
            </div>
            <div className={"code-con"}>
              <CodeMirror {...codeMirrorProps} />
            </div>
          </div>
        </div>
        <div className={"code-map"} ref={node => (this.mount = node)}>
          {frameTemlp}
        </div>
      </div>
    );
  }
}
