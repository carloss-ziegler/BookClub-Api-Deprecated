import { connection } from "./connection.js";

const getAllUsers = async () => {
  const [users] = await connection.execute("SELECT * FROM users");
  return users;
};

const deleteUser = async (userId) => {
  const [deletedUser] = await connection.execute(
    "DELETE FROM users WHERE id = ?",
    [userId]
  );

  return deletedUser;
};

export default { getAllUsers, deleteUser };
