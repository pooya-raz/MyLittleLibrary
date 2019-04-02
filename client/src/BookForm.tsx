import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
type MyProps = {
    history: Array<string>
};
/*
type MyState = { 
    book_title: string, 
    book_author: string,
    year: number,
    publisher: string,
    ISBN: string
};
*/
type MyState = any
type Book = {
    book_title: string,
    location_id: number,
}
class BookForm extends Component<MyProps, MyState>{
    constructor(props: any) {
        super(props);
        this.state = {
            book_title: '',
            book_author: '',
            year: 0,
            publisher: '',
            ISBN: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*
    handleChange (event:React.FormEvent<HTMLInputElement>) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [event.target.name]: event.target.value } as ComponentState);
      }
      */

    handleChange = (field: string) => (event: any) => {
        this.setState({ [field]: event.target.value } as Pick<MyState, any>);
    };

    /*
        handleChange(event: any) {
            this.setState({ book_title: event.target.value });
        }
        */

    handleSubmit(event: any) {
        let id:string = ""
        /*
        fetch('/api/books/add-book', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                book_title: this.state.book_title,
                book_author: this.state.book_author
                 
            })
        }).then(response => {return response.json}).then(json => console.log(json));
        event.preventDefault();
*/
        axios.post('/api/books/add-book', {
            book_title: this.state.book_title,
            book_author: this.state.book_author
        })
            .then(response => {
               id =  response.data.book_id
               this.props.history.push(`/books/${id}`);
            })
            .catch(function (error) {
                console.log(error);
            });
            event.preventDefault();
            
    }
    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            name="book_title"
                            onChange={this.handleChange("book_title")}
                            autoFocus />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Enter Author" value={this.state.book_author} onChange={this.handleChange("book_author")} />
                    </Form.Group>
                    <Form.Group controlId="formYear">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="number" placeholder="Enter Year of Publication" />
                    </Form.Group>
                    <Form.Group controlId="formPublisher">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control type="text" placeholder="Enter Publisher" />
                    </Form.Group>
                    <Form.Group controlId="formISBN">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="number" placeholder="Enter ISBN" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                       Add Book
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default BookForm;
