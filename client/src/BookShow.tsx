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
            book_title: "",
            book_image: "",
            book_id: "",
            location_id: ""
        },
        isLoading: false 
    }
    
    componentDidMount() {
        this.setState({ isLoading: true });
        let id = this.props.match.params.id.toString();
        axios.get('/api/books/' + id)
        .then(response => {
            const res_book:Book = response.data
            this.setState({book: res_book, isLoading: false});
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
        const { book, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }

        return (
            <div>
            <h1>{book.book_id}</h1>
            <h2 className="book_title">{book.book_title} </h2>
            </div>
        )}
}
export default BookShow;
