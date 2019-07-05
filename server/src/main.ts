import "reflect-metadata";
import express = require("express");
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { createConnection } from "typeorm";
import { typeOrmConfig } from "./db/dbConfig";
import orderRouter from "./routes/orderRoute";
import pizzaSizeRouter from "./routes/pizzaSizeRoute";
import pizzaTypeRouter from "./routes/pizzaTypeRoute";
import formfieldsRouter from "./routes/formFieldsRoute";
import orderStatusRouter from "./routes/orderStatusRoute";
import { initDB } from "./db/dbSeeder";

// Create a new express application instance

createConnection(typeOrmConfig)
  .then(conn => {
    const app: express.Application = express();

    app.use(cors());
    app.use(bodyParser.json());

    initDB().then(_ => {
      console.log("seeding complete!");
    });

    app.get("/ping", function(req, res) {
      res.send({ result: "pong" });
    });

    app.use("/orders", orderRouter);
    app.use("/sizes", pizzaSizeRouter);
    app.use("/types", pizzaTypeRouter);
    app.use("/statuses", orderStatusRouter);
    app.use("/formfields", formfieldsRouter);

    app.listen(4200, function() {
      console.log("pizza order server listening on port 4200!");
    });
  })
  .catch(_ => console.log("***Can not connect to database!!!"));
