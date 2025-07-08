import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import PostList from './components/PostList';
import BlogPostForm from './components/BlogPostForm';
import EditPostForm from './components/EditPostForm';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <PostList user={user} /> : <Navigate to="/signin" />} />
        <Route path="/create" element={user ? <BlogPostForm user={user} /> : <Navigate to="/signin" />} />
        <Route path="/edit/:id" element={user ? <EditPostForm user={user} /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm onLogin={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;