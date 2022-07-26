import { HttpStatusCode } from "../utilities/constants.js";
import { BoardService } from "../services/board.services.js";

const craeteNew = async (req, res) => {
  try {
    const result = await BoardService.craeteNew(req.body);
    console.log(result);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

export const BoardController = { craeteNew };
