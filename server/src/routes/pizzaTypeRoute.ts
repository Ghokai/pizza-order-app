import * as express from "express";
import { getManager } from "typeorm";
import { PizzaType } from "../models";

const pizzaTypeRouter = express.Router();

pizzaTypeRouter.get("/", async (req, res) => {
  try {
    const pizzaTypeRepo = getManager().getRepository(PizzaType);
    const pizzaTypes = await pizzaTypeRepo.find();
    res.json(pizzaTypes);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default pizzaTypeRouter;