//requiring the express framework
const express = require('express');

//requiring the dotenv npm package
require('dotenv').config();

//requiring the route folder
const route = require('../routes/contact');
const render = require('../routes/render');
const recipe = require('../routes/routerecipe');

//requiring the morgan middleware
const morgan = require('morgan')

//requiring the mongoose npm package for mongodb
const mongoose = require('mongoose');

//declaring a variable and equating it to the express framework
const app = express();

//setting the view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.urlencoded({ extended: true }));//allow us to send form data to the backend/server
app.use(express.json())//req.body

//setting the route folder globally
app.use(route);
app.use(render);
app.use(recipe);

//serving static files
app.use(express.static('assets'));

//setting the morgan and Using the predefined format string
app.use(morgan('dev'));

//setting the port number
const PORT = process.env.PORT || 5000;

//declaring a variable and equating it to the process.env
const mongoUri = process.env.mongoUrl

//connecting to the mongodb atlas
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((success) => {
    if (success) {
      console.log('mongodb connection established successfully')
    }
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use((req, res) => {
  res.status(404).render('404',{title:'Error Page'})
});

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`)})