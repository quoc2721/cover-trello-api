import { ColumnModel } from "../models/column.model.js";
import { BoardModel } from "../models/board.model.js";

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data);

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
    const result = await ColumnModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = { createNew, update };
