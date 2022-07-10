const { nanoid } = require("nanoid");
const { books } = require("./books");

exports.books = {
  createBook: async (req, h) => {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    // validate name
    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    }
    // validate read page
    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    try {
      const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
      };

      // add book into array
      books.push(newBook);

      // good response
      return h
        .response({
          status: "success",
          message: "Buku berhasil ditambahkan",
          data: {
            bookId: id,
          },
        })
        .code(201);
    } catch (error) {
      // error generic response
      return h
        .response({
          status: "error",
          message: "Buku gagal ditambahkan",
        })
        .code(500);
    }
  },
  getBooks: async (req, h) => {
    // get query
    const { reading, finished, name } = req.query;

    let data = books;

    // filter by query
    if (reading !== undefined) {
      data = data.filter((book) => book.reading === Boolean(parseInt(reading)));
    }

    if (finished !== undefined) {
      data = data.filter(
        (book) => book.finished === Boolean(parseInt(finished))
      );
    }

    if (name) {
      data = data.filter((book) => {
        const data = book.name.toLowerCase().split(" ");
        if (data.includes(name.toLowerCase())) {
          return book;
        }
      });
    }

    //filter show data in id, name, publisher
    data = data.map((book) => {
      const { id, name, publisher } = book;
      return { id, name, publisher };
    });

    return h
      .response({
        status: "success",
        data: {
          books: data,
        },
      })
      .code(200);
  },
  getBookById: async (req, h) => {
    const { bookId } = req.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index < 0) {
      return h
        .response({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
        .code(404);
    }

    return h
      .response({
        status: "success",
        data: {
          book: books[index],
        },
      })
      .code(200);
  },
  updateBook: async (req, h) => {
    const { bookId } = req.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;
    const updatedAt = new Date().toISOString();

    //validate name
    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
    }

    // validate page read
    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    //validate id params
    const index = books.findIndex((book) => book.id === bookId);
    if (index < 0) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }

    // update book
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  },
  deleteBook: async (req, h) => {
    const { bookId } = req.params;

    // validate id book
    const index = books.findIndex((book) => book.id === bookId);
    if (index < 0) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }

    // delete book by id
    books.splice(index, 1);

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  },
};
