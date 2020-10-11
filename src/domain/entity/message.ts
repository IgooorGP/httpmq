/**
 * Module with the entity entity.
 */
import { Column, ManyToOne, Entity } from "typeorm";
import { BaseEntity } from "~/src/domain/entity/base";
import { Queue } from "~/src/domain/entity/queue";

@Entity()
export class Message extends BaseEntity {
  @Column("json")
  headers: object;

  @Column()
  message: string;

  @ManyToOne(() => Queue, (queue) => queue.messages)
  queue: Queue;
}
