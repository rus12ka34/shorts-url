import pool from './db';
import { generateCode, UNAVAILABLE_ALIAS } from './config/helpers';
import { ShortLink, Follow } from './config/types';

const executeQuery = async <T>(query: string, values: any[] = [], errorPrefix: string): Promise<T[]> => {
  try {
    const result = await pool.query<T>(query, values);
    return result.rows;
  } catch (error) {
    console.error(`[${errorPrefix}]: `, error);
    throw error;
  }
}

export const setShortUrl = async (originalUrl: string, alias?: string, expiresAt?: string): Promise<string> => {
  const code = generateCode();
  const _alias = alias || code;

  if (UNAVAILABLE_ALIAS.includes(_alias)) {
    throw new Error('[UNAVAILABLE_ALIAS]');
  }

  const query = expiresAt 
    ? 'INSERT INTO public.shortlink (targeturl, shortpath, expiresat) VALUES ($1, $2, $3)'
    : 'INSERT INTO public.shortlink (targeturl, shortpath) VALUES ($1, $2)';

  const values = expiresAt 
    ? [originalUrl, _alias, expiresAt]
    : [originalUrl, _alias];

  await executeQuery(query, values, 'setShortUrl');
  return `http://localhost:3000/${_alias}`;
}

export const getOriginalUrl = async (code: string): Promise<ShortLink | undefined> => {
  const query = 'SELECT id, targeturl, expiresat FROM public.shortlink WHERE shortpath = $1';
  const [result] = await executeQuery<ShortLink>(query, [code], 'getOriginalUrl');
  return result;
}

export const getInfo = async (code: string): Promise<ShortLink | undefined> => {
  const query = 'SELECT targeturl, createdat FROM public.shortlink WHERE shortpath = $1';
  const [result] = await executeQuery<ShortLink>(query, [code], 'getInfo');
  return result;
}

export const deleteOriginalUrl = async (code: string): Promise<void> => {
  const selectQuery = 'SELECT id FROM public.shortlink WHERE shortpath = $1';
  const [shortlink] = await executeQuery<{ id: number }>(selectQuery, [code], 'deleteOriginalUrl');
  
  if (!shortlink) {
    throw new Error('Короткая ссылка не найдена');
  }

  const deleteFollowQuery = 'DELETE FROM public.follow WHERE shortlinkid = $1';
  await executeQuery(deleteFollowQuery, [shortlink.id], 'deleteOriginalUrl');

  const deleteShortlinkQuery = 'DELETE FROM public.shortlink WHERE shortpath = $1';
  await executeQuery(deleteShortlinkQuery, [code], 'deleteOriginalUrl');
}

export const setFollow = async (shortlinkid: number, ip: string): Promise<void> => {
  const query = 'INSERT INTO public.follow (shortlinkid, ip) VALUES ($1, $2)';
  await executeQuery(query, [shortlinkid, ip], 'setFollow');
}

export const getAnalytics = async (shortlinkid: number): Promise<Follow[]> => {
  const query = 'SELECT createdat, ip FROM public.follow WHERE shortlinkid = $1';
  return executeQuery<Follow>(query, [shortlinkid], 'getAnalytics');
}