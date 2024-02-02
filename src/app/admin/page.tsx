"use client"
import React, { useState } from "react"

export default function Courses() {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [slug, setSlug] = useState("")
  const [id, setId] = useState("")
  const [adminSecret, setAdminSecret] = useState("")
  const [appxCourseId, setAppxCourseId] = useState("")
  const [discordRoleId, setIdDiscordRoleId] = useState("")

  return (
    <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
      Admin dashboard Create a new course
      <input
        className="text-black"
        type="text"
        placeholder="Course name"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="text-black"
        type="text"
        placeholder="Image url"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        className="text-black"
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="text-black"
        type="text"
        placeholder="slug"
        onChange={(e) => setSlug(e.target.value)}
      />
      <input
        className="text-black"
        type="text"
        placeholder="id"
        onChange={(e) => setId(e.target.value)}
      />
      <input
        className="text-black"
        type="text"
        placeholder="adminSecret"
        onChange={(e) => setAdminSecret(e.target.value)}
      />
      <input
        className="text-black"
        type="text"
        placeholder="appx course id"
        onChange={(e) => setAppxCourseId(e.target.value)}
      />
      <input
        className="text-black"
        type="text"
        placeholder="dicourd id"
        onChange={(e) => setIdDiscordRoleId(e.target.value)}
      />
      <button
        onClick={async () => {
          await fetch("/api/admin/course", {
            body: JSON.stringify({
              id,
              title,
              imageUrl,
              description,
              slug,
              adminSecret,
              appxCourseId,
              discordRoleId,
            }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        }}
      >
        Create
      </button>
    </div>
  )
}
