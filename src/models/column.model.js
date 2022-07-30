import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongoDB.js";

const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
    };

    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getBoardId = async (columnId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: columnId });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} columnId
 * @param {string} cardId
 */
const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: columnId },
        { $push: { cardOrder: cardId } },
        { upsert: true, retunrNewDocument: true }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data };
    if (data.boardId) updateData.boardId = ObjectId(data.boardId);

    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnOriginal: false }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = {
  createNew,
  update,
  getBoardId,
  pushCardOrder,
  columnCollectionName,
};
