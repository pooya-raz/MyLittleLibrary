import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container'
class SearchBar extends Component {
    render() {
        return (
            <Container style={{ color: 'red' }}>
                <Form className="formHorizontal" >
                    <FormControl type="text" placeholder="Search" />
                </Form>
            </Container>
        )
    }
}
export default SearchBar