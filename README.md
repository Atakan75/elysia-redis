# @Atakan75/elysia-redis

Redis plugin for [Elysia.js](https://elysiajs.com)

## Installation

```bash
bun add @atakan75/elysia-redis
```

## Usage

```ts
import { Elysia, t } from 'elysia';
import { redis } from '@Atakan75/elysia-redis';

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

console.log(`Listening on http://${app.server!.hostname}:${app.server!.port}`)
```

Checkout the [tests](./tests) folders on github.

## Need To Know

First of all, if you define REDIS_URL in the env file, it will take the value you enter. If you do not define anything, it will connect to the redis server installed in your local.

## License

[MIT](LICENSE)