import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import axios from 'axios';

interface MatchParams {
    id: string;
}
interface MyProps extends RouteComponentProps<MatchParams> {
}
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
    location_id: string,
    book_image: string,
    book_id: string
}

const deleteBook = (id:string) => {
 
};

class BookShow extends Component<MyProps, MyState>{
    constructor(props:MyProps) {
        super(props);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    
        this.state = {
            book: {
                book_title: "",
                book_image: "",
                book_id: "",
                location_id: ""
            },
            isLoading: false,
            hasError: false,
            show: false
        }
      }
 

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleDelete(){
        axios.post(`/api/books/${this.state.book.book_id}/delete`)
        .then(this.handleClose)
        .catch(err => {
          alert(err);
        });
    }



    componentDidMount() {
        this.setState({ isLoading: true });
        let id = this.props.match.params.id.toString();
        axios.get('/api/books/' + id)
            .then(response => {
                const res_book: Book = response.data
                this.setState({ book: res_book, isLoading: false });
            })
            .catch(error => {
                // handle error
                this.setState({ hasError: error });
            })
            .then(function () {
                // always executed
            });
    }
    render(

    ) {
        const { book, isLoading, hasError } = this.state;
        if (hasError) {
            return (
                <div className="error alert alert-danger" role="alert">
                    <p>Oops... something has gone wrong!</p>
                </div>)
        } else if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <div>
                <h2 className="book-details_title">{book.book_title} </h2>
                <Button type="button"
                    className="book-details_delete-button js-book-details_delete-button"
                    variant="danger"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={this.handleShow} >
                         Delete Book
                </Button>

                <div>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are your sure that you want to delete this book?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" className="js-delete-book" onClick={this.handleDelete}>
                                Delete Book
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default BookShow;
