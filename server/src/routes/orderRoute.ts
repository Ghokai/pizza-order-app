import * as express from "express";
import { getManager } from "typeorm";
import { PizzaOrder, OrderStatus, PizzaSize, PizzaType } from "../models";

const orderRouter = express.Router();

// middleware that is specific to this router

/*
orderRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
*/
// define the home page route
orderRouter.get("/", async (req, res) => {
  try {
    const pizzaOrderRepo = getManager().getRepository(PizzaOrder);
    const orders = await pizzaOrderRepo.find({
      relations: ["pizzaType", "pizzaSize", "orderStatus"]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

orderRouter.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    if (orderId <= 0) {
      res.status(400).send("wrong id");
    }
    const pizzaOrderRepo = getManager().getRepository(PizzaOrder);
    const order = await pizzaOrderRepo.findOne({
      relations: ["pizzaType", "pizzaSize", "orderStatus"],
      where: { id: orderId }
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).send({ error: "record not exists" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

orderRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const pizzaOrderRepo = getManager().getRepository(PizzaOrder);
    const pizzaOrder = pizzaOrderRepo.create(req.body);
    console.log(pizzaOrder);
    await pizzaOrderRepo.save(pizzaOrder);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

orderRouter.delete("/:id", async (req, res) => {
  try {
    const pizzaOrderRepo = getManager().getRepository(PizzaOrder);
    await pizzaOrderRepo.remove(req.params.id);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

orderRouter.get("/formfields", async (req, res) => {
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

export default orderRouter;
