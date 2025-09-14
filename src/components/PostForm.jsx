import { useState } from "react";

export default function PostForm({ user, posts, setPosts }) {
  const [content, setContent] = useState("");

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!content) return;

    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, content }),
    });

    const data = await res.json();
    if (res.ok) {
      setPosts([data.post, ...posts]);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleAddPost}>
      <input type="text" placeholder="Yeni post" value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit">Gönder</button>
    </form>
  );
}
