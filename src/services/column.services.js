import { ColumnModel } from "../models/column.model.js";

const craeteNew = async (data) => {
  try {
    const result = await ColumnModel.createNew(data);
    return result;
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

export const ColumnService = { craeteNew, update };
