import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import {
  dbHostContainer,
  dbName,
  dbPassword,
  dbPort,
  dbType,
  dbUser
} from "../connectionInformations";
import { PizzaOrder, PizzaSize, PizzaType, OrderStatus } from "../models";

const typeOrmConfig: PostgresConnectionOptions = {
  type: dbType,
  host: dbHostContainer,
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  synchronize: true,
  logging: false,
  entities: [PizzaOrder, PizzaType, PizzaSize, OrderStatus]
};

export { typeOrmConfig };
