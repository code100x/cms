
"use client"
import { useState } from "react";


export default function DiscordPage() {
  const [email, setEmail] = useState('');
  const [segmentsJson, setSegmentsJson] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [contentId, setContentId] = useState('');
  return <div>

    <br />
    <input placeholder="email" className="text-black" type=" text" onChange={(e) => {
      setEmail(e.target.value)
    }} />

    <input placeholder="admin secret" className="text-black" type=" text" onChange={(e) => {
      setAdminSecret(e.target.value)
    }} />

    <br />
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async () => {
      await fetch('/api/admin/drm', {
        body: JSON.stringify({
          adminSecret,
          email,
          disableDrm: false
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }}>Enable DRM</button>

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async () => {

      await fetch('/api/admin/drm', {
        body: JSON.stringify({
          adminSecret,
          email,
          disableDrm: true
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

    }}>Disable DRM</button>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div>Add video metadata</div>

    <textarea style={{ width: 800 }} rows={10} placeholder="segments json" className="text-black" onChange={(e) => {
      setSegmentsJson(e.target.value)
    }} />
    <br />
    <input placeholder="admin secret" className="text-black" type=" text" onChange={(e) => {
      setAdminSecret(e.target.value)
    }} />
    <input placeholder="content id" className="text-black" type=" text" onChange={(e) => {
      setContentId(e.target.value)
    }} />

    <h1>Please validate json at https://jsonlint.com/</h1>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async () => {

      await fetch('/api/admin/segments', {
        body: JSON.stringify({
          adminSecret,
          contentId,
          segmentsJson
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

    }}>Add segments</button>
  </div>
}
