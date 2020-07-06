const express = require('express');
const front = require('./static-front');
const api = require('./api');

const app = express();

front(app);
api(app);

app.listen(process.env.BLOCKLET_PORT || 8080, (err) => {
  if (err) {
    throw err;
  }
  console.log('server is running on 8080');
});
