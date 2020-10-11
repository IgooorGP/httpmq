/**
 * Module with the entity entity.
 */
import { Column, ManyToOne, OneToMany, Entity } from "typeorm";
import { BaseEntity } from "~/src/domain/entity/base";
import { Message } from "~/src/domain/entity/message";
import { Topic } from "~/src/domain/entity/topic";

@Entity()
export class Queue extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Message, (message) => message.queue)
  messages: Message[];

  @ManyToOne(() => Topic, (topic) => topic.queue)
  topic: Topic;
}
