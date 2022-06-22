import { Request, response, Response } from "express";
import CreateCousersServer from "./CreateCousersServer";

export function createCourse(req: Request, res: Response) {
  CreateCousersServer.execute({
    duration: 10,
    educator: "Peve",
    name: "NodeJs",
  });
  CreateCousersServer.execute({
    educator: "Lucas",
    name: "NodeJs",
  });
  return res.send();
}
