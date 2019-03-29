import React, { Component } from 'react';
import LogoBar from './LogoBar'
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BookForm from "./BookForm"
import Libraries from "./Libraries"

class App extends Component {
  render() {
    return (
      <div>
        <LogoBar />
        <Router>
        <div>
          <Navbar bg="light" fixed="bottom">
            <Nav className="mr-auto">
              <Nav.Link href="/new_book">Add Book</Nav.Link>
              <Nav.Link href="/libraries">Libraries</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>
              <Nav.Link href="/account/">Account</Nav.Link>
            </Nav>
          </Navbar>
          <Route path="/new_book/" component={BookForm} />
          <Route path="/libraries/" component={Libraries} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
