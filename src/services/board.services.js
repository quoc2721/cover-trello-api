import { BoardModel } from "../models/board.model.js";

const craeteNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}; 

const getFullBoard = async (boardId ) => {
  try {
    const board = await BoardModel.getFullBoard(boardId );

    if(!board || !board.columns) {
      throw new Error("Board not Found!")
    }

    board.columns.forEach(column => {
      column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
    })
    // Remove card data from boards
    delete board.cards
    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { craeteNew, getFullBoard };
