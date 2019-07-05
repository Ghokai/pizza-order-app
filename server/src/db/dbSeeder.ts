import { PizzaOrder, PizzaSize, PizzaType, OrderStatus } from "../models";
import { getManager } from "typeorm";

import { typeOrmConfig } from "./dbConfig";
export const initDB = async () => {
  console.log("Seeding Started..");

  const orderStatusRepo = getManager().getRepository(OrderStatus);
  const orderStatusList = await orderStatusRepo.find();
  if (orderStatusList.length === 0) {
    const orderStatuses = ["preparing", "delivering", "cancelled", "completed"];
    for (let os of orderStatuses) {
      const newOrderStatus = new OrderStatus(os);
      const o = await orderStatusRepo.save(newOrderStatus);
    }

    console.log("Order Statuses are created!");
  } else {
    console.log("Order Statuses already exists!");
  }

  const pizzaSizeRepo = getManager().getRepository(PizzaSize);
  const pizzaSizeList = await pizzaSizeRepo.find();
  if (pizzaSizeList.length === 0) {
    const pizzaSizes = ["small", "medium", "big"];
    for (let ps of pizzaSizes) {
      const newPizzaSize = new PizzaSize(ps);
      await pizzaSizeRepo.save(newPizzaSize);
    }

    console.log("Pizza Sizes are created!");
  } else {
    console.log("Pizza Sizes already exists!");
  }

  const pizzaTypeRepo = getManager().getRepository(PizzaType);
  const pizzaTypeList = await pizzaTypeRepo.find();
  if (pizzaTypeList.length === 0) {
    const pizzaTypes = [
      "cheese",
      "vegan",
      "mexican",
      "chicken",
      "tuna",
      "fresh",
      "supreme",
      "premium"
    ];
    for (let pt of pizzaTypes) {
      const newPizzaType = new PizzaType(pt);
      await pizzaTypeRepo.save(newPizzaType);
    }

    console.log("Pizza Types are created!");
  } else {
    console.log("Pizza Types already exists!");
  }

  // Closing the TypeORM db connection at the end of the app prevents the process from hanging at the end (ex when you
  // use ctrl-c to stop the process in your console, or when Docker sends the signal to terminate the process).
};
