import React, { Component } from 'react';
import SearchBar from './SearchBar';
import LibraryList from './LibraryList';
import LibraryDropdown from './LibraryDropdown';
import StatusDropdown from './StatusDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Libraries extends Component {
    render() {
      return (
          <div>
        <SearchBar />
        <Container>
          <Row>
            <Col><LibraryDropdown /></Col>
            <Col><StatusDropdown/></Col>
          </Row>
        </Container>
        <LibraryList />
        </div>
      )}}
export default Libraries