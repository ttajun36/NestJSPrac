import * as express from "express";
import { Cat, CatType } from "./app.model";
import { error } from "console";

const app: express.Express = express();

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middleware");
  next();
});

//* READ 고양이 데이터 전부 조회
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    throw new Error("db connect error");
    res.send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    console.log(req.params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* json middleware
app.use(express.json());

//* CREATE 새로운
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    Cat.push(data); // create
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* 404 middleware
app.use((req, res, next) => {
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log("server is on...");
});
