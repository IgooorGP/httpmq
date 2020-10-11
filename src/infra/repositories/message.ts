import { EntityManager, EntityRepository, Repository, Transaction, TransactionManager } from "typeorm";
import { Message } from "~/src/domain/entity/message";

@EntityRepository()
export class MessageRepository extends Repository<Message> {
  @Transaction()
  createMessage(@TransactionManager() manager: EntityManager, message: Message) {
    return manager.save(message);
  }
}
