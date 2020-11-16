/**
 * Module with the entity entity.
 */
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "~/src/core/domain/models/base";
import { Queue } from "~/src/core/domain/models/queue";

@Entity()
export class Message extends BaseEntity {
  constructor(headers: object, message: object, queue: Queue, acked: boolean = false) {
    super();
    this.headers = headers;
    this.message = message;
    this.queue = queue;
    this.acked = acked;
  }

  @Column("json")
  headers: object;

  @Column("json")
  message: object;

  @Column({ default: false })
  acked: boolean;

  @ManyToOne(() => Queue, (queue) => queue.messages)
  queue: Queue;
}
