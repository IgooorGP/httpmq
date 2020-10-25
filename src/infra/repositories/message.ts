import { EntityManager, EntityRepository, Repository, Transaction, TransactionManager } from "typeorm";
import { Message } from "~/src/domain/models/message";

@EntityRepository()
export class MessageRepository extends Repository<Message> {
  @Transaction()
  createMessage(@TransactionManager() manager: EntityManager, message: Message) {
    return manager.save(message);
  }
}
