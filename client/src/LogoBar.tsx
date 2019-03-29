import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';

class LogoBar extends Component{
    render(){
        return(
          <Navbar bg="light">
            <Navbar.Brand href="#home">My Little Library</Navbar.Brand>
          </Navbar>
        )
    }
}
export default LogoBar