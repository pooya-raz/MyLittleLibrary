import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

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

const deleteBook = (id: string) => {

};

class BookShow extends Component<MyProps, MyState>{
    constructor(props: MyProps) {
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
            show: false,
            toSearch: false,
            showAddConfirmation: false
        }
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleDelete() {
        axios.post(`/api/books/${this.state.book.book_id}/delete`)
            .then(response => {
                this.handleClose
                this.setState(() => ({
                    toSearch: true
                }));
            })
            .catch(err => {
                alert(err);
            });
    }



    componentDidMount() {
        this.setState({ isLoading: true });

        //if book was added show confirmation
        if (this.props.location.state !== undefined && this.props.location.state.showAddConfirmation === true) {
            this.setState({ showAddConfirmation: true })
            let timer = () => {
                this.setState({ showAddConfirmation: false })
            }
            setTimeout(timer, 4000);
        }

        //Get book details from API
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
        if (this.state.toSearch === true) {
            return <Redirect
                to={{
                    pathname: '/',
                    state: { showDeleteConfirmation: true }
                }} />
        } else if (hasError) {
            return (
                <div className="error alert alert-danger" role="alert">
                    <p>Oops... something has gone wrong!</p>
                </div>)
        } else if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (

            <div>
                <div>
                    <Alert variant={"success"} show={this.state.showAddConfirmation}>
                        Book was successfully added
          </Alert>
                </div>
                <Container >
                    <div className="text-center" style={{paddingBottom: "60px"}}>
                    <img  src="http://books.google.com/books/content?id=ScG5YqYcsEcC&printsec=frontcover&img=1&zoom=1&source=gbs_api" />
                        <h3 className="book-details_title ">{book.book_title} </h3>
                        <h4 className="book-details_authors">An Author</h4>
                        <Row>
                            <Col></Col>
                            <Col>
                                <p>2004</p>
                            </Col>
                            <Col>
                                <p>Publisher</p>
                            </Col>
                            <Col></Col>
                        </Row>
                        <p>ISBN-13: 978-0826476975</p>
                        <Button type="button"> Edit Book </Button>
                        <hr></hr>
                        <h3>Location Details</h3>
                        <Row>
                            <Col>Location:</Col>
                            <Col>
                                <DropdownButton id="dropdown-basic-button" variant="info" title="Dropdown button">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <p>manage locations</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Status:</p>
                            </Col>
                            <Col>
                                <DropdownButton id="Status" variant="info" title="Dropdown button">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <p>manage statuses</p>
                            </Col>
                        </Row>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Location Notes</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Location Notes"
                                aria-describedby="inputGroup-sizing-default"
                            />
                            </InputGroup>
                            <hr></hr>
                            <Button type="button"
                                className="book-details_delete-button js-book-details_delete-button"
                                variant="danger"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                onClick={this.handleShow} >
                                Delete Book
                </Button>


                    </div>

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
                </Container>
            </div>
                )
            }
        }
        export default BookShow;
