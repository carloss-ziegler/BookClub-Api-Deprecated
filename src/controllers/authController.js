import { connection } from "../models/connection.js";
import bcrypt from "bcryptjs";

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
  const signedUser = await usersModel.signUser(req.body);

  return res.status(200).json("Usuário conectado!" + signedUser);
};

const signOut = async (req, res) => {};

export default { createUser, signUser, signOut };
