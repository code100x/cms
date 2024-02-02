"use client"
import { useState } from "react"

export default function DiscordPage() {
  const [email, setEmail] = useState("")
  const [adminSecret, setAdminSecret] = useState("" as any)
  const [userData, setUserData] = useState({} as any)
  return (
    <div>
      <h1>Refresh discord permissions</h1>
      <br />
      <input
        placeholder="email"
        className="text-black"
        type=" text"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <br />
      <input
        className="text-black"
        type="text"
        placeholder="adminSecret"
        onChange={(e) => setAdminSecret(e.target.value)}
      />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          const response = await fetch("/api/admin/discord/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              adminSecret,
            }),
          })
          const json = await response.json()
          if (response.status !== 200) {
            alert(`Something went wrong ${json.msg}`)
          }
        }}
      >
        Allow user to re-initiate discord (please delete old user from discord
        first)
      </button>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h1>Get information</h1>
      <input
        placeholder="email"
        className="text-black"
        type=" text"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <br />
      <input
        className="text-black"
        type="text"
        placeholder="adminSecret"
        onChange={(e) => setAdminSecret(e.target.value)}
      />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          const response = await fetch("/api/admin/discord/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              adminSecret,
            }),
          })
          const json = await response.json()
          if (response.status !== 200) {
            alert(`Something went wrong ${json.msg}`)
          }
          setUserData(json.data)
        }}
      >
        Get information
      </button>
      <br />
      <br />
      {userData.username}
    </div>
  )
}
