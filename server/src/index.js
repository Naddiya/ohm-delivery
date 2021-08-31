const shortid = require('shortid');
var express = require('express');
var app = express();
const Utils = require('./utils');
app.use(express.json());

function serve() {
  app.get('/ohms/:id', async (req, res) => {
    const ohm = await Utils.getOhmById(req.params.id);

    res.send(ohm);
    return res.send(ohm);
  });

  app.listen(3000, () => console.log('listening on port 3000'));
}

serve();