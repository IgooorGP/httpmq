/**
 * Module with the entity entity.
 */
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "~/src/core/domain/models/base";
import { Queue } from "~/src/core/domain/models/queue";

@Entity()
export class Topic extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Queue, (queue) => queue.topic)
  queue: Queue[];
}
