import { useEffect, useState } from "react";
import PostForm from "../components/PostForm.jsx";

export default function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:3000/api/posts");
    const data = await res.json();
    setPosts(data.posts || []);
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Hoşgeldin, {user.username}</h2>
      <PostForm user={user} setPosts={setPosts} posts={posts} />
      <h4>Postlar:</h4>
      <ul>
        {posts.map(p => (
          <li key={p.id}><strong>{p.username}</strong>: {p.content}</li>
        ))}
      </ul>
    </div>
  );
}
