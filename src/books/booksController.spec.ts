import booksController = require("./booksController");
describe('adder', function() {
    it('should add two numbers together', function() {
      let result = booksController.adder(5, 2);
      expect(result).toBe(7);   
  });
});