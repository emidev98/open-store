require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:8080',
  apiKey: process.env.API_KEY || 123,
  jwtSecret: process.env.JWT_SECRET || 123,

  // Database configuration
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'postgres',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'open_store',
  dbPort: process.env.DB_PORT || 5432,

  // Used for password recovery
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: process.env.SMTP_PORT || 587,
  smtpUser: process.env.SMTP_USER || '',
  smtpPassword: process.env.SMTP_PASSWORD || '',
};

module.exports = { config };
