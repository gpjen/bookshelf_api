const { createBook, getBooks, getBookById, updateBook, deleteBook } =
  require("./handler").books;

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: createBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBook,
  },
];

module.exports = routes;
