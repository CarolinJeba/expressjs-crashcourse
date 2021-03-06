//creating simple express server

const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const members = require('./Members');
// const logger = require('./middleware/logger');

const app = express(); //initialze variable 'app' with express

// Init middleware
//app.use(logger);

// Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members,
  })
);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
