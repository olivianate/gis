import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { message } from "antd";
import { transform } from "babel-standalone";
import classnames from "classnames";
import Frame from "./Frame";
import CodeMirror from "./Codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/xml/xml";
import PropTypes, { func } from "prop-types";
import { Icon } from "antd";
import copy from "copy-to-clipboard";
import defaultRepl from "!html-loader!../../../jsdemo/temple/index.html";
import "./PlayGround.less";
import "../pages/markdown.less";

export default class PlayGround extends Component {
  static defaultProps = {
    componentName: null
  };
  static propTypes = {
    componentName: PropTypes.string
  };

  state = {
    textclass: false, //初始代码
    article: "", //说明
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
      const repl = await import(`!html-loader!../../../jsdemo/${componentName}/index.html`);

      this.setState({
        repl
      });
      this.executeCode(repl);

      var _this = this;
      import(`../../../jsdemo/${componentName}/desc.md`).then(function(data) {
        _this.setState({
          article: data
        });
      });
    } catch (e) {
      this.setState({
        repl: defaultRepl
      });
      this.executeCode(defaultRepl);

      var _this = this;
      import("../../../jsdemo/temple/desc.md").then(function(data) {
        _this.setState({
          article: data
        });
      });
    }
  }

  codeRun = () => {
    this.executeCode(this.state.repl);
  };

  executeCode(repl) {
    this.setState({
      frameTemlp: this.frameNode(repl)
    });
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

  copyCode = () => {
    copy(this.state.repl);
    message.success("复制成功", 1);
  };

  codeRestore = () => {
    this.loadRepl();
  };

  codeDesc = () => {
    this.setState({
      textclass: !this.state.textclass
    });
  };

  render() {
    const { repl, frameTemlp, textclass, article } = this.state;
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
            {!textclass ? (
              <div>
                <div className={"code-bar"}>
                  源代码编辑器
                  <a onClick={this.codeDesc}>说明</a>
                  <a onClick={this.codeRestore}>还原</a>
                  <a onClick={this.codeRun}>运行</a>
                  <a onClick={this.copyCode}>复制</a>
                </div>
                <div className={"code-con"}>
                  <CodeMirror {...codeMirrorProps} />
                </div>
              </div>
            ) : (
              <div>
                <div className={"code-bar"}>
                  <a onClick={this.codeDesc}>代码</a>
                </div>
                <div className={"code-con"}>
                  <article
                    className={classnames("code-desc", "markdown")}
                    dangerouslySetInnerHTML={{ __html: article }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={"code-map"} ref={node => (this.mount = node)}>
          {frameTemlp}
        </div>
      </div>
    );
  }
}
