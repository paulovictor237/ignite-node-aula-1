const express = require('express');
const app = express();
// //localhost:3333
app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.json({
    message: 'Hello World!'
  })
});

app.listen(3333);