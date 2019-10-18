import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as TodoActions from "../actions/todos";

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  // Bookmarks tree specific
  // dirs will change to prop
  constructor() {
    super();
    this.state = {
      dirs: []
    };
  }

  componentDidMount(){
    this.extractDirs()
  }

  extractDirs(){

    function hasChildren(node) {
      return (
        typeof node === "object" &&
        typeof node.children !== "undefined" &&
        node.children.length > 0
      );
    }

    const extractDirsRecursion = (id = '0') => {
      let bookmarksDir = chrome.bookmarks.getSubTree(id, results => {
        for(let entry of results){
          if(hasChildren(entry)){
            recArr.push(entry.title)
            for(let child of entry.children){
              extractDirsRecursion(child.id)
            }
          }
        }
      })
    }
    var recArr = [];
    extractDirsRecursion()
    console.log(recArr)
    this.setState({dirs : recArr})
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <div className="content">
        <p>{this.state.dirs}</p>
      </div>
    );
  }
}
