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
        state = {book: {
            book_title: "hi",
            book_image: "",
            book_id: "",
            location_id: ""
        }
    }
    
    componentDidMount() {
        axios.get('/api/books/1')
        .then(response => {
            const book:Book = response.data
            this.setState({book});
        })
        /*
            this.setState({book: {
                book_title: response.data.book_title,
                book_image: response.data.book_image,
                book_id: response.data.book_id,
                location_id: response.data.book_id
            }
        })
     */ 
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
    render(

    ) {
        return (
            <div>
            <h1>{this.props.match.params.id}</h1>
            <h2 className="book_title">{this.state.book.book_title} </h2>
            </div>
        )}
}
export default BookShow;
