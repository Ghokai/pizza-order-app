import * as express from "express";
import { getManager } from "typeorm";
import { PizzaSize } from "../models";

const pizzaSizeRouter = express.Router();

pizzaSizeRouter.get("/", async (req, res) => {
  try {
    const pizzaSizeRepo = getManager().getRepository(PizzaSize);
    const pizzaSizes = await pizzaSizeRepo.find();
    res.json(pizzaSizes);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default pizzaSizeRouter;
