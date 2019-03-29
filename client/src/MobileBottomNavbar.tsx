import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Account() {
  return <h2>Account</h2>;
}

class MobileBottomNavbar extends Component {
  render() {
    return (
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
          <Route path="/Account/" component={Account} />
        </div>
      </Router>
    )
  }
}
export default MobileBottomNavbar 