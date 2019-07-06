import * as express from "express";
import { getManager, Like } from "typeorm";
import { PizzaOrder, OrderStatus, PizzaSize, PizzaType } from "../models";

const orderRouter = express.Router();

const orderValidatorMiddleware = async (req, res, next) => {
  const orderId = req.body.id ? req.body.id : req.params.id;
  if (orderId || orderId > 0) {
    const PizzaOrderRepo = getManager().getRepository(PizzaOrder);
    const existingPizzaOrder = await PizzaOrderRepo.findOne({
      relations: ["pizzaType", "pizzaSize", "orderStatus"],
      where: { id: orderId }
    });

    if (existingPizzaOrder.orderStatus.id === 4) {
      res
        .status(401)
        .send("You can't make changes on this record because it is completed!");
      return;
    }
  }
  next();
};

orderRouter.get("/", async (req, res) => {
  try {
    const whereCondition: any = {};
    //like filter on customername
    if (req.query.customername) {
      whereCondition.customerName = Like(`%${req.query.customername}%`);
    }
    //equal filter on order status
    if (req.query.orderstatus && req.query.orderstatus > 0) {
      whereCondition.orderStatus = req.query.orderstatus;
    }

    const pizzaOrderRepo = getManager().getRepository(PizzaOrder);
    const orders = await pizzaOrderRepo.find({
      relations: ["pizzaType", "pizzaSize", "orderStatus"],
      where: whereCondition
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).send(error);
  }
});

orderRouter.post("/", orderValidatorMiddleware, async (req, res) => {
  try {
    const pizzaOrderRepo = getManager().getRepository(PizzaOrder);
    const pizzaOrder = pizzaOrderRepo.create(req.body as Object);

    //if order will create set initial date and status
    if (!pizzaOrder.id || pizzaOrder.id < 1) {
      pizzaOrder.orderDate = new Date();
      const orderStatus = new OrderStatus("");
      orderStatus.id = 1;
      pizzaOrder.orderStatus = orderStatus;
    }

    await pizzaOrderRepo.save(pizzaOrder);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

orderRouter.delete("/:id", orderValidatorMiddleware, async (req, res) => {
  try {
    const pizzaOrderRepo = getManager().getRepository(PizzaOrder);
    await pizzaOrderRepo.delete(req.params.id);
    res.status(200).send();
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).send(error);
  }
});

export default orderRouter;
