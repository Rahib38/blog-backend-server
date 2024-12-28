import cors from "cors";
import express, { Application, Request, Response } from "express";
import authRouter from "./app/modules/auth/auth.route";
const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cors());


app.use('/api/auth',authRouter)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
