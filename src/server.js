import express from "express";
import { connectDB } from "./config/mongoDB.js";
import { env } from "./config/environtment.js";
import { apiV1 } from "./routers/v1/index.js";
import cors from "cors";

connectDB()
  .then(() => console.log("Connected successfuly to database server!"))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
const bootServer = () => {
  const app = express();

  const WHITELIST_DOMAINS = ["http://localhost:3000", "http://localhost:3001"];
  var corsOptions = {
    origin: function (origin, callback) {
      if (WHITELIST_DOMAINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`${origin}Not allowed by CORS`));
      }
    },
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/v1", apiV1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello run ${env.APP_HOST}:${env.APP_PORT}/`);
  });
};
