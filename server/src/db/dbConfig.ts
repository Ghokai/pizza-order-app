// Config that is common to more than one part of the app.

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { PizzaOrder, PizzaSize, PizzaType, OrderStatus } from "../models";

//postgres://postgres:password@db:5432/CardDeliveryDB

const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "PizzaOrderDB",
  synchronize: true,
  logging: false,
  entities: [PizzaOrder, PizzaType, PizzaSize, OrderStatus]
};

export { typeOrmConfig };
