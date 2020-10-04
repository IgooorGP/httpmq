import request from "supertest";
import { createServer } from "~/src/startup/server";

describe("Greetings resource suite", () => {
  test("should make a GET request to say hello to igp", async () => {
    // arrange
    const endpoint = "/api/v1/greetings/hello";
    const server = createServer();

    // act
    const result = await request(server).get(endpoint).query({ name: "igp" });

    // assert
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({ message: "Hello, igp!" });
  });

  test("should make a GET request to say bye to world", async () => {
    // arrange
    const endpoint = "/api/v1/greetings/bye"; // no name qry string -> defaults to world
    const server = createServer();

    // act
    const result = await request(server).get(endpoint);

    // assert
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({ message: "Bye, world!" });
  });
});
