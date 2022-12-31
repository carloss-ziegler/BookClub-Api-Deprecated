import usersModel from "../models/usersModel.js";

const getAllUsers = async (_req, res) => {
  const users = await usersModel.getAllUsers();

  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  await usersModel.deleteUser(userId);
  return res.status(204).json();
};

export default { getAllUsers, deleteUser };
