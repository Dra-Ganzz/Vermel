import { useState } from 'react'

export default function Home() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)

  const submit = async () => {
    const r = await fetch('/api/paste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    const j = await r.json()
    setResult(j)
  }

  const upload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setCode(await file.text())
  }

  return (
    <div style={{ padding: 30, fontFamily: 'monospace' }}>
      <h2>Simple Paste</h2>

      <input type="file" onChange={upload} /><br /><br />

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={18}
        style={{ width: '100%' }}
        placeholder="Paste code here..."
      />

      <br /><br />
      <button onClick={submit}>Save</button>

      {result && (
        <p>
          Saved: <a href={`/${result.id}`} target="_blank">/{result.id}</a>
        </p>
      )}
    </div>
  )
    }
