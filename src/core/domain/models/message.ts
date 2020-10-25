/**
 * Module with the entity entity.
 */
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "~/src/core/domain/models/base";
import { Queue } from "~/src/core/domain/models/queue";

@Entity()
export class Message extends BaseEntity {
  @Column("json")
  headers: object;

  @Column("json")
  message: object;

  @Column({ default: false })
  acked: boolean;

  @ManyToOne(() => Queue, (queue) => queue.messages)
  queue: Queue;
}
