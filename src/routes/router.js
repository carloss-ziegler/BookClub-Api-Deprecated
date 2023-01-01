import express from "express";

// Books
import booksController from "../controllers/booksController.js";
import booksMiddleware from "../middlewares/booksMiddleware.js";

// Users
import usersController from "../controllers/usersController.js";

// Auth
import authController from "../controllers/authController.js";

//Cards
import cardController from "../controllers/cardController.js";

export const router = express.Router();

// Books
router.get("/books", booksController.getAllBooks);
router.post("/books", booksMiddleware.validateBody, booksController.addBook);
router.delete("/books/:idbooks", booksController.deleteBook);
router.put("/books/:bookId", booksController.updateBook);

// Users
router.get("/users", usersController.getAllUsers);
router.get("/users/:userId", usersController.getUserById);
router.put("/users/:userId", usersController.updateUser);
router.delete("/users/:userId", usersController.deleteUser);

// Auth
router.post("/auth/register", authController.createUser);
router.post("/auth/login", authController.signUser);
router.post("/auth/logout", authController.signOut);

// Cards
router.get("/users/:userId/cards", cardController.getAllCards);
