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
  const [deletedBook] = await connection.query(
    "DELETE FROM books WHERE bookid = ?",
    [bookId]
  );

  return deletedBook;
};

const updateBook = async (bookId, book) => {
  const { title, author, stars, thumbnail } = book;

  const [updatedBook] = await connection.execute(
    "UPDATE books SET title = ?, author = ?, stars = ?, thumbnail = ? WHERE id = ?",
    [title, author, stars, thumbnail, bookId]
  );

  return updatedBook;
};

export default { getAllBooks, addBook, deleteBook, updateBook };
