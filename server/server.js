const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;  // heroku port setup
const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/../public');
// console.log(publicPath);

// static directory
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});