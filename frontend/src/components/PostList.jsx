import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PostList({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  const deletePost = async (id) => {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.user_id })
    });

    if (res.ok) {
      setPosts(posts.filter(p => p.id !== id));
    } else {
      alert('Unauthorized or failed');
    }
  };

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title} (by {post.author})</h3>
          <p>{post.body}</p>
          {post.author === user.user_id && (
            <>
              <button onClick={() => deletePost(post.id)}>Delete</button>
              <Link to={`/edit/${post.id}`}><button>Edit</button></Link>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;