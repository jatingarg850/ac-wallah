import pg from 'pg';
const { Pool } = pg;

let dbPool;

function getPool() {
  if (!dbPool) {
    dbPool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Ybrl6uhX2LVc@ep-muddy-sun-a841goek-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
      ssl: {
        rejectUnauthorized: false
      },
      max: 1, // Limit to one connection for serverless
      idleTimeoutMillis: 120000, // Close idle connections after 120 seconds
      connectionTimeoutMillis: 10000, // Timeout after 10 seconds
    });

    // Error handling
    dbPool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    dbPool.on('connect', () => {
      console.log('Database connected successfully');
    });
  }
  return dbPool;
}

export const pool = getPool();
export default pool; 