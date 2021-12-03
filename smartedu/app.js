import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';

import pageRoute from './routes/pageRoute.js';
import courseRoute from './routes/courseRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import userRoute from './routes/userRoute.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// Template Engine
app.set('view engine', 'ejs');

// Global Variable
global.userIN = null;

// Middlewares
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
app.use(session({
  secret: 'cagPm5WUwZem4TvIvk1VHpYNVaE4rYqV',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl:process.env.MONGO})
}))
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connection established.')
  })
  .catch((err) => {
    console.log('Connection error:', err)
  })

app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`App started on port ${port}`)
});
