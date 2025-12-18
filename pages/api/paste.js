import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { code } = req.body
  if (!code) {
    return res.status(400).json({ error: 'empty' })
  }

  const id = Math.random().toString(36).slice(2, 14)

  // SIMPAN PERMANEN
  await kv.set(`paste:${id}`, code)

  res.json({ id })
}
