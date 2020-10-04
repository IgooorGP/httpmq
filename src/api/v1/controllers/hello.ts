import { Request, Response, Router } from "express";

const helloRouterV1 = Router();

function sayHelloWorld(req: Request, res: Response) {
  const helloTarget = req.query["name"] ?? "world";
  const greeting = `Hello, ${helloTarget}!`;

  res.json({ message: greeting });
}

function sayGoodBye(req: Request, res: Response) {
  const byeTarget = req.query["name"] ?? "world";
  const greeting = `Bye, ${byeTarget}!`;

  res.json({ message: greeting });
}

helloRouterV1.get("/hello", sayHelloWorld);
helloRouterV1.get("/bye", sayGoodBye);

export { helloRouterV1 };
