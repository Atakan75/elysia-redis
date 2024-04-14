import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'
import { treaty } from '@elysiajs/eden'
import { redis } from '../src'

const app = new Elysia()
    .use(redis())
    .get('/', async ({ redis }) => {
        await redis.set('elysia', 'redis', 60);
        await redis.set('Atakan75', 'Elysia', 60);
        await redis.set('thanksfor', 'fecony', 60);

        const data = await redis.get('elysia');
        if (!data) {
            throw new Error('No data found');
        }
        return data;
    })
    .get('/del', async ({ redis }) => {
        await redis.del('Atakan75');
        const data = await redis.get('Atakan75');
        if (!data) {
            return null;
        }
        return data;
    })
    .get('/null', async ({ redis }) => {
        await redis.forgetAll();
        const data = await redis.get('thanksfor');
        if (!data) {
            return null;
        }
        return data;     
    });

const api = treaty(app)

describe('elysia-plugin', () => {
    it('should return elysia-redis', async () => {
        const { data } = await api.index.get();

        expect(data).toEqual('redis');
    });

    it('should return null', async () => {
        const { data } = await api.del.get();

        expect(data).toBeNull();
    });

    it('should return null', async () => {
        const { data } = await api.null.get();

        expect(data).toBeNull();
    });
});