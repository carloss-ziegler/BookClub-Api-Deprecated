import { connection } from "./connection.js";

const getAllUsers = async () => {
  const [users] = await connection.execute("SELECT * FROM users");
  return users;
};

const getUserById = async (userId) => {
  const [user] = await connection.query(
    `SELECT * FROM users WHERE id = ${userId}`
  );

  return user;
};

const updateUser = async (userId, user) => {
  const { name, email, country } = user;

  const [updatedUser] = await connection.query(
    "UPDATE users SET name = ?, email = ?, country = ? WHERE id = ?",
    [name, email, country, userId]
  );

  return [updatedUser];
};

const deleteUser = async (userId) => {
  const [deletedUser] = await connection.execute(
    "DELETE FROM users WHERE id = ?",
    [userId]
  );

  return deletedUser;
};

export default { getAllUsers, getUserById, updateUser, deleteUser };
