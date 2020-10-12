import { Message } from "~/src/domain/entity/message";
import { Queue } from "~/src/domain/entity/queue";
import * as uuid from "uuid";
import databaseConnection from "~/tests/setup";

describe("Messaging repositories test suite", () => {
  let dbConnection;

  beforeAll(async () => {
    dbConnection = await databaseConnection.create();
  });

  afterAll(async () => {
    await databaseConnection.close();
  });

  beforeEach(async () => {
    await databaseConnection.clear();
  });

  test("should create a new message and queue using repositories", async () => {
    // arrange
    const messageRepository = dbConnection.getRepository(Message);
    const queueRepository = dbConnection.getRepository(Queue);

    const q = new Queue();
    const msg = new Message();

    q.name = `test_queue_${uuid.v4()}`;
    msg.headers = { "content-type": "text" };
    msg.message = "hello world!";

    // act
    await messageRepository.save(msg);
    await queueRepository.save(q);

    // assert
    const fetchedMessage = await messageRepository.findOneOrFail(msg.id);
    expect(fetchedMessage.message).toBe("hello world!");
  });

  test("Should retrieve no messages from empty database", async () => {
    // arrange
    const messageRepository = dbConnection.getRepository(Message);

    // act
    const totalMsgs = await messageRepository.count();

    // assert
    expect(totalMsgs).toBe(0);
  });
});
