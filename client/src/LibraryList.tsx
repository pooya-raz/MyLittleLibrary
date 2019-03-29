import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
type Book = { book_title: string, location_id: number }
type MyProps = {};
type MyState = { books: Array<Book>, isLoading: boolean, error: any }
class LibraryList extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            books: [],
            isLoading: false,
            error: null
        };
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('http://127.0.0.1:3000/books')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong fetching data from http://127.0.0.1:3000/books');
                }
            })
            .then(data => this.setState({ books: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { books, isLoading, error } = this.state;
        const returnedJSON = JSON.stringify(books);
        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <Container>
                {returnedJSON}
            </Container>
        )
    }
}
export default LibraryList