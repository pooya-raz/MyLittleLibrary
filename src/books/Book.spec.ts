import { Book } from './Book';
const fakeBook:Book= {
    title: "hello",
    published_date: 2020,
    publisher: "Fake Publisher",
    image_url: "Fake-url.com"
}
const fakeBookNoTitle:Book= {
    title: "",
    published_date: 2020,
    publisher: "Fake Publisher",
    image_url: "Fake-url.com"
}
describe('Book class constructions', () => {
  it('should make a new class', () => {
      const newBook = new Book(fakeBook);
      expect(newBook).toBeInstanceOf(Book);
  })
  it('should throw an exception when given an empty string as a title', () => {
      expect(() => {
        new Book(fakeBookNoTitle);
      }).toThrowError('Book title cannot be an empty string');
  })
})