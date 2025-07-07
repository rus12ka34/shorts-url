import pool from './db';

export async function getTesting(userId: number) {
  const query = 'SELECT id FROM users LIMIT 1';
  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

export async function setShortUrl(originalUrl: string, code?: string) {
  const query = `
    INSERT INTO public.shortlink (targeturl, shortpath) 
    VALUES ('${originalUrl}', '${code}');
  `;

  try {
    await pool.query(query);
  } catch (error) {
    console.error('[SHORTING]: ', error);
    throw error;
  }
}

export async function getOriginalUrl(code: string) {
  const query = `
    SELECT targeturl FROM public.shortlink WHERE shortpath = '${code}';
  `;

  try {
    const urls = await pool.query(query);
    const { targeturl } = urls.rows[0];
    return targeturl;
  } catch (error) {
    console.error('[SHORTING]: ', error);
    throw error;
  }
}

export function generateCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}