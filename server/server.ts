import express, { Request, Response } from "express";
import { setShortUrl, getOriginalUrl, deleteOriginalUrl, setFollow, getAnalytics } from "./requests";
import cors from 'cors';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(cors({
  origin: ['http://localhost:4444', 'http://0.0.0.0:4444', 'http://127.0.0.1:4444'],
  credentials: true
}));

app.set('trust proxy', true);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.post("/shorten", async (req: Request, res: Response) => {
  const { originalUrl, expiresAt, alias } = req.body;
  let shortUrl = '';
  try {
    shortUrl = await setShortUrl(originalUrl, alias, expiresAt);
  } catch (error) {
    console.error('[shorten]: ', error);
  }
 
  res.send({ shortUrl });
});

app.get("/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  let original: { id?: number, targeturl: string, expiresat?: Date } = {
    targeturl: '',
  };
  try {
    original = await getOriginalUrl(code);
  } catch (error) {
    console.error('[shorten]: ', error);
  }

  if (original?.expiresat) {
    const end = new Date(original.expiresat);

    if (end < new Date()) {
      res.send({ error: new Error('[expiresat]: закончилось действия ссылки') });
      return null;
    }
  }

  if (original?.targeturl) {
    await setFollow(original.id, req.ip);
    res.redirect(original.targeturl);
    return null;
  }

  res.redirect('http://localhost:4444/not-found');
});

app.get("/info/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  let info: { targeturl: string, createdAt?: Date } = {
    targeturl: '',
  };
  try {
    info = await getOriginalUrl(code);
  } catch (error) {
    console.error('[shorten]: ', error);
  }

  res.send(JSON.stringify(info));
});

app.get("/delete/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    await deleteOriginalUrl(code);
  } catch (error) {
    console.error('[shorten]: ', error);
    res.send(JSON.stringify(error));
    return null;
  }

  res.send(JSON.stringify({ result: 'OK' }));
});

app.get("/analytics/:code", async (req: Request, res: Response) => {
   const { code } = req.params;

  let original: { id?: number, targeturl: string, expiresat?: Date } = {
    targeturl: '',
  };

  let analytics = [];
  
  try {
    original = await getOriginalUrl(code);
    analytics = await getAnalytics(original.id);
  } catch (error) {
    console.error('[shorten]: ', error);
  }

  res.send(JSON.stringify({ totalFollow: analytics.length, analytics }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

