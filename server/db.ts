import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || '127.0.0.1', 
  database: process.env.DB_NAME || 'shortsurl',
  password: process.env.DB_PASSWORD || '12g34rus',
  port: parseInt(process.env.DB_PORT || '5432'),
});

const onVerifyConnection = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log('Connected');
    client.release();
  } catch (error) {
    console.error('Error connecting', error);
  }
}

onVerifyConnection();

export default pool;