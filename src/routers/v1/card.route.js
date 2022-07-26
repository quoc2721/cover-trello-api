import express from "express";
import { CardController } from "../../controllers/card.controller.js";
import { CardValidation } from "../../validations/card.validation.js";

const router = express.Router();

router.route("/").post(CardValidation.craeteNew, CardController.craeteNew);


export const cardRoutes = router
