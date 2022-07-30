import { ColumnModel } from "../models/column.model.js";
import { BoardModel } from "../models/board.model.js";
 import { CardModel } from "../models/card.model.js";

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data);
    newColumn.cards = [];

    // Update ColumnOrder Array in board collection
    const idNewColumn = newColumn.insertedId;
    const result = await ColumnModel.getBoardId(idNewColumn);
    await BoardModel.pushColumnOrder(result.boardId, idNewColumn.toString());

    return newColumn;
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
    if (updateData.cards) delete updateData.cards;

    const updatedColumn = await ColumnModel.update(id, updateData);

    if(updatedColumn._destroy) {
      CardModel.deleteMany(updatedColumn.cardOrder)
    }

    return updatedColumn;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = { createNew, update };
