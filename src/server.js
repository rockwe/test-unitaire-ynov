import express from 'express';
// import morgan from 'morgan';
import bodyParser from 'body-parser';
const http = require('http');
const app = require('./app');
import book from './routes/books';
// import config from 'config';

let port = 8080;
//let app = express();

//don't show the log when it is test
// if (config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  // app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
// }

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => res.json({ message: 'Welcome to our Bookstore!' }));

app
  .route('/book')
  .get(book.getBooks)
  .post(book.postBook);

app
  .route('/book/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server up and running on port ' + PORT);
});


module.exports = app; // for testing
