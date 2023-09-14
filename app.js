// app.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router/routes');

const app = express();


app.use(bodyParser.json());

app.use('/api', routes);

const PORT = process.env.PORT || 19093;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
