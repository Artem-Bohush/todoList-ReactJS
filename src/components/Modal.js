import React from 'react';
import '../css/App.css';

export default class Modal extends React.Component {
  state = {
    isOpen: false
  }

  render() {
    const style = {
      fontSize: '12px'
    }

    return (
      <React.Fragment>
        <button className="descr-btn" onClick={() => this.setState({ isOpen: true })}>View description</button>
        {this.state.isOpen && 
        <div className="modal">
          <div className="modal-body">
            <h4>Short overview</h4>
            <p>Hello! I made this simple application on ReactJS. In particular, the following features were used:<br></br>
              - Context<br></br>
              - Hooks<br></br>
              - Lazy<br></br>
              - Suspense<br></br>
              <span style={style}>p.s. when loading a page the first 10 tasks are loaded from the 
                jsonplaceholder.typicode.com</span>
            </p>
            <a href="https://github.com/Artem-Bohush/todoList-ReactJS">sourceCode</a>
            <button onClick={() => this.setState({ isOpen: false })}>Close</button>
          </div>
        </div>}
      </React.Fragment>
    )
  }
}

// p.s. when loading a page the first 10 tasks are loaded from the 
//                 jsonplaceholder.typicode.com