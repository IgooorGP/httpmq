/**
 * The main use cases of the httpMQ application (it's public interface).
 */
import { getConnection } from "typeorm";
import { NewMessageDto } from "~/src/core/bondaries/schemas/new-message";
import { Message } from "~/src/core/domain/models/message";
import { Queue } from "~/src/core/domain/models/queue";
import { QueueException } from "~/src/core/services/exceptions/services";

/**
 * Checks if a given destination belongs to a queue or a topic name.
 *
 * @param destination - destination name which can be either a topic or a queue (default).
 */
const isQueueDestination = (destination: string): boolean => {
  const topicPattern = /^\/topic\/.*$/;

  return topicPattern.test(destination);
};

/**
 * Publishes messages to the queue given by the newMessageDto's destination header.
 *
 * @param newMessageDto - new message request to be published to a queue
 * @throws QueueException - if a queue exception occurs such as the queue was not found
 */
const publishToQueue = async (newMessageDto: NewMessageDto): Promise<void> => {
  const queueRepository = getConnection().getRepository(Queue);
  const messageRepository = getConnection().getRepository(Message);
  const queueName = newMessageDto.headers.destination;
  const queue = await queueRepository.findOne({ name: queueName });

  if (queue === undefined) throw new QueueException(`The queue '${queueName}' does not exist on the broker.`);

  const message = new Message(newMessageDto.headers, newMessageDto.headers, queue, false);

  await messageRepository.save(message);
};

/**
 * Publishes a message to a topic and all its queues according to the message's destination header.
 *
 * @param newMessageDto - new message request to publish toe the topic.
 */
const publishToTopic = async (newMessageDto: NewMessageDto): Promise<void> => {};

/**
 * Publishes a message to its destination.
 *
 * @param newMessageRequest - message to tbe published to its destination.
 */
const sendMessageToDestination = async (newMessageRequest: NewMessageDto): Promise<void> => {
  const destination = newMessageRequest.headers.destination;

  if (isQueueDestination(destination)) {
    await publishToQueue(newMessageRequest);
  } else {
    await publishToTopic(newMessageRequest);
  }
};

export { sendMessageToDestination };
