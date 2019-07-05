import * as express from "express";
import { getManager } from "typeorm";
import { OrderStatus } from "../models";

const orderStatusRouter = express.Router();

orderStatusRouter.get("/", async (req, res) => {
  try {
    const orderStatusRepo = getManager().getRepository(OrderStatus);
    const statuses = await orderStatusRepo.find();
    res.json(statuses);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default orderStatusRouter;
