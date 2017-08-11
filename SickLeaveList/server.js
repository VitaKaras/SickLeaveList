// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./server/routes/user');
const list = require('./server/routes/list');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);



mongoose.connect('mongodb://localhost/registeredUsers');
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are connected');
  // we're connected!
});

// Get our API routes


const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Set our api routes

app.use('/user', user);
app.use('/list', list);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root : __dirname});
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
