import express, { Express } from "express";
import env from "dotenv";
env.config();

import { connect } from "./config/database";
import v1Route from "./v1/routes/index.route";

connect();

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

v1Route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});