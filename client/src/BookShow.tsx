import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

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
    location_id: number,
}
class BookShow extends Component<MyProps, MyState>{
    render(

    ) {
        return (
            <h1>{this.props.match.params.id}</h1>
        )}
}
export default BookShow;
