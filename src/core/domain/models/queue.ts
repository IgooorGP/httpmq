/**
 * Module with the entity entity.
 */
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "~/src/core/domain/models/base";
import { Message } from "~/src/core/domain/models/message";
import { Topic } from "~/src/core/domain/models/topic";

@Entity()
export class Queue extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Message, (message) => message.queue)
  messages: Message[];

  @ManyToOne(() => Topic, (topic) => topic.queue)
  topic: Topic;
}
