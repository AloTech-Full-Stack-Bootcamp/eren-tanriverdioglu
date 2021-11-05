import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

import dotenv from 'dotenv';

import {
  getIndex,
  getAbout,
  getAddPost,
  getEditPost
} from './controller/pageController.js';

import {
  getPost,
  createPost,
  deletePost,
  editPost
} from './controller/postController.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static('static'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  }),
);


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connection established.')
  })
  .catch((err) => {
    console.log('Connection error:', err)
  })

app.get('/', getIndex)
app.get('/about', getAbout)
app.get('/add', getAddPost)

app.get('/post/:id', getPost)
app.get('/post/edit/:id', getEditPost)

app.post('/post', createPost)
app.put('/post/:id', editPost)
app.delete('/post/:id', deletePost)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
