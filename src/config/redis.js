const redis = require('redis')
const { env } = process

module.exports = redis.createClient(env.REDIS_PORT, env.REDIS_HOST)
