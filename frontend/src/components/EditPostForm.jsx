import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPostForm({ user }) {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts`)
      .then(res => res.json())
      .then(posts => {
        const found = posts.find(p => p.id === parseInt(id));
        if (!found) {
          alert('Post not found');
          navigate('/');
        } else {
          setPost(found);
        }
      });
  }, [id, navigate]);

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, user_id: user.user_id })
    });

    if (res.ok) {
      alert('Post updated!');
      navigate('/');
    } else {
      const data = await res.json();
      alert(data.message || 'Update failed');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input name="title" value={post.title} onChange={handleChange} required />
      <textarea name="body" value={post.body} onChange={handleChange} required />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditPostForm;