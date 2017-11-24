import classnames from "classnames";
import React, { Component } from "react";
import LayoutHome from "../layouts/LayoutHome";
import "./markdown.less";
// import questionDoc from "!html-loader!../doc/question.md";

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      article: '',
    }
  }

  componentDidMount(){
    var _this = this;
    import('../doc/question.md').then(function(data){
    _this.setState({article:data});
    })
  }

  render() {
    return (
      <LayoutHome {...this.props}>
        <main className={"main"}>
          <article
            className={classnames("question-block", "markdown")}
            dangerouslySetInnerHTML={{ __html: this.state.article }}
          />
        </main>
      </LayoutHome>
    );
  }
}
