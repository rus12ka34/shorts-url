// import dotenv from 'dotenv';
import { Pool } from 'pg';


// dotenv.config();

// PostgreSQL connection pool configuration using environment variables

const config = {
  DB_USER: 'postgres',
  DB_HOST: '127.0.0.1',
  DB_NAME: 'shortsurl',
  DB_PASSWORD: '12g34rus',
  DB_PORT: 5432,
};

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT || 5432,
});

async function verifyConnection(): Promise<void> {
  try {
    // Attempt to acquire a client from the pool
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
}

// Immediately verify connection upon module load.
verifyConnection();

// Export the pool to be used across the application.
export default pool;