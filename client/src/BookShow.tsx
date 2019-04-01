import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
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


class BookShow extends Component<MyProps, MyState>{
    state = {
        book: {
            book_title: "",
            book_image: "",
            book_id: "",
            location_id: ""
        },
        isLoading: false,
        hasError: false
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
                this.setState({ hasError: true });
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
                Oops... something has gone wrong!
            </div>)
        } else if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <h1>{book.book_id}</h1>
                <h2 className="book_title">{book.book_title} </h2>
            </div>
        )
    }
}
export default BookShow;
