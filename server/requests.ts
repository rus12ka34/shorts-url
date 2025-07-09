import pool from './db';
import { generateCode } from './helpers';

export async function setShortUrl(originalUrl: string, alias?: string, expiresAt?: string) {
  const code = generateCode();
  const _alias = alias || code;
  
  const query = `
    INSERT INTO public.shortlink (targeturl, shortpath, expiresat) 
    VALUES ('${originalUrl}', '${_alias}', '${expiresAt}');
  `;

  try {
    await pool.query(query);
    return `http://localhost:3000/${_alias}`;
  } catch (error) {
    console.error('[setShortUrl]: ', error);
    throw error;
  }
}

export async function getOriginalUrl(code: string) {
  const query = `
    SELECT id, targeturl, expiresat FROM public.shortlink WHERE shortpath = '${code}';
  `;

  try {
    const urls = await pool.query(query);
    return urls.rows[0];
  } catch (error) {
    console.error('[getOriginalUrl]: ', error);
    throw error;
  }
}

export async function getInfo(code: string) {
  const query = `
    SELECT targeturl, createdAt FROM public.shortlink WHERE shortpath = '${code}';
  `;

  try {
    const urls = await pool.query(query);
    return urls.rows[0];
  } catch (error) {
    console.error('[getInfo]: ', error);
    throw error;
  }
}

export async function deleteOriginalUrl(code: string) {
  const query = `
    DELETE FROM public.shortlink WHERE shortpath = '${code}';
  `;

  try {
    const urls = await pool.query(query);
  } catch (error) {
    console.error('[deleteOriginalUrl]: ', error);
    throw error;
  }
}

export async function setFollow(shortlinkid: number, ip: string) {
  const query = `
    INSERT INTO public.follow (shortlinkid, ip) 
    VALUES ('${shortlinkid}', '${ip}');
  `;

  try {
    await pool.query(query);
  } catch (error) {
    console.error('[setFollow]: ', error);
    throw error;
  }
}

export async function getAnalytics(shortlinkid: number) {
  const query = `
    SELECT createdat, ip FROM public.follow WHERE shortlinkid = '${shortlinkid}';
  `;

  try {
    const urls = await pool.query(query);
    return urls.rows;
  } catch (error) {
    console.error('[getAnalytics]: ', error);
    throw error;
  }
}