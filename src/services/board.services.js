import { BoardModel } from "../models/board.model.js";

const craeteNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { craeteNew };
