const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 1337;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

// api routes
app.use('/api', require('./routes'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
