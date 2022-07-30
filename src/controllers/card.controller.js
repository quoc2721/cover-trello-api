import { HttpStatusCode } from "../utilities/constants.js";
import { CardService } from "../services/card.services.js";

const craeteNew = async (req, res) => {
  try {
    const result = await CardService.craeteNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CardService.update(id, req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

export const CardController = { craeteNew, update};
