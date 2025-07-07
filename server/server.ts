import express, { Request, response, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4444', // или '*' для всех (НЕ для продакшена)
  methods: ['GET', 'POST'],
  credentials: true, // если отправляешь куки или auth-заголовки
}));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript world!");
});

app.post("/shorten", (req: Request, res: Response) => {
  console.log('req >> ', req);
  const { originalUrl, expiresAt, alias } = req.body;
  
  console.log('originalUrl >> ', originalUrl);
  console.log('expiresAt >> ', expiresAt);
  console.log('alias >> ', alias);

  res.send({ shortUrl: '/urlll' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

