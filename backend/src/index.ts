import { Hono } from "hono";
import { pool } from './db'
import { serve } from '@hono/node-server'

const app = new Hono();

//一覧取得
app.get('/api/rooms', async (c) => {
    try {
        const [rows] = await pool.query("SELECT * FROM rooms ORDER BY id")
        return c.json(rows);
    } catch (err) {
        console.error(err)
        return c.json(
            { ok: false, error: (err as Error).message }, 500);
    }
});

serve({ fetch: app.fetch, port: 8787, });