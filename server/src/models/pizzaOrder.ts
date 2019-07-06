import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import PizzaSize from "./pizzaSize";
import PizzaType from "./pizzaType";
import OrderStatus from "./orderStatus";

/**
 * The Patient model is one of the simple models in the example. It is the one side of its one-to-many relationship with
 * the Appointment model.
 */
@Entity()
export default class PizzaOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", { nullable: false })
  count: number;

  @Column("timestamp", { nullable: false })
  orderDate: Date;

  @Column("text", { nullable: false })
  customerName: string;

  @Column("text", { nullable: false })
  customerAddress: string;

  @ManyToOne(type => OrderStatus, orderStatus => orderStatus.id, {
    primary: false,
    nullable: false
  })
  orderStatus: OrderStatus;

  @ManyToOne(type => PizzaSize, pizzaSize => pizzaSize.id, {
    primary: false,
    nullable: false
  })
  pizzaSize: PizzaSize;

  @ManyToOne(type => PizzaType, pizzaType => pizzaType.id, {
    primary: false,
    nullable: false
  })
  pizzaType: PizzaType;
}
