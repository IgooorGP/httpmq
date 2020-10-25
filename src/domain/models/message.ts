/**
 * Module with the entity entity.
 */
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "~/src/domain/models/base";
import { Queue } from "~/src/domain/models/queue";

@Entity()
export class Message extends BaseEntity {
  @Column("json")
  headers: object;

  @Column()
  message: string;

  @ManyToOne(() => Queue, (queue) => queue.messages)
  queue: Queue;
}
