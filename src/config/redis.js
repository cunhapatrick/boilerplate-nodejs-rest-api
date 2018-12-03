const redis = require('redis')
const { env } = process
let client
client =
  env.NODE_ENV === 'development'
    ? redis.createClient(env.DEV_REDIS_PORT, env.DEV_REDIS_HOST)
    : redis.createClient(env.REDIS_PORT, env.REDIS_HOST)

module.exports = client
