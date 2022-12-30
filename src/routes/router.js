import express from "express";
import booksController from "../controllers/booksController.js";
import booksMiddleware from "../middlewares/booksMiddleware.js";

export const router = express.Router();

router.get("/books", booksController.getAllBooks);

router.post("/books", booksMiddleware.validateBody, booksController.addBook);

router.delete("/books/:idbooks", booksController.deleteBook);

router.put(
  "/books/:idbooks",
  booksMiddleware.validateBody,
  booksController.updateBook
);
