import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'
import { treaty } from '@elysiajs/eden'
import { redis } from '../src'

const app = new Elysia()
    .use(redis())
    .get('/', async ({ redis }) => {
        await redis.set('elysia', 'redis', 60);
        const data = await redis.get('elysia');
        if (!data) {
            throw new Error('No data found');
        }
        return data;
    });

const api = treaty(app)

describe('elysia-plugin', () => {
    it('should return elysia-redis', async () => {
        const { data } = await api.index.get();

        expect(data).toEqual('elysia-redis');
    })
});