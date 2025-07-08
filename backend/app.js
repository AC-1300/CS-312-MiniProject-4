const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
  {
    user_id: 'test',
    password: '1234',
    name: 'Test'
  }, ];

let posts = [];
let postId = 1;

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.post('/create', (req, res) => {
  const { title, content, author, category } = req.body;
  posts.push({
    id: postId++,
    title,
    content,
    author,
    category,
    createdAt: new Date()
  });
  res.redirect('/');
});

app.get('/post/:id/edit', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

app.post('/post/:id/edit', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;
  post.category = req.body.category;
  res.redirect('/');
});

app.post('/post/:id/delete', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.get('/category/:category', (req, res) => {
  const filtered = posts.filter(p => p.category === req.params.category);
  res.render('index', { posts: filtered });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
