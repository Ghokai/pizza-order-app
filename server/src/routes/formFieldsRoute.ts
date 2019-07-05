import * as express from "express";
import { getManager } from "typeorm";
import { PizzaSize, PizzaType, OrderStatus } from "../models";

const formfieldsRouter = express.Router();

formfieldsRouter.get("/", async (req, res) => {
  try {
    const pizzaSizeRepo = getManager().getRepository(PizzaSize);
    const pizzaSizes = await pizzaSizeRepo.find();

    const pizzaTypeRepo = getManager().getRepository(PizzaType);
    const pizzaTypes = await pizzaTypeRepo.find();

    const orderStatusesRepo = getManager().getRepository(OrderStatus);
    const orderStatuses = await orderStatusesRepo.find();

    res.json({ pizzaSizes, pizzaTypes, orderStatuses });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default formfieldsRouter;
