import { Elysia, t } from "elysia";
import Redis from 'ioredis';

import { env } from '@yolk-oss/elysia-env'

class RedisClient {
  private redis: Redis;

  constructor(_connectionString?: string) {
    this.redis = _connectionString ? new Redis(_connectionString) : new Redis();
  }

  async set(key: string, value: string, expiresAt: number) {
    return this.redis.set(key, value, 'EX', expiresAt);
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async del(key: string) {
    return this.redis.del(key);
  }

  async forgetAll() {
    return this.redis.flushall();
  }
};

export const redis = () => {
  return new Elysia({ name: '@Atakan75/elysia-redis' })
  .use(env({
    REDIS_URL: t.String({
      default: 'redis://localhost:6379',
    })
  }))
  .decorate(({ env }) => ({
    redis: new RedisClient(env.REDIS_URL)
  }));
};

export type RedisClientType = InstanceType<typeof RedisClient>;