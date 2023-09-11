const Redis = require('ioredis');
const config = require('../config/config');

// Create a Redis client with your configuration
const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  // Add more configuration options as needed
});

// Handle connection events (optional)
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (error) => {
  console.error('Redis error:', error);
});

module.exports = redisClient;
