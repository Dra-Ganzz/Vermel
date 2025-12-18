import { kv } from '@vercel/kv'

export async function getServerSideProps({ params }) {
  const code = await kv.get(`paste:${params.id}`)
  if (!code) return { notFound: true }

  return { props: { code } }
}

export default function Paste({ code }) {
  const copy = () => navigator.clipboard.writeText(code)

  return (
    <div style={{ padding: 20 }}>
      <button onClick={copy}>Copy</button>
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(code)}`}
        download="paste.txt"
        style={{ marginLeft: 10 }}
      >
        Download
      </a>

      <pre style={{ marginTop: 15, whiteSpace: 'pre-wrap' }}>
        {code}
      </pre>
    </div>
  )
          }
