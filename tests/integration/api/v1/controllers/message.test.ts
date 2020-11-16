import { Application } from "express";
import request from "supertest";
import { createServer } from "~/src/startup/server";
import databaseConnection from "~/tests/support/db-connection";

describe("Messaging integration tests suite", () => {
  let server: Application;

  beforeAll(async () => {
    server = await createServer();
    await databaseConnection.create();
  });

  afterAll(async () => {
    await databaseConnection.close();
  });

  beforeEach(async () => {
    await databaseConnection.clear();
  });

  test("Should fail to create a new message due to a bad request with wrong schema", async () => {
    // arrange
    const endpoint = "/api/v1/message";
    const badRequest = {
      message: { message: "Hello, world!" }, // no headers
    };

    // act
    const result = await request(server).post(endpoint).send(badRequest);

    // assert
    expect(result.status).toBe(400);
    expect(result.body["message"]).toBe("Sorry, but that's a bad request!");
  });
});
