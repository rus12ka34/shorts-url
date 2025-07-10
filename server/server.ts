import express, { Request, Response } from "express";
import cors from 'cors';
import { setShortUrl, getOriginalUrl, deleteOriginalUrl, setFollow, getAnalytics } from "./requests";
import { ShortUrlResponse, ErrorResponse, InfoResponse, DeleteResponse, AnalyticsResponse } from "./config/types";

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(cors({
  origin: ['http://localhost:4444', 'http://0.0.0.0:4444', 'http://127.0.0.1:4444'],
  credentials: true
}));

app.set('trust proxy', true);
app.use(express.json());

app.post<{}, ShortUrlResponse | ErrorResponse>("/shorten", async (req: Request, res: Response) => {
  const { originalUrl, expiresAt, alias } = req.body;
  
  try {
    const shortUrl = await setShortUrl(originalUrl, alias, expiresAt);
    return res.json({ shortUrl });
  } catch (error) {
    console.error('[shorten]: ', error);
    return res.status(400).json({ error: 'Ошибка при создании короткой ссылки' });
  }
});

app.get("/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const original = await getOriginalUrl(code);
    
    if (!original?.targeturl) {
      return res.redirect('http://localhost:4444/not-found');
    }

    if (original.expiresat && new Date(original.expiresat) < new Date()) {
      return res.status(410).json({ error: 'Срок действия ссылки истек' });
    }

    await setFollow(original.id, req.ip);
    return res.redirect(original.targeturl);
    
  } catch (error) {
    console.error('[redirect]: ', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.get<{}, InfoResponse | ErrorResponse>("/info/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const info = await getOriginalUrl(code);
    
    if (!info?.targeturl) {
      return res.status(404).json({ error: 'Ссылка не найдена' });
    }

    const analytics = await getAnalytics(info.id);
    
    return res.json({
      ...info,
      totalFollow: analytics.length || 0
    });
    
  } catch (error) {
    console.error('[info]: ', error);
    return res.status(500).json({ error: 'Ошибка при получении информации' });
  }
});

app.delete<{}, DeleteResponse>("/delete/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    await deleteOriginalUrl(code);
    return res.json({ result: 'OK' });
  } catch (error) {
    console.error('[delete]: ', error);
    return res.status(500).json({ 
      result: 'ERROR',
      message: 'Ошибка при удалении ссылки'
    });
  }
});

app.get<{}, AnalyticsResponse | ErrorResponse>("/analytics/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const original = await getOriginalUrl(code);
    
    if (!original?.id) {
      return res.status(404).json({ error: 'Ссылка не найдена' });
    }

    const analytics = await getAnalytics(original.id);
    
    return res.json({
      totalFollow: analytics.length,
      analytics
    });
    
  } catch (error) {
    console.error('[analytics]: ', error);
    return res.status(500).json({ error: 'Ошибка при получении аналитики' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
