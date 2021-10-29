const express = require('express')
const app = express()
const port = 5000

const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.locals.siteName = "AloTech Full-Stack Bootcamp - Week 1 Homework 3";

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
