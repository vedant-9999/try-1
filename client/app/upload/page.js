'use client'

import { useState } from 'react'

export default function UploadPage() {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('caption', caption)
    formData.append('image', image)

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        alert('✅ Post uploaded successfully!')
        setCaption('')
        setImage(null)
      } else {
        alert('❌ Failed to upload post')
      }
    } catch (err) {
      console.error(err)
      alert('⚠️ Error uploading post')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4 text-center">Upload a Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="mb-3"
        />
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  )
}
