/**
 * Module with the entity entity.
 */
import { Column, OneToMany, Entity } from "typeorm";
import { BaseEntity } from "~/src/domain/entity/base";
import { Queue } from "~/src/domain/entity/queue";

@Entity()
export class Topic extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Queue, (queue) => queue.topic)
  queue: Queue[];
}
