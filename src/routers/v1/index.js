import express from "express";
import { HttpStatusCode } from "../../utilities/constants.js";
import { boardRoutes } from "./board.route.js";
import { columnRoutes } from "./column.route.js";
import { cardRoutes } from "./card.route.js";



const router = express.Router();

router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: "OK" })
);

router.use("/boards", boardRoutes);

router.use("/columns", columnRoutes);

router.use("/cards", cardRoutes);


export const apiV1 = router;
