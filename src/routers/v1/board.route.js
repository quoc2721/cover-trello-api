import express from "express";
import { BoardController } from "../../controllers/board.controller.js";
import { BoardValidation } from "../../validations/board.validation.js";

const router = express.Router();

router
  .route("/")
  // .get((req, res) => console.log('GET boards'))
  .post(BoardValidation.craeteNew, BoardController.craeteNew);

export const boardRoutes = router;

//  ch vieet code
