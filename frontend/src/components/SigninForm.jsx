import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SigninForm({ onLogin }) {
  const [formData, setFormData] = useState({ user_id: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (res.ok) {
      onLogin(data.user);
      navigate('/');
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signin</h2>
      <input name="user_id" placeholder="User ID" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Signin</button>
    </form>
  );
}

export default SigninForm;