interface IndustryIdentifier {
    type: string,
     identifier: string 
}
interface IBook
{id?: number;
title: string;
location_id?: number;
authors?: Array<string>;
industryIdentifier?: Array<IndustryIdentifier>;
published_date?: number;
publisher?: string;
image_url?: string}

export class Book {
    id?: number;
    title: string;
    location_id?: number;
    authors?: Array<string>;
    industryIdentifier?: Array<IndustryIdentifier>;
    published_date?: number;
    publisher?: string;
    image_url?: string

    constructor(bookResponse:Book){
        if(bookResponse.title === ""){
            throw('Book title cannot be an empty string')
        }
        this.id = bookResponse.id;
        this.title = bookResponse.title;
        this.location_id = bookResponse.location_id;
        this.authors = bookResponse.authors;
        this.industryIdentifier = bookResponse.industryIdentifier;
        this.published_date = bookResponse.published_date;
        this.publisher = bookResponse.publisher;
        this.image_url = bookResponse.image_url;

    }
}