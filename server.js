const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.get('/', (req, res) => {
  try {
    res.json({ mesg: `This is the main page`})
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`We did it! Ready and waiting on port: ${PORT}`)
});
