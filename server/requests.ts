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