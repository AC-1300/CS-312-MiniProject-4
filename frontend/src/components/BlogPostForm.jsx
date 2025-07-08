import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BlogPostForm({ user }) {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, author: user.user_id })
    });

    if (res.ok) {
      alert('Post created!');
      navigate('/');
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Blog Post</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="body" placeholder="Body" onChange={handleChange} required />
      <button type="submit">Post</button>
    </form>
  );
}

export default BlogPostForm;