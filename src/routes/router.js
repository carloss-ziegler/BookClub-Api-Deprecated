import express from "express";

// Books
import booksController from "../controllers/booksController.js";
import booksMiddleware from "../middlewares/booksMiddleware.js";

// Users
import usersController from "../controllers/usersController.js";

// Auth
import authController from "../controllers/authController.js";

export const router = express.Router();

// Books
router.get("/books", booksController.getAllBooks);
router.post("/books", booksMiddleware.validateBody, booksController.addBook);
router.delete("/books/:idbooks", booksController.deleteBook);
router.put(
  "/books/:idbooks",
  booksMiddleware.validateBody,
  booksController.updateBook
);

// Users
router.get("/users", usersController.getAllUsers);
router.delete("/users/:userId", usersController.deleteUser);

// Auth
router.post("/auth/register", authController.createUser);
router.post("/auth/login", authController.signUser);
router.post("/auth/logout", authController.signOut);
