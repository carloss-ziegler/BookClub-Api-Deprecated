import booksModel from "../models/booksModel.js";

const getAllBooks = async (_req, res) => {
  const books = await booksModel.getAllBooks();

  return res.status(200).json(books);
};

const addBook = async (req, res) => {
  const createdBook = await booksModel.addBook(req.body);
  return res.status(201).json(createdBook);
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;

  await booksModel.deleteBook(bookId);
  return res.status(204).json();
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;

  await booksModel.updateBook(bookId, req.body);

  return res.status(204).json();
};

export default { getAllBooks, addBook, deleteBook, updateBook };
