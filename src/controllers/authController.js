import { connection } from "../models/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createUser = async (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM users WHERE username = ?";

  const [rows] = await connection.execute(
    q,
    [req.body.username],
    (error, data) => {
      if (error) return res.status(500).json(error);
    }
  );

  if (rows.length) return res.status(409).json("User already exists!");

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  // Register new user with hashed password
  const q2 =
    "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?, ?, ?, ?)";

  const values = [
    req.body.username,
    req.body.email,
    hashedPassword,
    req.body.name,
  ];

  const [rows2] = await connection.execute(q2, values);
  return res.status(201).json("Usuário criado!");
};

const signUser = async (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  const [rows] = await connection.execute(q, [req.body.username]);

  if (rows.length === 0) return res.status(404).json("User not found!");

  const checkPassword = bcrypt.compareSync(req.body.password, rows[0].password);
  if (!checkPassword)
    return res.status(400).json("Wrong Password or username!");

  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET_KEY);

  console.log(process.env.JWT_SECRET_KEY);

  const { password, ...others } = rows[0];

  res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .json(others);
};

const signOut = async (req, res) => {};

export default { createUser, signUser, signOut };
