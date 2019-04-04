import React, { Component } from 'react';
import LogoBar from './LogoBar'
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BookForm from "./BookForm"
import SearchPage from "./SearchPage"
import BookShow from "./BookShow"
import LibrariesPage from "./LibrariesPage";
class App extends Component {
  render() {
    return (
      <div>
        <LogoBar />
        <Router>
        <div>
          <Navbar bg="light" fixed="bottom">
            <Nav className="mr-auto">
              <Nav.Link href="/books/add-book">Add Book</Nav.Link>
              <Nav.Link href="/libraries">Libraries</Nav.Link>
              <Nav.Link href="/">Search</Nav.Link>
              <Nav.Link href="/account/">Account</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
          <Route path="/" exact component={SearchPage} />
            <Route path="/libraries" component={LibrariesPage} />
          <Route path="/books/add-book" component={BookForm} />
          <Route path="/books/:id" component={BookShow} />
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
