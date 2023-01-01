import cardsModel from "../models/cardsModel.js";

const getAllCards = async (_req, res) => {
  const cards = await cardsModel.getAllCards();

  return res.status(200).json(cards);
};

export default { getAllCards };
