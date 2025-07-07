import express, { Request, response, Response } from "express";
import { generateCode, setShortUrl, getOriginalUrl } from "./requests";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4444'
}));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript world!");
});

app.post("/shorten", async (req: Request, res: Response) => {
  const { originalUrl, expiresAt, alias } = req.body;

  const code = generateCode();
  try {
    
    await setShortUrl(originalUrl, code);
  } catch (error) {
    console.error('[shorten]: ', error);
  }
 
  res.send({ shortUrl: `http://localhost:3000/short/${code}` });
});

app.get("/short/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  let originalUrl = '';
  try {
    originalUrl = await getOriginalUrl(code);
  } catch (error) {
    console.error('[shorten]: ', error);
  }

  res.redirect(originalUrl);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

