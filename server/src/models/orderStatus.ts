import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class OrderStatus {
  constructor(status: string) {
    this.status = status;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false, unique: true })
  status: string;
}
