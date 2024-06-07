import express, { Express } from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
env.config();

import { connect } from "./config/database";
import v1Route from "./v1/routes/index.route";

connect();

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.use(cors());

// parse application/json
app.use(bodyParser.json());

v1Route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});