import express, { Request, Response } from "express";
import citiesRouter from "./routes/cities";

const app = express();

app.use(express.json());
app.use("/cities", citiesRouter);

app.get("/home", (req: Request, res: Response) => {
    res.json({ status: "ok" });
});

export default app;