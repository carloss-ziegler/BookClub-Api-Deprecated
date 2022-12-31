import { connection } from "./connection.js";

const getAllBooks = async () => {
  const [books] = await connection.execute("SELECT * FROM books");
  return books;
};

const addBook = async (book) => {
  const { title, author, stars, thumbnail } = book;

  const [createdBook] = await connection.execute(
    "INSERT INTO books(title, author, stars, thumbnail) VALUES (?, ?, ?, ?)",
    [title, author, stars, thumbnail]
  );

  return { insertId: createdBook.insertId };
};

const deleteBook = async (bookId) => {
  const [deletedBook] = await connection.execute(
    "DELETE FROM books WHERE id = ?",
    [bookId]
  );

  return deletedBook;
};

const updateBook = async (idbooks, book) => {
  const { title, author, stars, thumbnail } = book;

  const [updatedBook] = await connection.execute(
    "UPDATE books SET title = ?, author = ?, stars = ?, thumbnail = ? WHERE idbooks = ?",
    [title, author, stars, thumbnail, idbooks]
  );

  return updateBook;
};

export default { getAllBooks, addBook, deleteBook, updateBook };
