import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.get("/test", (req: Request, res: Response) => res.status(200).send("Test OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[platform-server] listening on port ${PORT}`);
});
