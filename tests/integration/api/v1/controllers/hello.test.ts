import { Application } from "express";
import request from "supertest";
import { createServer } from "~/src/startup/server";
import databaseConnection from "~/tests/support/db-connection";


describe("Greetings resource suite", () => {
  let server : Application;

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

  test("should make a GET request to say hello to igp", async () => {
    // arrange
    const endpoint = "/api/v1/greetings/hello";

    // act
    const result = await request(server).get(endpoint).query({ name: "igp" });

    // assert
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({ message: "Hello, igp!" });
  });

  test("should make a GET request to say bye to world", async () => {
    // arrange
    const endpoint = "/api/v1/greetings/bye"; // no name qry string -> defaults to world

    // act
    const result = await request(server).get(endpoint);

    // assert
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({ message: "Bye, world!" });
  });
});
