import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

const data = [1, 2, 3, 4];

app.get("/", (req, res) => {
  console.log(req);
  res.send({ cats: Cat });
});

app.listen(8000, () => {
  console.log("server is on...");
});
