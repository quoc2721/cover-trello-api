import { BoardModel } from "../models/board.model.js";
import  cloneDeep  from "lodash";

const craeteNew = async (data) => {
  try {
    const createNewBoard = await BoardModel.createNew(data);
    const getNewBoard = await BoardModel.findOneById(createNewBoard.insertedId.toString())
    return getNewBoard;
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

    // const transformBoard = cloneDeep(board)

    // transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)

    // transformBoard.columns.forEach(column => {
    //   column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
    // })

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

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateAt: Date.now(),
    };
    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;

    const updatedBoard = await BoardModel.update(id, updateData);

    return updatedBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { craeteNew, getFullBoard, update };
