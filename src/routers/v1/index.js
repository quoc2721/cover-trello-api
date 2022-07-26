import express from "express";
import { HttpStatusCode } from "../../utilities/constants.js";
import { boardRoutes } from "./board.route.js";

const router = express.Router();

router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: "OK" })
);

router.use("/boards", boardRoutes);

export const apiV1 = router;
